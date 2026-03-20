'use strict';
const showFormBtn = document.getElementById('show-form-btn');
const formOverlay = document.getElementById('form-overlay');
const todoForm = document.getElementById('todo-form');
const submitBtn = todoForm.querySelector('button[type="submit"]');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const cancelBtn = document.getElementById('cancel-btn');
const date = document.getElementById('task-date');
const filterDropdown = document.getElementById('filter-task');

let editingTaskId = null;
// Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('taskName', `${task.priority}-taskPriority`);
    if(task.completed) li.classList.add('completed');

    li.dataset.id = task.id;

    li.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-details">
                <span class="task-name">${task.name}</span>
                <div class="task-meta">
                    <small class="task-time">${task.date}</small>
                    <small class="task-priority">Priority: ${task.priority}</small>
                </div>
            </div>
        </div>
        <div class="task-right">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
})

// Toggle Form visibilty
showFormBtn.addEventListener('click', () => {
    formOverlay.style.display = 'flex';
    editingTaskId = null;
    submitBtn.textContent = 'Add';
    todoForm.reset();
})

cancelBtn.addEventListener('click', () => {
    formOverlay.style.display = 'none';
    editingTaskId = null;
    submitBtn.textContent = 'Add';
})

// Task Submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = taskInput.value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = date.value;
    const formattedDate = taskDate ? taskDate.replace('T', ' ') : 'No deadline';
    
    if(editingTaskId !== null) {
        const task = tasks.find(t => t.id === editingTaskId);
        task.name = taskInput.value;
        task.date = date.value ? date.value.replace('T', ' ') : 'No deadline';
        task.priority = document.getElementById('task-priority').value;

        localStorage.setItem('tasks', JSON.stringify(tasks));

        const li = taskList.querySelector(`li[data-id="${editingTaskId}"]`);
        li.querySelector('.task-name').textContent = task.name;
        li.querySelector('.task-time').textContent = task.date;
        li.querySelector('.task-priority').textContent = `Priority: ${task.priority}`;

        li.className = `taskName ${task.priority}-taskPriority`;
        if(task.completed) li.classList.add('completed');

        editingTaskId = null;
        submitBtn.textContent = 'Add';
    } else {
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
        
        // First save to Local Storage.
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.dataset.id = newTask.id;
        
        // Then update the UI(DOM)
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
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
        submitBtn.textContent = 'Add';
    }

    taskInput.value = '';
    date.value = '';
    formOverlay.style.display = 'none';
})
// Edit Task button
taskList.addEventListener('click', (e) => {
    if(e.target.classList.contains('edit-btn')){
        const li = e.target.closest('li');
        const id = Number(li.dataset.id);
        const task = tasks.find(task => task.id === id);

        taskInput.value = task.name;
        date.value = task.date !== 'No deadline' ? task.date.replace(' ', 'T') : '';
        document.getElementById('task-priority').value = task.priority;

        formOverlay.style.display = 'flex';

        editingTaskId = id;
        submitBtn.textContent = 'Update';

    }
})
// Delete Task button 
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const li = e.target.closest('li');
        const id = Number(li.dataset.id);

        const taskIndex = tasks.findIndex(task => task.id === id);

        if(taskIndex !== -1){
            // Remove the task from the storage array
            tasks.splice(taskIndex, 1);

            // Update localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Remove item from DOM
        li.remove();
    }
})

// CheckBox Logic
taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('complete-checkbox')) {
        const li = e.target.closest('li');
        li.classList.toggle('completed');

        const id = Number(li.dataset.id);

        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].id === id){
                tasks[i].completed = e.target.checked;
                break;
            }
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})

// Tasks Filter
filterDropdown.addEventListener('change', (e) => {
    const filterValue = e.target.value;
    const allTasks = taskList.querySelectorAll('li');

    allTasks.forEach(li => {
        const isCompleted = li.classList.contains('completed');

        switch(filterValue){
            case 'all':
                li.style.display = 'flex';
                break;
            case 'completed':
                li.style.display = isCompleted ? 'flex' : 'none';
                break;
            case 'active':
                li.style.display = !isCompleted ? 'flex' : 'none';
                break;
        }
    })
}) 
