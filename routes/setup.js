import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/init", async (req, res) => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create loans table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS loans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        full_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        loan_amount INTEGER,
        income VARCHAR(255),
        employer VARCHAR(255),
        ssn VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Pending Review',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create documents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        file_name VARCHAR(255),
        file_url TEXT,
        uploaded_at TIMESTAMP DEFAULT NOW()
      );
    `);

    res.json({ message: "Database tables created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating tables", error: err.message });
  }
});

export default router;
