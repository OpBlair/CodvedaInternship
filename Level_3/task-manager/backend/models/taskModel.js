const pool = require('../config/db');

const getTasks = async () => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
};

const createTask = async (taskData) => {
    try {
        const sql = 'INSERT INTO tasks(taskName, description , category, priority, dueDate) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        
        const values = [ taskData.name, taskData.description, taskData.category, taskData.priority, taskData.dueDate];

        const result = await pool.query(sql, values);

        return result.rows[0]; // return the row that was created.
    } catch (err) {
        console.error("Error creating task:", err.message);
        throw err;
    }
}

module.export = { getTasks, createTask }; // Export function so that other functions can use