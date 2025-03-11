Blog Management System

📌 Project Overview

A simple blog management system where users can create, read, update, and delete blog posts. The application includes user authentication and secure operations, built using the MERN stack.

🚀 Live Links

https://blog-portal-page.vercel.app/

🛠️ Tech Stack

Frontend (React + Vite + Bootstrap)

React.js

React Router

Axios (for API calls)

Bootstrap (for styling & responsiveness)

Backend (Node.js + Express.js)

Express.js (REST API)

MongoDB (Database)

JWT (Authentication)

Bcrypt (Password hashing)

Multer & Cloudinary (Image Uploads)

Dotenv (Environment Variables)

📂 Folder Structure

📦 blog-management-system
├── 📂 frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── main.jsx
│   ├── package.json
│   ├── vite.config.js
│
├── 📂 backend (Node.js + Express)
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── server.js
│   ├── package.json
│   ├── .env

🔧 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/YOUR_GITHUB_REPO.git
cd blog-management-system

2️⃣ Backend Setup

cd backend
npm install

Create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Run the server:

npm start

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

🔐 Authentication Flow

User Signup/Login: Uses JWT for token-based authentication.

Password Hashing: Securely hashed using bcrypt.

Protected Routes: Middleware ensures authentication before accessing private routes.

📌 API Endpoints

Auth Routes

POST /api/auth/register
POST /api/auth/login

Blog Routes

GET /api/blogs
POST /api/blogs
PUT /api/blogs/:id
DELETE /api/blogs/:id

🚀 Deployment

Frontend: Hosted on Vercel

Backend: Hosted on Render

Database: MongoDB Atlas



Developed by Subhajit Ghosh
