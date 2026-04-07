import mysql from "mysql2/promise";

// Environment variables-ийг ачаалах function (database.ts-аас)
function loadEnvLocal() {
  try {
    const fs = require("fs");
    const path = require("path");
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (!fs.existsSync(envPath)) return;

    const content = fs.readFileSync(envPath, "utf8");
    // ... same loading logic
  } catch (err) {
    console.warn("Could not load .env.local:", err);
  }
}

// Quick database query function
async function runQuery(sql, description = "SQL Query") {
  let connection;

  try {
    const dbConfig = {
      host:
        process.env.DATABASE_HOST || "db-mysql-sgp1-75782-do-user-25594947-",
      port: parseInt(process.env.DATABASE_PORT || "25060"),
      user: process.env.DATABASE_USER || "doadmin",
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || "defaultdb",
      ssl: { rejectUnauthorized: false },
    };

    connection = await mysql.createConnection(dbConfig);
    console.log("🔗 Database холбогдлоо...");

    const [results] = await connection.execute(sql);
    console.log(`✅ ${description} - Амжилттай!`);
    console.log("Үр дүн:", results);

    return results;
  } catch (error) {
    console.error(`❌ ${description} - Алдаа:`, error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Хэрэглэх жишээнүүд:
export { runQuery };

// Консолоос шууд ажиллуулах бол:
if (import.meta.url === `file://${process.argv[1]}`) {
  // Жишээ 1: Хүснэгт үүсгэх
  const createTableExample = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name_en VARCHAR(100) NOT NULL,
      name_mn VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description_en TEXT,
      description_mn TEXT,
      parent_id INT NULL,
      sort_order INT DEFAULT 0,
      status ENUM('active', 'inactive') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      
      FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
      INDEX idx_slug (slug),
      INDEX idx_status (status),
      INDEX idx_parent (parent_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  // Жишээ 2: Хүснэгтүүдийн жагсаалт харах
  const showTablesQuery = "SHOW TABLES";

  // Жишээ 3: Хүснэгтийн бүтцийг харах
  const describeTableQuery = "DESCRIBE news";

  // Ажиллуулах:
  (async () => {
    try {
      // await runQuery(createTableExample, 'Categories хүснэгт үүсгэх');
      await runQuery(showTablesQuery, "Хүснэгтүүдийн жагсаалт");
      // await runQuery(describeTableQuery, 'News хүснэгтийн бүтэц');
    } catch (error) {
      process.exit(1);
    }
  })();
}
