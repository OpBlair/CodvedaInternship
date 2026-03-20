'use strict';
const showFormBtn = document.getElementById('show-form-btn');
const formOverlay = document.getElementById('form-overlay');
const todoForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const cancelBtn = document.getElementById('cancel-btn');
const date = document.getElementById('task-date');

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

    const li = document.createElement('li');
    li.classList.add('taskName', `${taskPriority}-taskPriority`);

    li.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="complete-checkbox">
            <div class="task-details">
                <span class="task-name">${taskName}</span>
                <small class="task-time">${formattedDate}</small>
                <small>Priority: ${taskPriority}</small>
            </div>
        </div>
        <div class="task-right">
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = '';
    date.value = '';
    formOverlay.style.display = 'none';
})


