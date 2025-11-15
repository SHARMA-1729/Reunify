const express = require('express');
const router = express.Router();
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const LostChild = require('../models/LostChild');
const FoundChild = require('../models/FoundChild');
const User = require('../models/User');
const auth = require('../middleware/auth');

const faceapi = require('face-api.js');
const { Canvas, Image, ImageData, loadImage } = require('canvas');
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { sendNotification } = require('../utils/notifications');

const modelsPath = path.join(__dirname, '../models');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lost-children",
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});
const upload = multer({ storage });

// Load face-api models once
let modelsLoaded = false;
(async () => {
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
    modelsLoaded = true;
  } catch (err) {
    console.error('Error loading models:', err);
  }
})();

router.get('/', auth, async (req, res) => {
  try {
    let query = req.user.role === "parent"
      ? { userId: req.user.id }
      : { 'finder.finderId': req.user.id, submittedByFinder: true };

    const lostChildren = await LostChild.find(query);
    res.json(lostChildren);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/report', auth, upload.single('photo'), async (req, res) => {
  if (!modelsLoaded) return res.status(500).json({ message: 'Face recognition not ready' });

  const { name, age, skinColor, height, lastLocation, details } = req.body;

  try {
    const img = await loadImage(req.file.path);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    if (!detections) return res.status(400).json({ message: 'No face detected' });

    const lostChild = await LostChild.create({
      userId: req.user.id,
      name,
      age: parseInt(age),
      skinColor,
      height,
      lastLocation,
      photo: req.file.path, // Cloudinary URL
      details,
      facialDescriptor: Array.from(detections.descriptor),
      isFound: false,
    });

    const foundChildren = await FoundChild.find({
      createdAt: { $gte: new Date(Date.now() - 86400000) },
    });

    for (const found of foundChildren) {
      const distance = faceapi.euclideanDistance(detections.descriptor, found.facialDescriptor);

      if (distance < 0.6 && Math.abs(found.approximateAge - parseInt(age)) <= 2) {
        await LostChild.findByIdAndUpdate(lostChild._id, { isFound: true });

        const parent = await User.findById(lostChild.userId);
        const finder = await User.findById(found.finderId);

        await sendNotification(parent.email, `Possible match. Contact finder: ${finder.phone}`);
        await sendNotification(finder.email, `Possible match. Contact parent: ${parent.phone}`);
      }
    }

    res.json({ message: 'Lost child reported', lostChild });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
