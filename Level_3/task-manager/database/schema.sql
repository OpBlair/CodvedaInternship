------ USER TABLE ------- 
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

----- TASK TABLE -------
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    category VARCHAR(15) CHECK (category IN ('work', 'school', 'personal')) DEFAULT 'personal',
    status VARCHAR(10) CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
    priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

