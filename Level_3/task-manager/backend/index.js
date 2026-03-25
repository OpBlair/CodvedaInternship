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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
