# Socia-Media-Mern-Stack-project 🌐🚀

![Socia-Media-Mern Header](https://i.postimg.cc/tCLrc6zj/Untitled-1.png)

Socia-Media-Mern is a feature-rich social media platform built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Project Overview 📋

This project aims to create a vibrant social media experience with the following technologies:

- **MongoDB**: Database for storing user data, posts, and more.
- **Express.js**: Backend framework for handling server-side logic and API routes.
- **React**: Frontend library for building user interfaces.
- **Node.js**: Runtime for executing server-side JavaScript code.

## Getting Started 🚀

### Prerequisites
- Node.js installed on your machine
- MongoDB installed and running

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/AyoubChaiba/SociaMediaMern.git

# Navigate to the backend directory
cd SociaMediaMern/backend

# Install backend dependencies
npm install bcryptjs cors dotenv express jsonwebtoken mongodb mongoose multer nodemon sharp-multer

# Create a .env file in the backend directory and add the following environment variables:

MONGODB_URI=<your MongoDB connection string>
PORT=<your server port>
JWT_SECRET=<your JWT secret key>
GOOGLE_CLIENT_ID=<your Google client ID>
GOOGLE_CLIENT_SECRET=<your Google client secret>

# Start the backend server
npm start
```
### Frontend Setup
```bash
# Navigate to the frontend directory
cd SociaMediaMern/frontend

# Install frontend dependencies
npm install react react-dom react-google-login react-hook-form react-icons react-infinite-scroll-component react-lazy-load-image-component react-redux react-toastify redux-thunk yup axios @reduxjs/toolkit

# Create a .env file and add the following environment variables:
# VITE_APP_URL_API=http://localhost:5000

# Start the frontend development server
npm start
```
