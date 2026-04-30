# 🟦 Task Frontend (React + Vite)

## 📌 Project Overview

This is the frontend application for the Task Management System built using:

- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- React Router

It provides a user interface for managing tasks with full CRUD operations and advanced UI features like filtering, searching, and status tracking.

---

## ⚙️ Features

### 📝 Task Management UI
- Create new tasks
- Edit existing tasks
- Delete tasks
- View task details
- Update task status 

### 🔍 Advanced UI Features
- Search tasks by title
- Filter tasks by status
- Pagination support
- Priority indicators (low / medium / high)
- Due date display

### 🧠 Smart UI Logic
- Overdue task highlighting
- Completed-on-time indicators
- Loading states
- Error handling states
- Empty state handling

---

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```
### Run development server
```bash
npm run dev
```

Frontend runs on:
http://localhost:5173

--- 
## 🔐 Environment Variables
Frontend uses .env file.

### 📄 Example .env.example
VITE_API_URL=http://localhost:3000

---

## 📁 Folder Structure

src/
├── api/
├── components/
├── hooks/
├── pages/
├── types/
├── validation/

---

## 🧪 Testing

Run tests
```bash
npm run test
```
Coverage
```bash
npx vitest run --coverage
```
