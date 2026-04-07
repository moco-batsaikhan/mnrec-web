import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// Environment variables-ийг ачаалах
function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (!fs.existsSync(envPath)) return;

    const content = fs.readFileSync(envPath, "utf8");
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;

      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (err) {
    console.warn("Could not load .env.local:", err);
  }
}

loadEnvLocal();

// Database тохиргоо
const dbConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "25060"),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: { rejectUnauthorized: false },
};

console.log("🔗 Database тохиргоо:");
console.log(`   Host: ${dbConfig.host}`);
console.log(`   Port: ${dbConfig.port}`);
console.log(`   User: ${dbConfig.user}`);
console.log(`   Database: ${dbConfig.database}`);

async function recreateAllTables() {
  let connection;

  try {
    // Database-тай холбогдох
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database амжилттай холбогдлоо!\n");

    // Бүх хүснэгтүүдийг үүсгэх дараалал (dependencies-ийн дагуу)
    const tablesToCreate = [
      {
        name: "users",
        sql: `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'editor', 'user') DEFAULT 'user',
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            last_login TIMESTAMP NULL,
            INDEX idx_email (email),
            INDEX idx_status (status),
            INDEX idx_role (role)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `,
      },
      {
        name: "contact_messages",
        sql: `
          CREATE TABLE IF NOT EXISTS contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_status (status),
            INDEX idx_created_at (created_at),
            INDEX idx_email (email)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `,
      },
      {
        name: "team",
        sql: `
          CREATE TABLE IF NOT EXISTS team (
            id INT AUTO_INCREMENT PRIMARY KEY,
            en_name VARCHAR(128) NOT NULL,
            mn_name VARCHAR(128) NOT NULL,
            en_position VARCHAR(128) NOT NULL,
            mn_position VARCHAR(128) NOT NULL,
            en_description TEXT NOT NULL,
            mn_description TEXT NOT NULL,
            image_url VARCHAR(256),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `,
      },
      {
        name: "newsletter",
        sql: `
          CREATE TABLE IF NOT EXISTS newsletter (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            status ENUM('active', 'unsubscribed') DEFAULT 'active',
            subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            unsubscribed_at TIMESTAMP NULL,
            INDEX idx_email (email),
            INDEX idx_status (status)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `,
      },
      {
        name: "news",
        sql: `
          CREATE TABLE IF NOT EXISTS news (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(500) NOT NULL,
            content LONGTEXT NOT NULL,
            summary TEXT NOT NULL,
            slug VARCHAR(500) UNIQUE NOT NULL,
            image_url VARCHAR(500),
            status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
            featured BOOLEAN DEFAULT FALSE,
            views INT DEFAULT 0,
            author_id INT,
            published_at TIMESTAMP NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            INDEX idx_status (status),
            INDEX idx_slug (slug),
            INDEX idx_featured (featured),
            INDEX idx_published_at (published_at),
            INDEX idx_author (author_id),
            FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `,
      },
      {
        name: "media",
        sql: `
          CREATE TABLE IF NOT EXISTS media (
            id INT AUTO_INCREMENT PRIMARY KEY,
            filename VARCHAR(255) NOT NULL,
            original_name VARCHAR(255) NOT NULL,
            file_path VARCHAR(500) NOT NULL,
            file_size INT NOT NULL,
            mime_type VARCHAR(100) NOT NULL,
            alt_text VARCHAR(255),
            description TEXT,
            uploaded_by INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            INDEX idx_mime_type (mime_type),
            INDEX idx_uploaded_by (uploaded_by),
            FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `,
      },
      {
        name: "homeText",
        sql: `
          CREATE TABLE IF NOT EXISTS homeText (
            id INT AUTO_INCREMENT PRIMARY KEY,
            section VARCHAR(100) NOT NULL,
            en_title VARCHAR(255),
            mn_title VARCHAR(255),
            en_content LONGTEXT,
            mn_content LONGTEXT,
            image_url VARCHAR(500),
            order_index INT DEFAULT 0,
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            INDEX idx_section (section),
            INDEX idx_status (status),
            INDEX idx_order (order_index)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `,
      },
    ];

    // Хүснэгтүүдийг дараалалтайгаар үүсгэх
    for (const table of tablesToCreate) {
      try {
        console.log(`🔄 ${table.name} хүснэгт үүсгэж байна...`);
        await connection.execute(table.sql);
        console.log(`✅ ${table.name} хүснэгт амжилттай үүсгэгдлээ!`);
      } catch (error) {
        console.error(
          `❌ ${table.name} хүснэгт үүсгэхэд алдаа: ${error.message}`,
        );
        throw error;
      }
    }

    // Хүснэгтүүдийн жагсаалтыг харуулах
    console.log("\n📋 Бүх хүснэгтүүдийн жагсаалт:");
    const [tables] = await connection.execute("SHOW TABLES");
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${Object.values(table)[0]}`);
    });

    console.log("\n🎉 Бүх хүснэгтүүд амжилттай үүсгэгдлээ!");
  } catch (error) {
    console.error("❌ Database алдаа:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Database холболт хаагдлаа");
    }
  }
}

// Script ажиллуулах
console.log("🚀 Бүх хүснэгтүүдийг дахин үүсгэж байна...\n");
recreateAllTables();
