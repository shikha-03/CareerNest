# CareerNest
CareerNest is a recruitment platform designed to connect candidates with employers through job discovery, applications, dashboards, profile management, notifications, and secure email-based authentication.


## Overview

CareerNest provides a modern hiring experience for both candidates and employers. Candidates can search jobs, save opportunities, apply for roles, upload resumes, and manage their profiles. Employers can post jobs, manage applicants, update application statuses, and maintain company profiles.

The platform includes secure OTP-based signup verification, JWT authentication, file uploads, MongoDB data storage, and Socket.io support for real-time features.

## Features

### Authentication
- Email OTP-based signup verification
- Email format validation
- Email domain MX record validation
- JWT-based login
- Role-based access control
- Forgot and reset password support
- Protected candidate and employer routes

### Candidate
- Candidate dashboard
- Job search and job details
- Save and unsave jobs
- Apply for jobs
- Track applications
- Upload resume
- Upload profile photo
- Manage profile and settings
- View notifications

### Employer
- Employer dashboard
- Company profile management
- Post jobs
- View applicants
- Update application status
- View candidate profiles
- Team management
- Upload company logo
- Recruitment analytics

### Real-Time Support
- Live notifications
- Application status updates
- Employer-candidate chat foundation
- Socket.io integration

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Framer Motion
- Axios
- Context API
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- Multer
- Socket.io

## Project Structure

```text
CareerNest/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   ├── .env.example
│   └── package.json
│
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   └── utils/
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── .env.example
└── .gitignore


Getting Started
Prerequisites
Install the following:
Node.js
npm
MongoDB
Frontend Setup
Install dependencies:
npm install
Create a .env file in the root folder:

Start the frontend:
npm run dev
