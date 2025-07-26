### ✅ `README.md` (Markdown Code)

# QuantumEd - AI-Powered Educational Environment Scanner

QuantumEd is an AI-driven interactive educational platform that analyzes your physical environment to recommend dynamic, hands-on learning projects. Built during CodeRed #1 by Team PS3 for SNUC Hacks, it merges AI object detection, smart project generation, and mood-aware learning.

## 🌟 Features

- 📸 Scan your environment using a webcam
- 🧠 AI-powered object detection (Google Vision API)
- 🎓 Personalized project recommendations based on scanned items
- 💬 Chatbot assistant using Gemini API
- 🧑‍🤝‍🧑 Collaborative and mood-based learning workflows
- 📊 Dashboard with project progress and profile tracking

---

## 📁 Project Structure

├── api.py               # Flask app using Google Cloud Vision API
├── server.js            # Node.js Express server using Gemini API
├── index.html           # Frontend interface
├── script.js            # Frontend logic (chat, camera, dashboard)
├── styles.css           # CSS styles
├── package.json         # Node.js dependencies
├── require.txt          # Python packages
├── captured-image.jpg   # Image scanned from camera (runtime)
└── output.html          # AI-generated HTML content (runtime)


---

## ⚙️ Installation & Setup

### 1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/quantumed.git
cd quantumed

### 2. Install Node.js Dependencies

npm install

> Required for the chatbot (`server.js`):

* `express`
* `cors`
* `axios`
* `body-parser`
* `dotenv`

### 3. Install Python Dependencies

Make sure you have Python 3.9+ installed.

pip install -r require.txt

> Required for the object detection server (`api.py`):

* `flask`
* `google-cloud-vision`
* `google-generativeai`

Make sure to add your `apiKey.json` file (Google Cloud credentials) in the project root.

---

## 🚀 Running the Project

### Start the **Python Flask Backend** for Object Detection

python api.py

> This will start a server on `http://127.0.0.1:5000/` and generate `output.html` when an image is scanned.

### Start the **Node.js Server** for the Chatbot

node server.js

> This starts the chatbot backend on `http://localhost:3000/`. Make sure to set your Gemini API key in `server.js`.

### Open the Frontend

You can simply open `index.html` in your browser (double-click it or use a live server extension if using VS Code).

---

## 🔑 API Keys

* **Google Cloud Vision API**: Provide `apiKey.json` in the root directory.
* **Gemini API**: Set your Gemini API key in `server.js`:

const GEMINI_API_KEY = "Your gemini api key";

---

## 📽️ Demo

* Scan your environment using the camera button.
* The backend detects objects and generates `output.html` with project suggestions.
* Chat with the AI assistant using the chatbot in the UI.

---

## 📚 Pitch Deck

View the complete pitch deck in the [`CodeRed#1_PS3_QuantumEd.pptx`](./CodeRed#1_PS3_QuantumEd.pptx) file.

---

## 🛠 Tech Stack

| Tech                        | Purpose                  |
| --------------------------- | ------------------------ |
| **HTML/CSS/JS**             | Frontend Interface       |
| **Node.js**                 | Backend Chatbot          |
| **Express**                 | API Server               |
| **Python (Flask)**          | AI & Vision Integration  |
| **Google Cloud Vision API** | Object Detection         |
| **Gemini API**              | Natural Language Chatbot |

---

## 🧠 Future Features

* AR-based instructions overlay
* Collaborative virtual rooms
* Simulation-based learning
* Real-world project matching

---

## 👥 Team

* CodeRed #1 – Team PS3 @ SNUC Hacks

---


