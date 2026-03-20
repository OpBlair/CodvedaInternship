'use strict';
const showFormBtn = document.getElementById('show-form-btn');
const formOverlay = document.getElementById('form-overlay');
const todoForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const cancelBtn = document.getElementById('cancel-btn');
const date = document.getElementById('task-date');

// Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Toggle Form visibilty
showFormBtn.addEventListener('click', () => {
    formOverlay.style.display = 'flex';
})

cancelBtn.addEventListener('click', () => {
    formOverlay.style.display = 'none';
})

// Task Submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = taskInput.value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = date.value;
    const formattedDate = taskDate ? taskDate.replace('T', ' ') : 'No deadline';

    // New Task Object
    const newTask = {
        id: Date.now(),
        name: taskName,
        date: formattedDate,
        priority: taskPriority,
        completed: false
    };

    const li = document.createElement('li');
    li.classList.add('taskName', `${taskPriority}-taskPriority`);

    li.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="complete-checkbox">
            <div class="task-details">
                <span class="task-name">${taskName}</span>
                <div class="task-meta">
                    <small class="task-time">${formattedDate}</small>
                    <small class="task-priority">Priority: ${taskPriority}</small>
                </div>
            </div>
        </div>
        <div class="task-right">
            <button class="delete-btn">Delete</button>
        </div>
    `;

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    taskList.appendChild(li);

    taskInput.value = '';
    date.value = '';
    formOverlay.style.display = 'none';
})
// Adding functionality to Task delete button 
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const li = e.target.closest('li');
        li.remove();
    }
})
// CheckBox Logic
taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('complete-checkbox')) {
        const li = e.target.closest('li');
        li.classList.toggle('completed');
    }
})
