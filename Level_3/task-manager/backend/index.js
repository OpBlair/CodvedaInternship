// Logic to Start the server and link to the database
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authMiddleware from './middleware/authMiddleware.js'; // importing functions in authMiddleware.js
import authController from './controllers/authController.js';  // importing functions in authController.js
import taskModel from './models/taskModel.js'; // Importing functions in taskModel.js

const app = express();
const port = process.env.port || 3000; 

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options(/.*/, cors()); 
app.use(express.json());

// --- Routes ---- 
// --- Auth Routes ---
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// 1.Fetch Tasks
app.get('/api/tasks', authMiddleware, async(req, res) => {
    try{
        const tasks = await taskModel.getTasks(req.user.user_id);
        res.json(tasks);
    }catch (err){
        res.status(500).json({error: err.message});
    }
});

// 2. Create a task
app.post('/api/tasks',  authMiddleware, async(req, res) => {
    try{
        const newTask = await taskModel.createTask(req.body, req.user.user_id);
        res.status(201).json(newTask);
    }catch (err){
        res.status(500).json({error: err.message});
    }
});

// Edit a Task
app.put('/api/tasks/:id', authMiddleware, async (req, res) => {
    try{
    
        const updateTask = await taskModel.updateTask(req.params.id, req.body, req.user.user_id);

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
app.patch('/api/tasks/:id/cancel', authMiddleware, async (req, res) => {
    try{
        const { id } = req.params;
        const updatedTask = await taskModel.cancelTask(id, req.user.user_id);

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
app.patch('/api/tasks/:id/status', authMiddleware, async (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await taskModel.updateTaskStatus(id, status, req.user.user_id);

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
app.get('/api/tasks/filter/:status', authMiddleware, async (req, res) => {
    try{
        const { status } = req.params; // getting status from URL
        const filteredTask = await taskModel.getTaskByStatus(status, req.user.user_id); // passing it to a function.
        res.json(filteredTask); // sending the list to Vue.
    } catch(error){
        console.error("Filtering error:", error);
        res.status(500).json({error: "Couldn't Filter tasks"});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
