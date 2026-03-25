// Logic to Start the server and link to the database
import 'dotenv/config';
import express from 'express';

import cors from 'cors';

// Importing functions in taskModel.js
import taskModel from './models/taskModel.js';

const app = express();
const port = process.env.port || 3000; 

app.use(cors());
app.use(express.json());

// --- Routes ---- 
// 1.Fetch Tasks
app.get('/api/tasks', async(req, res) => {
    try{
        const tasks = await taskModel.getTasks();
        res.json(tasks);
    }catch (err){
        res.status(500).json({error: err.message});
    }
});

// 2. Create a task
app.post('/api/tasks', async(req, res) => {
    try{
        const newTask = await taskModel.createTask(req.body);
        res.status(201).json(newTask);
    }catch (err){
        res.status(500).json({error: err.message});
    }
});

// Edit a Task
app.put('/api/tasks/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const taskData = req.body;

        const updateTask = await taskModel.updateTask(id, taskData);

        if(!updateTask){
            return res.status(404).json({error: "Task not found"});
        }
        res.json(updateTask);
    }catch(error){
        console.error("Error updating task:", error);
        res.status(500).send("Server Error");
    }
});

// Cancel a Task
app.patch('/api/tasks/:id/cancel', async (req, res) => {
    try{
        const { id } = req.params;
        const updatedTask = await taskModel.cancelTask(id);

        if(!updatedTask){
            return res.status(404).json({error: "Task not found"});
        }
        res.status(200).json(updatedTask);
    } catch (err){
        console.error("Cancel Error:", err);
        res.status(500).json({error: err.message});
    }
});

// Mark a task as complete
app.patch('/api/tasks/:id/status', async (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await taskModel.updateTaskStatus(id, status);

        if(!updatedTask){
            return res.status(404).json({error: "Task not found"});
        }
        res.status(200).json(updatedTask);
    } catch (err){
        console.error("Cancel Error:", err);
        res.status(500).json({error: err.message});
    }
});

// Filter tasks
app.get('/api/tasks/filter/:status', async (req, res) => {
    try{
        const { status } = req.params; // getting status from URL
        const filteredTask = await taskModel.getTaskByStatus(status); // passing it to a function.
        res.json(filteredTask); // sending the list to Vue.
    } catch(error){
        console.error("Filtering error:", error);
        res.status(500).json({error: "Couldn't Filter tasks"});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
