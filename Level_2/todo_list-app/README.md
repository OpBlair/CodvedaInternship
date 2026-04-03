# 📝 Todo List App

A simple and interactive Todo List web application built with **HTML, CSS, and JavaScript**. This app allows users to manage tasks efficiently with features like adding, editing, deleting, filtering, and saving tasks using local storage.

---

## 🚀 Features

* ✅ Add new tasks
* ✏️ Edit existing tasks
* 🗑️ Delete tasks
* ✔️ Mark tasks as completed
* 📅 Assign due dates
* 🔥 Set task priority (Low, Medium, High)
* 🔍 Filter tasks (All, Active, Completed)
* 💾 Persistent storage using **localStorage**

---

## 📁 Project Structure

```
todo-list-app/
│
├── index.html      # Main HTML structure
├── style.css       # Styling for the app
└── todoApp.js      # Application logic
```

---

## 🖥️ How It Works

### 1. Adding a Task

* Click the **"Add Task"** button
* Fill in:

  * Task name
  * Due date (optional)
  * Priority level
* Click **Add**

---

### 2. Editing a Task

* Click the **Edit** button next to a task
* Modify the details
* Click **Update**

---

### 3. Deleting a Task

* Click the **Delete** button to remove a task

---

### 4. Completing a Task

* Use the checkbox to mark a task as completed
* Completed tasks are visually styled (strikethrough + faded)

---

### 5. Filtering Tasks

Use the dropdown to filter:

* **All** → Shows all tasks
* **Active** → Shows incomplete tasks
* **Completed** → Shows finished tasks

---

## 💾 Local Storage

* Tasks are saved in the browser using `localStorage`
* Data persists even after refreshing or closing the browser
* Each task includes:

  ```js
  {
    id: Number,
    name: String,
    date: String,
    priority: String,
    completed: Boolean
  }
  ```

---

## 🎨 UI Highlights

* Responsive design (works on mobile & desktop)
* Modal form overlay for adding/editing tasks
* Color-coded priority levels:

  * 🟢 Low
  * 🟠 Medium
  * 🔴 High
* Smooth hover and transition effects

---

## ⚙️ Technologies Used

* HTML5
* CSS3 (Flexbox + Responsive Design)
* Vanilla JavaScript (ES6)

---

## 🛠️ Setup Instructions

1. Clone or download the project
2. Open the folder
3. Run `index.html` in your browser

---

## 📌 Future Improvements

* 🔔 Task reminders / notifications
* ☁️ Cloud sync (Firebase / backend)
* 📊 Task statistics dashboard
* 🌙 Dark mode toggle

---

## 👨‍💻 Author

Developed By Tonny Blair