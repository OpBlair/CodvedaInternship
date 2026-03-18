<template>
  <div class="app-container">
    <h1>My Task Manager</h1>
    
    <section>
      <div class="controls">
        <button class="add-task-btn">add task</button>
        <div class="task-filter">
          <label for="task-priority">filter: </label>
          <select>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>

      <!-- Task Form -->
      <div class="task-container">
        <form class="task-form">
          <input id="task-name" name="task-name" placeholder="what needs to be done ?"/>
          <label for="task-priority">priority: </label>
            <select id="task-priority">
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

          <div class="form-group">
            <label for="task-datetime">Due Date & Time</label>
            <input type="datetime-local" id="task-datetime"/>
          </div>
            
          <div class="form-actions">
            <button type="submit">add</button>
            <button type="button">cancel</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style scoped>
.app-container{
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
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
.task-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
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
  transform: translate-Y(-2px);
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
</style>