import pool from '../config/db.js';

// Function to get all Tasks
const getTasks = async (userId) => {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
};

// Function to save a new Task to the database
const createTask = async (taskData, userId) => {
    try {
        const sql = `
            INSERT INTO tasks(user_id, title, description , category, priority, due_date)
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`;
        
        const values = [ 
            userId,
            taskData.title,        // title
            taskData.description, // description
            taskData.category,    // category
            taskData.priority,    // priority
            taskData.due_date      // due_date
        ];

        const result = await pool.query(sql, values);

        return result.rows[0]; // return the row that was created.
    } catch (err) {
        console.error("Error creating task:", err);
        console.log("incoming taskData:", taskData);
        throw err;
    }
}

// Function to Update an existing task
const updateTask = async (taskId, taskData, userId) => {
    const sql = `
    UPDATE tasks
    SET title = $1, description = $2, category = $3, priority = $4, due_date = $5
    WHERE task_id = $6 AND user_id = $7
    RETURNING *`;

    const values = [
        taskData.title,
        taskData.description,
        taskData.category,
        taskData.priority,
        taskData.due_date,
        taskId,
        userId
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
}

// Function to Update task status
const updateTaskStatus = async (taskId, newStatus, userId) => {
    const sql = `
        UPDATE tasks
        SET status = $1
        WHERE task_id = $2 AND user_id = $3
        RETURNING *`;
    const result = await pool.query(sql, [newStatus, taskId, userId]);
    return result.rows[0];
}

// Function to cancel a Task
const cancelTask = async (taskId, userId) => {
    const sql = `
        UPDATE tasks 
        SET status = 'cancelled'
        WHERE task_id = $1 AND user_id = $2
        RETURNING *`;
    const result = await pool.query(sql, [taskId, userId]);
    return result.rows[0];
}

// Function to filter Tasks
const getTaskByStatus = async (status, userId) => {
    
    if (status === 'all'){ return await getTasks(); } 

    const sql = `SELECT * FROM tasks WHERE status = $1 AND user_id = $2 ORDER BY created_at DESC`;
    const result = await pool.query(sql, [status, userId]);
    return result.rows;
    
}

export default { getTasks, createTask, cancelTask, updateTask, updateTaskStatus, getTaskByStatus }; // Export function so that other functions can use