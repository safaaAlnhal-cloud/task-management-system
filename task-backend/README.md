# 🟩 Task Backend API

## 📌 Project Overview

This is the backend service for the Task Management System built using **NestJS + TypeScript + PostgreSQL + TypeORM**.

It provides a RESTful API responsible for handling all business logic such as task management, filtering, pagination, validation, and activity tracking.

---

## ⚙️ Features

### 📝 Task Management
- Create task
- Update task
- Delete task
- Get single task
- Get all tasks
- Update task status

### 🔍 Advanced Features
- Search tasks by title
- Filter by status (todo / in_progress / done)
- Pagination (limit / offset)
- Task priority (low / medium / high)
- Due date tracking

### 🧠 Business Logic
- Auto-detect overdue tasks
- Mark completed-on-time tasks
- Activity log tracking for each action (create/update/delete/status change)

### 🛡️ Validation & Error Handling
- DTO validation using class-validator
- Centralized exception handling

---

## 🚀 Setup (Local Development)

### 1. Install dependencies
```bash
npm install
```
### 2. Run development server
```bash
npm run start:dev

```
### Backend will run on
http://localhost:3000

---

### backend Structure
```txt
src/
├── tasks/
├── activity-log/
├── database/
├── common/
├── config/
├── migrations/
├── seeds/

```
---

## 🔐 Environment Variables

This project uses environment variables for configuration.
### 📌 Important:
- You must create a .env file
- You can copy from .env.example
### 📄 Example .env.example
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=task_db

---
## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create task |
| PATCH | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |
| PATCH | /tasks/:id/status | Update status |
---
## 🐳 Docker

Run full system from root:

docker-compose up --build

### What happens:
- PostgreSQL runs in container
- Backend connects using DB_HOST=db
---

## 🧪 Testing

### Run tests
```bash
npm run test
```

### Run test coverage
```bash
npm run test:cov
```