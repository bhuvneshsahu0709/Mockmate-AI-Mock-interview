-- Create user_answer table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_answer (
    id SERIAL PRIMARY KEY,
    mock_id_ref VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    correct_ans TEXT,
    user_ans TEXT,
    feedback TEXT,
    rating VARCHAR(50),
    user_email VARCHAR(255),
    created_at VARCHAR(255)
);
