import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_I9ESzqOxL7ak@ep-misty-bar-ad43pumb-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

async function createTable() {
  try {
    const result = await sql`
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
    `;
    console.log('Table created successfully:', result);
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

createTable();
