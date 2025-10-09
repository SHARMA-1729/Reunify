


<p align="center">
  <img src="https://t4.ftcdn.net/jpg/08/05/78/71/360_F_805787195_QNhGb7hAhscgzN7OjREvnffRLUGpyTDG.jpg" alt="Reunify Logo" width="600" height="200">
</p>

# 🧒 Reunify – Missing Child Face Recognition System
> **Reunify** is a full-stack AI-powered web application designed to **help reunite lost children with their families** through **facial recognition technology**.  
> Built using the **MERN stack (MongoDB, Express, React, Node.js)**, it provides a secure, efficient, and socially impactful platform to report, search, and match missing child cases.
<p align="center">
  <b>Connecting Families, Bringing Hope</b>
</p>

---

## 📁 Project Structure

```
Reunify/
│
├── client/ # React frontend
│   ├── src/
│   │   ├── components/ # UI Components (Dashboard, CaseForm, FaceMatch, etc.)
│   │   ├── pages/ # Route-based pages
│   │   └── utils/ # face-api.js setup, Axios calls
│   └── package.json
│
├── server/ # Node.js + Express backend
│   ├── models/ # User, Case schemas (MongoDB)
│   ├── routes/ # API routes (auth, cases, face match)
│   ├── controllers/ # Business logic
│   └── utils/ # Image handling, embedding comparison
└── README.md
```

---

## ⚙️ How It Works

### **1. Frontend (React)**
- Built with **React** and **React Router** for navigation.  
- Uses **face-api.js** for client-side facial recognition and embedding generation.  
- Communicates with backend via **Axios** to submit and retrieve data.  
- Core Components:
  - `Dashboard.js` – Displays reported cases and matches  
  - `CaseForm.js` – Add or edit a missing/found child report  
  - `FaceMatch.js` – Upload and compare a photo to find potential matches  

### **2. Backend (Node.js/Express)**
- Provides RESTful APIs for:
  - `/api/auth` – User registration & authentication  
  - `/api/cases` – Case reporting & management  
  - `/api/face/match` – Facial recognition comparison  
- Uses **face-api.js embeddings** to calculate similarity via **Euclidean distance**.  
- Triggers **email alerts** when a match score exceeds the threshold (>60%).

### **3. Database (MongoDB Atlas)**
- Stores:
  - User credentials (secured with bcrypt + JWT)
  - Case details (child info, image URLs, facial embeddings)
- Enables efficient search and match operations.

---

## 💡 Example Workflow

1. 👨‍👩‍👧 **Parent logs in** and reports a missing child.  
2. 📷 The child’s photo is processed and converted into an **embedding** (numerical representation).  
3. 💾 The data and embedding are stored securely in MongoDB.  
4. 🚸 Another user uploads a photo of a found child.  
5. 🔍 The backend computes similarity with stored embeddings.  
6. ✅ If a high match score is found, **Runify notifies the parent** via email or dashboard alert.

---

## 🧠 Why Reunify Matters

### **🎯 Purpose**
Reunify addresses a **real-world humanitarian issue**—helping locate and reunite missing children using **AI-driven facial recognition**.

### **💪 Impact**
- Reduces manual search time from **days to minutes**.  
- Enhances coordination between **parents, law enforcement, and the public**.  
- Promotes **AI for social good** by applying deep learning in a life-saving context.

### **👥 Target Users**
- **Parents/Guardians:** Report and track missing cases.  
- **Law Enforcement:** Manage cases, verify matches.  
- **Public Users:** Report found children safely.

---

## 🧰 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React.js, React Router, Axios, face-api.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT, bcrypt |
| **Deployment** | Vercel (frontend), Render/Vercel serverless (backend) |
| **AI Model** | face-api.js (TensorFlow.js-based pre-trained models) |

---

## 🪜 Getting Started

### **1. Clone the Repository**
```bash
git clone <repo-url>
cd runify
```

### **2. Install Dependencies**

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```

### **3. Start the Application**

#### Start the Backend
```bash
cd server
npm start
```

#### Start the Frontend
```bash
cd ../client
npm start
```

---

## 📂 Folder Overview

| Folder | Description |
|--------|-------------|
| client/ | React frontend application |
| server/ | Express backend with API routes and models |


---



---

## 📧 Contact

👤 Saurav Sharma  
📍 B.Tech, IIITDM Jabalpur  
📧 22bec109@iiitdmj.ac.in  
🔗 [LinkedIn](https://www.linkedin.com/in/saurav-sharma-142b61257/)

---

## 🌍 Future Enhancements

- 📱 Mobile app version with React Native
- 🌐 Geo-location tagging for last seen location
- 🧾 Case closure analytics dashboard
- ☁️ Cloud-based image storage (AWS S3 / Cloudinary)
- 🔊 Voice and SMS alert system

---


