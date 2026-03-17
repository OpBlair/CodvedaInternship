'use strict';
const showFormBtn = document.getElementById('show-form-btn');
const formOverlay = document.getElementById('form-overlay');
const todoForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const cancelBtn = document.getElementById('cancel-btn');

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

    const li = document.createElement('li');
    li.textContent = taskName;
    taskList.appendChild(li);

    taskInput.value = '';
    formOverlay.style.display = 'none';
})


