# Team Task Manager

A full-stack project management and task tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS v4.

## Features

- **Authentication**: JWT-based login and registration.
- **Role-based Access**: Admin and Member roles with specific permissions.
- **Project Management**: Create, edit, and delete projects. Assign members to projects.
- **Task Management**: Create, assign, and track tasks (Todo, In Progress, Completed).
- **Kanban Board**: View tasks in a board layout within specific projects.
- **Dashboard**: Real-time overview of tasks and project statistics.
- **Modern UI**: Clean, responsive, and professional interface built with Tailwind CSS.

## Tech Stack

- **Frontend**: React (Vite), React Router DOM, Axios, Tailwind CSS v4, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), bcryptjs, jsonwebtoken.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Local Development

1. **Install Dependencies**
   From the root directory, run the build script to install everything:
   ```bash
   npm run build
   ```
   Or install manually in both folders:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend** (In a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

## Deployment on Railway

This repository is configured as a Monorepo for easy deployment on Railway.

1. Create a new project on Railway and connect your GitHub repository.
2. Railway will automatically detect the root `package.json`.
3. Add your Environment Variables in the Railway dashboard (`MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`).
4. The deployment will automatically run `npm run build` (which installs dependencies and builds the React frontend) and then use `npm start` (which starts the Node.js server to serve both the API and the static React files).

## License
MIT
