# 🤖 AI-Powered Blockchain Document Assistant

<p align="center">
  <b>Secure • Intelligent • Blockchain-Verified Document Management</b>
</p>

<p align="center">
  An AI-powered document assistant that combines <b>Google Gemini AI</b>, <b>Blockchain-based Verification</b>, and <b>Cloud Technologies</b> to securely upload, analyze, and verify PDF documents.
</p>

---

## 🚀 Live Demo

🌐 **Frontend:**  
https://ai-blockchain-assistant.vercel.app/

⚙️ **Backend API:**  
https://ai-blockchain-assistant.onrender.com/

💻 **GitHub Repository:**  
https://github.com/viswanath36/AI-Blockchain-Assistant

---

# 📖 Overview

AI-Powered Blockchain Document Assistant is a full-stack web application designed to securely manage PDF documents while providing AI-powered document interaction.

Users can upload PDF documents, ask questions about their content using **Google Gemini AI**, verify document integrity through **SHA-256 hashing and blockchain-inspired verification**, and manage their uploaded documents from an intuitive dashboard.

This project demonstrates the integration of Artificial Intelligence, Blockchain concepts, Cloud Databases, REST APIs, and Full-Stack Web Development into one practical application.

---

# ✨ Features

### 📄 Smart PDF Upload
- Upload PDF documents securely
- Automatic PDF text extraction
- Store document metadata in MongoDB Atlas

### 🤖 AI Document Assistant
- Chat with uploaded PDFs
- AI-powered document summarization
- Context-aware question answering using Google Gemini

### 🔐 Blockchain Verification
- SHA-256 document hashing
- Blockchain-inspired verification records
- File integrity validation

### 📚 Document Management
- View uploaded PDFs
- Download original documents
- Delete documents
- Search uploaded files

### ☁ Cloud Deployment
- MongoDB Atlas
- Render Backend
- Vercel Frontend

---

# 🖥 Application Workflow

```text
               User

                 │

                 ▼

      React Frontend (Vercel)

                 │

                 ▼

      Express.js Backend (Render)

        │           │            │

        ▼           ▼            ▼

MongoDB Atlas   Google Gemini   Blockchain

        │

        ▼

  Document Management
```

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Axios
- React Router
- React Toastify

## Backend
- Node.js
- Express.js
- Multer
- pdf-parse

## Database
- MongoDB Atlas
- Mongoose

## Artificial Intelligence
- Google Gemini API

## Blockchain
- SHA-256 Hashing
- Custom Blockchain Implementation

## Deployment
- Vercel
- Render
- GitHub

---

# 📂 Project Structure

```text
AI-Blockchain-Assistant

│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

# 📸 Screenshots

## 🏠 Home Page

<img width="1896" height="970" alt="Screenshot 2026-07-01 182023" src="https://github.com/user-attachments/assets/ce72c06a-a51e-45ce-92a4-e24c6ad25f59" />

---

## 📊 Dashboard

<img width="1917" height="960" alt="Screenshot 2026-07-01 181911" src="https://github.com/user-attachments/assets/b21d5fbb-6cf4-4297-91d8-19f876645861" />

---

## 📄 Upload Document

<img width="1917" height="812" alt="Screenshot 2026-07-01 182054" src="https://github.com/user-attachments/assets/94514374-21c9-43b7-9b3c-7cee66284d08" />

---

## 🤖 AI Chat

<img width="1917" height="967" alt="Screenshot 2026-07-01 183657" src="https://github.com/user-attachments/assets/9c5d5d6f-0cd6-4dc7-bd71-7f69ef5db9b7" />

---

## ⛓ Blockchain Verification

<img width="1897" height="975" alt="Screenshot 2026-07-01 183726" src="https://github.com/user-attachments/assets/1a3a205b-fed8-4412-9142-d8e8af1aa6aa" />
<img width="1917" height="970" alt="Screenshot 2026-07-01 183755" src="https://github.com/user-attachments/assets/cb69a08a-eabe-4d76-bd66-40f6c2810146" />

---

## 📚 Documents

<img width="1917" height="667" alt="Screenshot 2026-07-01 182126" src="https://github.com/user-attachments/assets/f47f964b-31bf-4655-9f66-47a4c82ee486" />

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/viswanath36/AI-Blockchain-Assistant.git
```

---

## Backend

```bash
cd backend

npm install

npm start
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
```

> **Important:** Never commit your actual API keys or database credentials to GitHub.

---

# 📌 API Endpoints

| Method | Endpoint | Description |
|----------|-----------------------------|------------------------------|
| POST | `/api/upload` | Upload PDF |
| GET | `/api/documents` | Get all documents |
| GET | `/api/document/:id` | Get document details |
| GET | `/api/document/view/:id` | View PDF |
| GET | `/api/document/download/:id` | Download PDF |
| DELETE | `/api/document/:id` | Delete document |
| POST | `/api/chat/:id` | Chat with document |
| GET | `/api/blockchain` | View blockchain |

---

# 🎯 Key Learning Outcomes

During this project I gained hands-on experience in:

- Full Stack Web Development
- REST API Development
- AI Integration with Google Gemini
- MongoDB Atlas
- Cloud Deployment
- Blockchain Fundamentals
- PDF Processing
- Git & GitHub
- Debugging Production Deployments
- Environment Variable Management

---

# 🔮 Future Improvements

- 🔐 User Authentication (JWT)
- 👤 User-specific document storage
- ☁ Cloudinary / AWS S3 integration
- 📱 Mobile responsive improvements
- 📊 Analytics Dashboard
- 📜 Audit Logs
- 🔍 OCR Support
- 📁 Multiple File Formats

---

# 👨‍💻 Author

## Sangaraju Viswanath

Aspiring Software Engineer passionate about Full Stack Development, Artificial Intelligence, and Cloud Technologies.

### Connect with me

💼 LinkedIn

https://www.linkedin.com/in/s-viswanath-8b545335b/

💻 GitHub

https://github.com/viswanath36

---

# ⭐ If you like this project...

If you found this project interesting or helpful,

⭐ **Please consider giving this repository a star!**

It motivates me to continue building and sharing more projects.

---

<p align="center">
Made with ❤️ by Sangaraju Viswanath
</p>
