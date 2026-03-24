const pool = require('../config/db');

const getTasks = async () => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
};

module.export = { getTasks };