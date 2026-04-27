# 📌 Task Management System (Full Stack)

## 📌 Project Overview
This is a full-stack Task Management System that allows users to create, manage, update, and track tasks efficiently.

The project simulates a real-world application where tasks can be organized using status, priority, and due dates. It demonstrates frontend-backend communication, database design, validation, testing, and Docker deployment.

---

## 🚀 Features

- ➕ Create new tasks
- 📋 View all tasks
- 🔍 Search tasks by title
- 🎯 Filter tasks by status (todo / in_progress / done)
- ✏️ Edit tasks
- 🗑️ Delete tasks
- 🔄 Update task status
- 📅 Due date tracking
- ⚠️ Priority levels (low / medium / high)
- ⏰ Overdue detection
- ✔️ Completed-on-time indicator
- 📄 Task details page
- 🧪 Unit testing (frontend + backend)
- 🐳 Dockerized full system

---

## 🧠 Business Logic Features

- Tasks automatically marked as **overdue** if due date is passed
- Completed tasks show if they were finished on time
- Activity logging for task actions (backend feature)

---

## 🧱 Tech Stack

### 🟦 Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- React Router
- Vitest + React Testing Library

### 🟩 Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM


### 🐳 DevOps
- Docker
- Docker Compose

---

## 📁 Folder Structure

### Frontend
```txt
src/
├── api/              # Axios API layer
├── components/       # Reusable UI components
├── hooks/            # Custom hooks (useTasks, useTask)
├── pages/            # Application pages
├── types/            # TypeScript types
├── validation/       # Zod validation schemas
├── tests/            # Unit tests
```

### Frontend
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

## ⚙️ Environment Variables
### 📌 Backend (.env)


## ⚙️ Environment Variables

This project requires a `.env` file to run.

Create a `.env` file in the root directory and copy values from `.env.example`.

### Required Variables

- PORT → Server port
- DB_HOST → Database host
- DB_PORT → Database port
- DB_USER → Database username
- DB_PASSWORD → Database password
- DB_NAME → Database name

---

### Example `.env.example`

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=8569
DB_NAME=github_backend
```
---


### 📌 Frontend (.env)

### Example `.env.example`

VITE_API_URL=http://localhost:3000


---

## 🐳 Docker Setup

### 📦 Services

- backend (NestJS API)
- database (PostgreSQL)

---

### 🚀 Run Full Project

```bash
docker-compose up --build

```
### 🛑 Stop Project

```bash
docker-compose down
```
### 🔄 Rebuild After Changes
```bash
docker-compose up --build
```

## 📚 API Endpoints

- GET    /tasks
- GET    /tasks/:id
- POST   /tasks
- PATCH  /tasks/:id
- DELETE /tasks/:id
- PATCH  /tasks/:id/status

## 🧪 Testing

### Backend
```bash
npm run test
```
```bash
npm run test:cov
```
### Frontend
```bash
npm run test
```
```bash
npx vitest run --coverage
```

## Pagination
- Backend supports limit & offset
- Frontend implements page navigation
- Optimized UI for browsing tasks