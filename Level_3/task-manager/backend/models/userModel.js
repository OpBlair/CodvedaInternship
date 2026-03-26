import pool from '../config/db.js';

const user = {
    // Registration
    async createAccount(username, email, hashedPassword) {
        const sql = `
        INSERT INTO users(user_name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING user_id, user_name, email`;

        const values = [username, email, hashedPassword];
        const { rows } = await pool.query(sql, values);
        return rows[0];
    },

    // User Login
    async login(email){
        const sql = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await pool.query(sql, [email]);
        return rows[0];
    }
};

export default user;