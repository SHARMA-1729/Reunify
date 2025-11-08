const express = require('express');
const router = express.Router();
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const FoundChild = require('../models/FoundChild');
const LostChild = require('../models/LostChild');
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
    folder: "found-children",
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});
const upload = multer({ storage });

(async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
})();

router.get('/', auth, async (req, res) => {
  const foundChildren = await FoundChild.find({ finderId: req.user.id });
  res.json(foundChildren);
});

router.post('/report', auth, upload.single('photo'), async (req, res) => {
  const { name, location, approximateAge, appearance, contact, height } = req.body;

  try {
    const img = await loadImage(req.file.path);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    if (!detections) return res.status(400).json({ message: 'No face detected' });

    const foundChild = await FoundChild.create({
      finderId: req.user.id,
      name,
      location,
      photo: req.file.path, // Cloudinary URL
      approximateAge: parseInt(approximateAge),
      height,
      appearance,
      contact,
      facialDescriptor: Array.from(detections.descriptor),
      isFound: false,
    });

    const lostChildren = await LostChild.find({
      createdAt: { $gte: new Date(Date.now() - 86400000) },
    });

    for (const lost of lostChildren) {
      const distance = faceapi.euclideanDistance(detections.descriptor, lost.facialDescriptor);

      if (distance < 0.6 && Math.abs(lost.age - parseInt(approximateAge)) <= 2) {
        await FoundChild.findByIdAndUpdate(foundChild._id, { isFound: true });
        await LostChild.findByIdAndUpdate(lost._id, { isFound: true });

        const parent = await User.findById(lost.userId);
        const finder = await User.findById(foundChild.finderId);

        await sendNotification(parent.email, `Match found! Contact Finder: ${finder.phone}`);
        await sendNotification(finder.email, `Match found! Contact Parent: ${parent.phone}`);
      }
    }

    res.json({ message: 'Found child reported', foundChild });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
