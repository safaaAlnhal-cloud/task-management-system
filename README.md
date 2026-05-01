# 🟥 Task Management System (Full Stack)

## 📌 Project Overview

This is a full-stack Task Management System built to simulate a real-world application.

The system allows users to create, manage, update, and track tasks using a clean UI connected to a backend API and a PostgreSQL database.

The project demonstrates full-stack development concepts including:
- Frontend & backend integration
- API design
- Database management
- Validation and error handling
- Docker-based environment setup

---

## 🚀 Features

### 📝 Core Features
- Create task
- Update task
- Delete task
- View task details
- Update task status (todo / in_progress / done)

### 🔍 Advanced Features
- Search tasks by title
- Filter tasks by status
- Pagination (limit / offset)

### 🧠 Business Logic
- Detect overdue tasks automatically
- Show completed-on-time tasks
- Track activity logs (create, update, delete, status change)

---
## 🧠 System Architecture

Frontend (React)
   ↓ HTTP Requests (Axios)
Backend (NestJS API)
   ↓
Service Layer (Business Logic)
   ↓
Repository Layer (TypeORM)
   ↓
PostgreSQL Database
---

## 🧱 Tech Stack

### 🟦 Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- React Router

### 🟩 Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM

### 🐳 DevOps
- Docker
- Docker Compose

---

## 📁 Project Structure
```
task-management-system/
│
├── task-frontend/ # React app
├── task-backend/ # NestJS API
├── docker-compose.yml # Runs full system
└── README.md

```

---

## ⚙️ Prerequisites (VERY IMPORTANT)

Before running the project, make sure you have:

- Node.js installed
- npm installed
- Docker installed
- Docker Compose installed

Check versions:

```bash
node -v
npm -v
docker --version
docker-compose --version

```
---
## 🔐 Environment Variables

This project uses environment variables for configuration.

⚠️ Important :
Use .env.example as a template

### Backend .env
Create file:
task-backend/.env

Example:

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=task_db

### Frontend .env
Create file:
task-frontend/.env

Example:

VITE_API_URL=http://localhost:3000

---
## 🐳 Docker Explained (IMPORTANT)
### 💡 What is Docker?
Docker allows you to run the entire system in isolated containers without installing PostgreSQL manually.

### 💡 What Docker does in this project:
Runs PostgreSQL database
Runs backend server
Runs frontend app
Connects everything automatically

### 🚀 Run the Full System (Recommended)

```bash
docker-compose up --build
```
🔥 What will happen:
- Database container starts
- Backend connects to database
- Frontend connects to backend
- Full system runs automatically

### 🌐 Application URLs

| Service   | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |
| Database | PostgreSQL (port 5432) |

### 🛑 Stop the System
```bash
docker-compose down
```

### 🔄 Rebuild After Changes
```bash
docker-compose up --build
```

### 💡 Note:
When running with Docker, backend uses a different environment configuration:
DB_HOST=db

Instead of:

DB_HOST=localhost

Because services communicate inside Docker network.
---
## 🧪 Testing

###  Backend
```bash
npm run test
npm run test:cov
```

### Frontend
```bash
npm run test
npx vitest run --coverage
```
---
## ⚙️ Continuous Integration (CI)

This project uses GitHub Actions to automatically validate code on every push and pull request.

### 🔄 What CI does:
Install dependencies for frontend & backend
Run ESLint (code quality check)
Build frontend and backend
Run all tests automatically

### 🧪 CI Workflow

The pipeline runs the following steps:

Frontend
```bash
npm install
npm run lint
npm run build
npm run test
```
Backend
```bash
npm install
npm run build
npm run test
```




