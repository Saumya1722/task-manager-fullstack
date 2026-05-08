# Team Task Manager (Full Stack)

A full-stack task management application where users can create projects, assign and manage tasks, and track project progress.

---

# Features

- User Authentication using JWT
- Admin and Member roles
- Create and manage projects
- Create, update, delete tasks
- Toggle task completion
- Dashboard statistics
- REST API integration
- Frontend connected with backend

---

# Tech Stack

## Frontend
- React.js
- JavaScript
- Fetch API

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- Prisma ORM
- SQLite

---

# Folder Structure

task-manager-project/

├── frontend/

├── task-manager-backend/

---

# Backend Setup

Go to backend folder:

```bash
cd task-manager-backend
```

Install dependencies:

```bash
npm install
```

Run server:

```bash
npm run dev
```

---

# Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm start
```

---

# API Routes

## Authentication

POST /auth/register

POST /auth/login

---

## Projects

GET /projects

POST /projects

GET /projects/:id/tasks

GET /projects/:id/dashboard

---

## Tasks

GET /tasks

POST /tasks

PATCH /tasks/:id

DELETE /tasks/:id

PATCH /tasks/:id/toggle

---

# Roles

## Admin
- Create projects
- Manage all tasks

## Member
- View and manage assigned tasks

---

# Author

Saumya Sinha