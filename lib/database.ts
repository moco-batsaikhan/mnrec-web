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
      "SELECT COUNT(*) as count FROM news",
    );

    if ((existingNews as any)[0].count === 0) {
      // Attempt to find admin/editor users to attach as authors for sample news
      const [adminRows] = await connection.execute(
        "SELECT id FROM users WHERE email = 'admin@mnrec.mn' LIMIT 1",
      );
      const adminId = (adminRows as any)[0]?.id ?? null;

      const [editorRows] = await connection.execute(
        "SELECT id FROM users WHERE email = 'editor@mnrec.mn' LIMIT 1",
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
          "ℹ️ Skipping sample news insertion — no admin/editor users found to assign as authors",
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

/**
 * Auto-migration: ensures all expected columns/tables exist without re-creating tables.
 * Safe to run on every startup.
 */
export async function autoMigrate() {
  const conn = await pool.getConnection();
  try {
    // ── news table columns ────────────────────────────────────────────────
    const [newsCols]: any = await conn.execute("SHOW COLUMNS FROM news");
    const newsColNames: string[] = newsCols.map((c: any) => c.Field);

    const newsColsToAdd: { name: string; def: string }[] = [
      { name: "en_title", def: "VARCHAR(500) NULL AFTER title" },
      { name: "en_content", def: "LONGTEXT NULL AFTER content" },
      { name: "en_summary", def: "TEXT NULL AFTER summary" },
      { name: "category", def: "VARCHAR(100) NULL DEFAULT 'news'" },
      { name: "featured_image", def: "VARCHAR(500) NULL" },
      { name: "tags", def: "JSON NULL" },
    ];
    for (const col of newsColsToAdd) {
      if (!newsColNames.includes(col.name)) {
        await conn.execute(
          `ALTER TABLE news ADD COLUMN \`${col.name}\` ${col.def}`,
        );
        console.log(`✅ migration: added news.${col.name}`);
      }
    }

    // Rebuild FULLTEXT index when en_* columns were just added
    const hadAllEn =
      newsColNames.includes("en_title") &&
      newsColNames.includes("en_content") &&
      newsColNames.includes("en_summary");
    if (!hadAllEn) {
      try {
        await conn.execute("DROP INDEX idx_search ON news");
      } catch {
        /* ok */
      }
      try {
        await conn.execute(
          "CREATE FULLTEXT INDEX idx_search ON news (title, content, summary, en_title, en_content, en_summary)",
        );
        console.log("✅ migration: rebuilt news FULLTEXT index");
      } catch (err: any) {
        if (err.code !== "ER_DUP_KEYNAME") throw err;
      }
    }

    // ── users table: role & status enum values ────────────────────────────
    const [roleCol]: any = await conn.execute(
      "SHOW COLUMNS FROM users WHERE Field = 'role'",
    );
    if (!((roleCol[0]?.Type as string) || "").includes("superAdmin")) {
      await conn.execute(
        `ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'editor', 'superAdmin') NOT NULL DEFAULT 'editor'`,
      );
      console.log("✅ migration: updated users.role enum");
    }
    const [statusCol]: any = await conn.execute(
      "SHOW COLUMNS FROM users WHERE Field = 'status'",
    );
    if (!((statusCol[0]?.Type as string) || "").includes("suspended")) {
      await conn.execute(
        `ALTER TABLE users MODIFY COLUMN status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active'`,
      );
      console.log("✅ migration: updated users.status enum");
    }

    // ── media table: API uses mn_title, en_title, url, type ──────────────
    const [mediaCols]: any = await conn.execute("SHOW COLUMNS FROM media");
    const mediaColNames: string[] = mediaCols.map((c: any) => c.Field);
    const mediaColsToAdd: { name: string; def: string }[] = [
      { name: "mn_title", def: "VARCHAR(255) NULL" },
      { name: "en_title", def: "VARCHAR(255) NULL" },
      { name: "url", def: "VARCHAR(500) NULL" },
      { name: "type", def: "VARCHAR(100) NULL" },
      { name: "status", def: "ENUM('active','inactive') DEFAULT 'active'" },
      {
        name: "updated_at",
        def: "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
      },
    ];
    for (const col of mediaColsToAdd) {
      if (!mediaColNames.includes(col.name)) {
        await conn.execute(
          `ALTER TABLE media ADD COLUMN \`${col.name}\` ${col.def}`,
        );
        console.log(`✅ migration: added media.${col.name}`);
      }
    }

    // ── homeText table ────────────────────────────────────────────────────
    await ensureHomeTextTable(conn);

    // ── newsletter_subscribers table ──────────────────────────────────────
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_subscribed_at (subscribed_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ migration: newsletter_subscribers table ensured");

    console.log("✅ autoMigrate complete");
  } catch (err) {
    console.error("❌ autoMigrate failed:", err);
  } finally {
    conn.release();
  }
}

/**
 * Ensure homeText table exists and has the required columns.
 * Called from autoMigrate.
 */
async function ensureHomeTextTable(conn: mysql.PoolConnection) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS homeText (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mn_keyWord VARCHAR(255) NOT NULL DEFAULT '',
      en_keyWord VARCHAR(255) NOT NULL DEFAULT '',
      mn_keyNote TEXT NULL,
      en_keyNote TEXT NULL,
      mn_slogan_text TEXT NULL,
      en_slogan_text TEXT NULL,
      status ENUM('active','inactive') DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Table may already exist with different columns — ensure each column is present
  const [cols]: any = await conn.execute("SHOW COLUMNS FROM homeText");
  const colNames: string[] = cols.map((c: any) => c.Field);

  const colsToAdd: { name: string; def: string }[] = [
    { name: "mn_keyWord", def: "VARCHAR(255) NOT NULL DEFAULT ''" },
    { name: "en_keyWord", def: "VARCHAR(255) NOT NULL DEFAULT ''" },
    { name: "mn_keyNote", def: "TEXT NULL" },
    { name: "en_keyNote", def: "TEXT NULL" },
    { name: "mn_slogan_text", def: "TEXT NULL" },
    { name: "en_slogan_text", def: "TEXT NULL" },
  ];

  for (const col of colsToAdd) {
    if (!colNames.includes(col.name)) {
      await conn.execute(
        `ALTER TABLE homeText ADD COLUMN \`${col.name}\` ${col.def}`,
      );
      console.log(`✅ migration: added homeText.${col.name}`);
    }
  }

  console.log("✅ migration: homeText table ensured");
}
