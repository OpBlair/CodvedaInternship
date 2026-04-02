# 🚀 Task Manager

A full-stack task management application built with **Vue.js**, **Node.js/Express**, and **PostgreSQL**. Designed to help users efficiently organize, track, and manage their daily tasks.

---

## ✨ Features

- **Full CRUD:** Create, read, update, and cancel tasks  
- **Dynamic Filtering:** View tasks by `all`, `active`, `completed`, or `cancelled`  
- **Priority System:** Color-coded task borders (**High**, **Medium**, **Low**)  
- **State Locking:** Completed and cancelled tasks are locked to prevent edits  
- **Authentication:** Secure API access using JWT  
- **Smart Date Formatting:** Converts ISO timestamps into readable local time  

---

## 🛠️ Tech Stack

**Frontend**
- Vue.js 3 (Options API)  
- CSS3 (Flexbox & Grid)

**Backend**
- Node.js  
- Express.js  

**Database**
- PostgreSQL  

**Other**
- Fetch API (with Authorization headers)  
- JSON Web Tokens (JWT)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Fetch all tasks |
| GET | `/api/tasks/filter/:status` | Fetch tasks by status |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/status` | Toggle active/completed |
| PATCH | `/api/tasks/:id/cancel` | Cancel a task |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v16+)  
- PostgreSQL  
- Backend API running on `http://localhost:3000`  

---

### 2. Installation

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
npm install

```
### 3. Database Setup

Create the database:

```sql
CREATE DATABASE task_db;
```
Run the schema defined in db.js.


👤 Author

Developed by Tonny