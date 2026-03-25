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

export default { getTasks, createTask }; // Export function so that other functions can use