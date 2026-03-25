import pool from '../config/db.js';

// Function to get all Tasks
const getTasks = async () => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
};

// Function to save a new Task to the database
const createTask = async (taskData) => {
    try {
        const sql = `
            INSERT INTO tasks(title, description , category, priority, due_date)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`;
        
        const values = [ 
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
const updateTask = async (taskId, taskData) => {
    const sql = `
    UPDATE tasks
    SET title = $1, description = $2, category = $3, priority = $4, due_date = $5
    WHERE task_id = $6
    RETURNING *`;

    const values = [
        taskData.title,
        taskData.description,
        taskData.category,
        taskData.priority,
        taskData.due_date,
        taskId
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
}

// Function to Update task status
const updateTaskStaus = async (taskId, newStatus) => {
    const sql = `
        UPDATE tasks
        SET status = $1
        WHERE task_id = $2
        RETURNING *`;
    const result = await pool.query(sql, [newStatus, taskId]);
    return result.rows[0];
}

// Function to cancel a Task
const cancelTask = async (taskId) => {
    const sql = `
        UPDATE tasks 
        SET status = 'cancelled'
        WHERE task_id = $1
        RETURNING *`;
    const result = await pool.query(sql, [taskId]);
    return result.rows[0];
}

export default { getTasks, createTask, cancelTask, updateTask, updateTaskStaus }; // Export function so that other functions can use