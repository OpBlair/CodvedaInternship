// Creates Connection to DB
import 'dotenv/config';
import pkg from 'pg';

const {Pool} = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
    //user: process.env.db_user,
    //host: process.env.db_host,
    //database: process.env.db_name,
    //password: process.env.db_password,
    //port: process.env.db_port,
});

export default pool;