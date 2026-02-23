# GSCMA Website

A full-stack React application for the Graduate Student Computer and Mathematical Association (GSCMA) at Wayne State University.

## Project Structure

```
my-react-app/
├── backend/          # Express.js API server
├── frontend/         # React frontend with Vite
├── package.json      # Root package.json with scripts
└── README.md         # This file
```

## Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   ```bash
   # Copy example files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   
   # Edit the .env files with your actual values
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start both the backend (port 5000) and frontend (port 5173) simultaneously.

## Environment Setup

### Backend (.env)
- `MONGODB_URI` - Your MongoDB connection string
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_CLIENT_EMAIL` - Firebase service account email
- `FIREBASE_PRIVATE_KEY` - Firebase service account private key

### Frontend (.env)
- `VITE_FIREBASE_*` - Firebase client configuration
- `VITE_API_URL` - Backend API URL (http://localhost:5000/api for development)

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run build` - Build the frontend for production
- `npm start` - Start the backend in production mode

## Features

- User authentication with Firebase
- Member registration and management
- Event creation and RSVP system
- Admin dashboard
- Responsive design with Tailwind CSS and DaisyUI

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Vite
- Tailwind CSS + DaisyUI
- Firebase Auth
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Firebase Admin SDK
- CORS enabled

