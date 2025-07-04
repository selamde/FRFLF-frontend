# 🔍 Face Recognition System for Legal Force (FRFLF)

A powerful, face recognition surveillance system designed to assist law enforcement in identifying **wanted individuals** from live IP camera feeds. FRFLF combines real-time video streaming, facial recognition, and database logging into one seamless experience — built to modernize public safety and criminal investigations in 🇪🇹 Ethiopia.

---

![Last Commit](https://img.shields.io/github/last-commit/selamde/Face-Recognition-System-For-Legal-Force?color=blue&label=last%20commit) ![Repo Size](https://img.shields.io/github/repo-size/selamde/Face-Recognition-System-For-Legal-Force) ![Languages](https://img.shields.io/github/languages/count/selamde/Face-Recognition-System-For-Legal-Force) ![Top Language](https://img.shields.io/github/languages/top/selamde/Face-Recognition-System-For-Legal-Force?color=yellow)




## 📸 Live Demo

🎬 *Coming soon...*

> *(Include screenshots or a YouTube link for full demo walkthrough)*

---

## ✨ Features

- 🔐 **Role-Based Authentication** — Admin & Police roles with secure access
- 🧠 **AI Face Recognition Engine** — Powered by DeepFace and Python
- 🎥 **Live IP Camera Feed Integration** — Real-time video streaming
- 📸 **Auto-Capture & Match** — Automatically detects and captures known faces
- 🗂️ **Image Evidence Archiving** — Matched face stored with date & time
- 🚨 **Instant Alerts via Socket.IO** — Notifies operators in real-time
- 📊 **Admin Dashboard** — Displays reports, statistics, and user management
- 📮 **Contact Form + Report Upload** — Submit suspicious activity with photos
- 🛡️ **MongoDB Database** — Secure, indexed storage for all records
- 📈 **Logs and Action History** — Full activity traceability by admin

---

## 🛠️ Tech Stack

| 🔧 Layer        | 🚀 Technology                             |
|----------------|--------------------------------------------|
| **Frontend**    | React.js, Tailwind CSS 💅                  |
| **Backend**     | Node.js, Express.js ⚙️                    |
| **AI Engine**   | Python, Flask, DeepFace 🧠                 |
| **Database**    | MongoDB 🛢️                                |
| **Utilities**   | Multer, Socket.IO, JWT, bcrypt 🔐         |

---

## 📁 Project Structure

/backend # Node.js + Express API
/frontend # React frontend (if separate)
/criminal_faces # Uploaded criminal images
/matched_faces # Matched images from camera
/user_faces # Registered users' photos
/Report_images # Uploaded report evidence

yaml
Copy
Edit

---

## ⚙️ Installation & Setup

### 🧬 1. Clone the repository
```bash
git clone https://github.com/selamde/Face-Recognition-System-For-Legal-Force.git
cd Face-Recognition-System-For-Legal-Force
📦 2. Backend Setup
bash
Copy
Edit
cd backend
npm install
🔐 3. Create .env file
env
Copy
Edit
JWT_SECRET=your_super_secret_key
MONGO_URI=mongodb://localhost:27017/criminalDb
🚀 4. Run the Server
bash
Copy
Edit
npm start