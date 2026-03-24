<template>
  <div class="app-container">
    <!-- header -->
    <header class="app-header">
        <div class="user-info">
            <div class="user-initial">T</div>
            <span class="user-name">Tonny</span>
        </div>
        <button @click="logout" class="logout-btn">logout</button>
    </header>

    <!-- Task Manager Content-->
    <h1>My Task Manager</h1>
    
    <section>
      <div class="controls">
        <button class="add-task-btn" @click="showForm = true">+ add task</button>
        <div class="task-filter">
          <label for="task-filter">filter: </label>
          <select>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>

      <!-- Task Display -->
      <ul v-if="tasks.length" class="task-display-list">
        <li v-for="(task, index) in tasks" :key="index" class="task-card" :class="[task.priority + '-border', { 'is-completed': task.completed }]">
          <div class="task-info">
            <input type="checkbox" v-model="task.completed">
            <div class="task-content">
              <h3 class="task-title">{{ task.name }}</h3>
              <p class="task-desc">{{ task.description }}</p>
              <div class="task-metadata">
                <span class="badge">{{ task.category }}</span>
                <span class="due-date">{{ task.dueDate.replace('T', '') }}</span>               
              </div>
            </div>
          </div>
          <div class="task-actions">
            <button @click="editTask(index)" class="edit-task-btn" :disabled="task.completed" :class="{ 'btn-disabled': task.completed }">Edit</button>
            <button @click="deleteTask(index)" class="delete-task-btn">Delete</button>
          </div>
        </li>
      </ul>

      <!-- Task Form -->
      <div class="modal-overlay" v-if="showForm">
        <div class="task-container">
          <form class="task-form" @submit.prevent="addTask">
            <!-- Task Name -->
            <label for="task-name">task name</label>
            <input id="task-name" name="task-name" v-model="newTask.name" placeholder="what needs to be done ?"/>

            <!-- Task Description -->
             <label for="task-description">description</label>
             <textarea name="text-description" id="text-description" v-model="newTask.description" placeholder="details of the task..." rows="4"></textarea>

            <!-- Task Category -->
            <label for="task-category">category: </label>
            <select name="task-category" id="task-category" v-model="newTask.category">
              <option value="work">work</option>
              <option value="school">school</option>
              <option value="personal">personal</option>
            </select>

            <!-- Task Priority -->
            <label for="task-priority">priority: </label>
            <select id="task-priority" v-model="newTask.priority">
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

            <!-- Task Due Date -->
            <div class="form-group">
              <label for="task-datetime">Due Date & Time</label>
              <input type="datetime-local" id="task-datetime" v-model="newTask.dueDate"/>
            </div>
              
            <!-- Form Buttons -->
            <div class="form-actions">
              <button type="submit">{{ editingIndex !== null ? 'Update' : 'Add' }}</button>
              <button type="button" @click="showForm = false">cancel</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'TaskManager',
    data() {
      return { 
        showForm: false,
        editingIndex: null,
        tasks: [],
        newTask: {
          name: '',
          description: '',
          category: 'work',
          priority: 'medium',
          dueDate: '',
          completed: false
        }
      }
    },
    methods: {
        addTask(){
          if (!this.newTask.name) return; 

          if (this.editingIndex !== null){
            this.tasks.splice(this.editingIndex, 1, { ...this.newTask });
            this.editingIndex = null;
          } else {
            this.tasks.push({ ...this.newTask, completed: false });
          }

          this.resetForm();
          this.showForm = false;
        },
        resetForm() {
          this.newTask = {
            name: '',
            description: '',
            category: 'work',
            priority: 'low',
            dueDate: '',
            completed: false
          };
        },
        editTask(index) {
          this.editingIndex = index;
          this.newTask = { ...this.tasks[index] };
          this.showForm = true;
        },
        deleteTask(index) {
          this.tasks.splice(index, 1);
        },
        logout(){
            this.$router.push('/')
        }
    }
  }
</script>

<style scoped>
    .app-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }
    .user-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .user-initial {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #2563eb;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    .logout-btn {
        background-color: red;
        color: white;
        border: none;
        padding: 8px 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: bold;
        border-radius: 8px;
    }
    .app-container{
      max-width: 500px;
      margin: 50px auto;
      padding: 30px;
      background-color: #f3f4f6;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    h1{
      text-align: center;
      color: black;
      margin-bottom: 25px;
    }
    .controls{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .add-task-btn, select{
      padding: 10px 20px;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
    }
    .task-filter { display: flex; gap: 8px; align-items: center;}
    .task-filter label { font-size: 1.4rem; text-transform: capitalize;}
    .task-filter select { height: 40px;}
    .add-task-btn{ background-color: #2563eb;}
    .controls select, 
    .task-form input, 
    .task-form select {
      padding: 10px 15px;
      border-radius: 8px;
      border: 2px solid #d1d5db;
      cursor: pointer;
      color: black
    }
    .task-form input { cursor: text !important; }
    .modal-overlay{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      background-color: rgba(0, 0, 0, 0.5)
    }
    .task-container {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 400px;
    }
    .task-form{
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .task-form label {
      font-weight: bold;
      color: #374151;
    }
    .task-form button{
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    width: 6rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .task-form button:hover{
    transform: translateY(-2px);
    }
    .task-form button[type="submit"]{
    background-color: green;
    }
    .task-form button[type="button"]{
    background-color: red;
    }
    /* Form Groups*/
    .form-group{ display: flex; flex-direction: column; gap: 5px;}
    /*Form actions */
    .form-actions{display: flex; gap: 10px; justify-content: space-between;}
    /* Tasks Display List */
    .task-display-list{ list-style: none; padding: 0;}
    .task-card{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e1e2f;
      color: #fff;
      padding: 12px 16px;
      margin-bottom: 10px;
      border-radius: 10px;
      transition: all 0.2s ease;
      gap: 10px;
      word-break: break-word;
    }
    .delete-task-btn, .edit-task-btn {
      border: none;
      color: white;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s;
    }
    /* Task List */
    .task-info { display: flex; align-items: flex-start; gap: 15px; flex: 1; }
    .text-content { display: flex; flex-direction: column; gap: 4px;}
    .task-title { margin: 0; font-size: 1.1rem; color: #ffffff;}
    .task-desc { margin: 0; font-size: 0.9rem; color: #b0b0b0;}
    .high-border { border-left: 6px solid #ff4d4d;}
    .medium-border { border-left: 6px solid #ffa500;}
    .low-border { border-left: 6px solid #2ecc71;}
    .is-completed { opacity: 0.6; }
    .is-completed .task-title { text-decoration: line-through; color: #888;}
    .task-metadata { display: flex; margin-top: 5px; gap: 10px; font-size: 0.75rem;}
    .badge { background: #4a4a6a; padding: 2px 8px; border-radius: 12px; text-transform: uppercase;}
    .due-date { color: #3b82f6;}
    .task-actions { display: flex; gap: 8px;}
    .complete-checkbox { width: 18px; height: 18px; cursor: pointer; }
    .delete-task-btn { background: #ff4d4d; }
    .edit-task-btn { background: purple; }
    .btn-disabled { background-color: #4b5563; cursor: not-allowed; opacity: 0.5;}
    .delete-task-btn:hover { background: #e60000;}
</style>