import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// Load environment variables
import { loadEnvLocal } from "../lib/database.js";
loadEnvLocal();

const dbConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "25060"),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
};

async function createNewTable() {
  try {
    // Connect to database
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database холбогдлоо");

    // Жишээ: Шинэ хүснэгт үүсгэх
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(255) NOT NULL,
        name_mn VARCHAR(255) NOT NULL,
        description_en TEXT,
        description_mn TEXT,
        price DECIMAL(10,2) DEFAULT 0.00,
        category VARCHAR(100),
        status ENUM('active', 'inactive', 'draft') DEFAULT 'draft',
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        INDEX idx_status (status),
        INDEX idx_category (category),
        INDEX idx_name_en (name_en)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.execute(createTableSQL);
    console.log("✅ Шинэ хүснэгт амжилттай үүсгэгдлээ!");

    // Close connection
    await connection.end();
  } catch (error) {
    console.error("❌ Алдаа гарлаа:", error.message);
    process.exit(1);
  }
}

// Script ажиллуулах
createNewTable();
