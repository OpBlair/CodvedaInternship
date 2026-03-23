const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Global Middleware
app.use(cors()); 
app.use(express.json()); 

// 2. Import Routes
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// 3. Mount Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// 4. Basic Health Check
app.get('/', (req, res) => {
    res.send('Task Manager API is running...');
});

// 5. Start Server
app.listen(PORT, () => {
    console.log(`Server is sprinting on http://localhost:${PORT}`);
});