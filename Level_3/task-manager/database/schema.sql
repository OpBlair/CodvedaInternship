------ USER TABLE ------- 
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

------ CATEGORY TABLE -------
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(20) NOT NULL CHECK (category_name IN ('work', 'school', 'personal')) DEFAULT 'personal'
);

----- TASK TABLE -------
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE SET NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(10) CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
    priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

