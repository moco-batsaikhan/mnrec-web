import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// If environment variables aren't set (e.g. when running scripts with ts-node),
// try loading them from a .env.local file in the project root.
function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (!fs.existsSync(envPath)) {
      // nothing to load
      return;
    }

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

    console.log(`📥 Loaded environment from ${envPath}`);
  } catch (err) {
    console.warn("Could not load .env.local:", err);
  }
}

loadEnvLocal();

// Database connection configuration
const dbConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "25060"),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionLimit: 5,
};

console.log("📦 Loaded database config:");
console.log({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD ? "********" : "(empty)",
  database: process.env.DATABASE_NAME,
});

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection function
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

// Initialize database tables
export async function initDatabase() {
  try {
    const connection = await pool.getConnection();

    // Create users table
    await connection.execute(`
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
      )
    `);

    // Create news table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        content LONGTEXT NOT NULL,
        summary TEXT NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        featured_image VARCHAR(500) NULL,
        tags JSON NULL,
        author_id INT NOT NULL,
        published_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_status (status),
        INDEX idx_author (author_id),
        INDEX idx_created (created_at),
        INDEX idx_published (published_at),
        FULLTEXT idx_search (title, content, summary)
      )
    `);

    // Create refresh_tokens table for refresh token rotation / revocation
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS refresh_tokens (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          token VARCHAR(1024) NOT NULL,
          revoked TINYINT(1) DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          expires_at TIMESTAMP NULL,
          INDEX idx_user (user_id),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

    // NOTE: default user creation removed.
    // Users are expected to be managed by application logic or migration scripts.

    // Insert sample news if not exists
    const [existingNews] = await connection.execute(
      "SELECT COUNT(*) as count FROM news"
    );

    if ((existingNews as any)[0].count === 0) {
      // Attempt to find admin/editor users to attach as authors for sample news
      const [adminRows] = await connection.execute(
        "SELECT id FROM users WHERE email = 'admin@mnrec.mn' LIMIT 1"
      );
      const adminId = (adminRows as any)[0]?.id ?? null;

      const [editorRows] = await connection.execute(
        "SELECT id FROM users WHERE email = 'editor@mnrec.mn' LIMIT 1"
      );
      const editorId = (editorRows as any)[0]?.id ?? null;

      // Only insert sample news if we have at least one valid author id
      if (adminId || editorId) {
        const aid = adminId ?? editorId;
        const eid = editorId ?? adminId;

        await connection.execute(`
          INSERT INTO news (title, content, summary, slug, status, featured_image, tags, author_id, published_at) VALUES 
          (
            'IMARC хурлын тайлан',
            'IMARC (International Mining and Resources Conference) хурлын дэлгэрэнгүй тайлан. Энэ хурал дээр дэлхийн уул уурхайн салбарын хамгийн сүүлийн үеийн технологи, инноваци, хөрөнгө оруулалтын чиглэлүүдийг хэлэлцсэн.',
            'IMARC хурлын гол агуулгыг товч тайлбарласан тайлан',
            'imarc-conference-report-2024',
            'published',
            '/assets/images/news/imarc-conference.jpg',
            '["IMARC", "хурал", "уул уурхай", "технологи"]',
            ${aid},
            '2024-10-05 10:00:00'
          ),
          (
            'Халзан Бүрэгтэй төслийн шинэчлэл',
            'Халзан Бүрэгтэй төслийн хүрээнд хийгдсэн геологийн судалгааны үр дүн, ашигт малтмалын нөөцийн үнэлгээ, боловсруулах технологийн судалгааны талаархи дэлгэрэнгүй мэдээлэл.',
            'Халзан Бүрэгтэй төслийн сүүлийн үеийн ахиц дэвшлийн тухай',
            'khalzan-buregtei-project-update',
            'published',
            '/assets/images/news/khalzan-buregtei.jpg',
            '["Халзан Бүрэгтэй", "төсөл", "геологи", "нөөц"]',
            ${eid},
            '2024-10-03 14:20:00'
          )
        `);
        console.log("✅ Sample news created");
      } else {
        console.log(
          "ℹ️ Skipping sample news insertion — no admin/editor users found to assign as authors"
        );
      }
    }

    connection.release();
    console.log("✅ Database initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
}

// Export database pool for use in API routes
export default pool;
