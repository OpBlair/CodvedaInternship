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
          <select v-model="filterStatus" @change="applyFilter(filterStatus)">
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>

      <!-- Task Display -->
      <ul v-if="tasks.length" class="task-display-list">
        <li v-for="task in tasks" :key="task.task_id" class="task-card" :class="[task.priority + '-border', { 'is-completed': task.status === 'completed' }]">
          <div class="task-info">
            <input type="checkbox" :checked="task.status === 'completed'" @click="toggleStatus(task)" class="complete-checkbox" :class="{ 'btn-disabled': task.status === 'completed' }">
            <div class="task-content">
              <h3 class="task-title">{{ task.title }}</h3>
              <p class="task-desc">{{ task.description }}</p>
              <div class="task-metadata">
                <span class="badge">{{ task.category }}</span>
                <span class="due-date">{{ task.due_date ? task.due_date.replace('T', ' ').slice(0,16) : 'No date set'}}</span>               
               </div>
            </div>
          </div>
          <div class="task-actions">
            <button @click="editTask(task.task_id)" class="edit-task-btn" :disabled="task.status === 'completed'" :class="{ 'btn-disabled': task.status === 'completed' }">Edit</button>
            <button @click="cancelTask(task.task_id)" class="delete-task-btn" :disabled="task.status === 'completed'" :class="{ 'btn-disabled': task.status === 'completed' }">Cancel</button>
          </div>
        </li>
      </ul>
      
      <!-- Task Form -->
      <div class="modal-overlay" v-if="showForm">
        <div class="task-container">
          <form class="task-form" @submit.prevent="addTask">
            <!-- Task Name -->
            <label for="task-name">task name</label>
            <input id="task-name" name="task-name" v-model="newTask.title" placeholder="what needs to be done ?"/>

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
              <input type="datetime-local" id="task-datetime" v-model="newTask.due_date"/>
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
        filterStatus: 'all',
        tasks: [],
        newTask: {
          title: '',
          description: '',
          category: 'work',
          priority: 'medium',
          due_date: '',
          status: 'active'
        }
      }
    },
    // Automatich function to fetch tasks when the page opens
    async created() {
      this.fetchTasks();
    },
    methods: {
      async fetchTasks() {
        try{
          const response = await fetch('http://localhost:3000/api/tasks');
          this.tasks = await response.json();
        }catch (error){
          console.error("Could not load Tasks:", error);
        }
      },
      async addTask(){
        if (!this.newTask.title) return; 

        const isEditing = this.editingIndex !== null;
        const url = isEditing ? `http://localhost:3000/api/tasks/${this.editingIndex}` : 'http://localhost:3000/api/tasks';
        const method = isEditing ? 'PUT' : 'POST';
        try {
          const response = await fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.newTask)
          });

          if (response.ok){
            await this.fetchTasks();
            this.resetForm();
            this.showForm = false;
          }
        } catch(error) {
          console.error("Error saving task: ", error);
        }
      },
        resetForm() {
          this.editingIndex = null;
          this.newTask = {
            title: '',
            description: '',
            category: 'work',
            priority: 'low',
            due_date: '',
            status: 'active'
          };
        },
        editTask(task_id) {
          const taskToEdit = this.tasks.find(t => t.task_id === task_id);

          if(taskToEdit){
            this.editingIndex = task_id;

            let formattedDate = '';
            if(taskToEdit.due_date){
              formattedDate = taskToEdit.due_date.slice(0, 16);
            }
            this.newTask = { ...taskToEdit, due_date: formattedDate };
            this.showForm = true;
          }
        },
        async cancelTask(taskId){
          try{
            // tell db to cancel task with a specific id
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}/cancel`, {
              method: 'PATCH'
            });

            if (response.ok){
              // after updating db fetch tasks.
              await this.fetchTasks();
            }
          }catch(error){
            console.error("Couldn't cancel that task:", error);
          }
        },
        async toggleStatus(task) {
          const newStatus = task.status === 'active' ? 'completed' : 'active';

          try{
            const response = await fetch(`http://localhost:3000/api/tasks/${task.task_id}/status`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
            });

            if(response.ok){
              await this.fetchTasks();
            }else{
              console.error("Failed to update the status on server");            }
          }catch (error){
            console.error("Error updating status:", error);
          }
        },
        
        async applyFilter(status){
          try{
            const response = await fetch(`http://localhost:3000/api/tasks/filter/${status}`);
            
            if(response.ok){ this.tasks = await response.json(); }
          } catch(error){
            console.error("Error Filtering tasks:", error);
          }
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
    .is-completed .task-title { text-decoration: line-through; color: #888; }
    .delete-task-btn { background: #ff4d4d; }
    .edit-task-btn { background: purple; }
    .btn-disabled { background-color: #4b5563; cursor: not-allowed; opacity: 0.5;}
    .delete-task-btn:hover { background: #e60000;}
</style>