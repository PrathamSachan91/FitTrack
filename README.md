# FitTrack 🏋️‍♂️

FitTrack is a full-stack fitness tracking web application built to help users manage workouts, track progress, and securely access their accounts using modern authentication and state management techniques.

---

## 🚀 Features

- User authentication with Email & Password
- Google Authentication (OAuth 2.0)
- OTP-based email verification
- Secure email notifications using Nodemailer
- Global state management using Redux
- Efficient data fetching & caching with TanStack Query
- Protected routes and role-based access
- Responsive and user-friendly UI
- Scalable backend architecture

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- TanStack Query (React Query)
- HTML, CSS, JavaScript
- REST API integration

### Backend
- Node.js
- Express.js
- JWT Authentication
- Google OAuth 2.0
- OTP Verification System
- Nodemailer (Email service)
- Database (MongoDB / SQL – based on implementation)

---

## 🔐 Authentication & Security

- JWT-based authentication
- Google Sign-In using OAuth
- OTP verification via email
- Secure password hashing
- Protected API routes with middleware

---
```
FitTrack/
├── Frontend/ # React frontend
│ ├── src/
│ ├── public/
│ ├── redux/
│ ├── services/
│ └── package.json
│
├── server/ # Backend server
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── utils/
│ └── index.js
│
├── .gitignore
└── README.md

```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PrathamSachan91/FitTrack.git
```

### 1️⃣ Frontend Setup
```
cd FitTrack
cd Frontend
npm install
npm start
```
### 1️⃣ Backend Setup
```
cd server
npm install
npm run dev
```

### 🔑 Environment Variables
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

