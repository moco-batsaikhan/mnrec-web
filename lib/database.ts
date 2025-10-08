import mysql from "mysql2/promise";

// Database connection configuration
const dbConfig = {
  host: "db-mysql-sgp1-301-do-user-25594947-0.e.db.ondigitalocean.com",
  port: 25060,
  user: "doadmin",
  password: "AVNS_EtA-52-_c0dRK",
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: false,
  },
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
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
        category VARCHAR(100) NOT NULL,
        tags JSON NULL,
        author_id INT NOT NULL,
        published_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        view_count INT DEFAULT 0,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_status (status),
        INDEX idx_category (category),
        INDEX idx_author (author_id),
        INDEX idx_created (created_at),
        INDEX idx_published (published_at),
        FULLTEXT idx_search (title, content, summary)
      )
    `);

    // Insert default admin user if not exists
    const [existingUsers] = await connection.execute(
      'SELECT COUNT(*) as count FROM users WHERE role = "admin"',
    );

    if ((existingUsers as any)[0].count === 0) {
      await connection.execute(`
        INSERT INTO users (email, name, password, role, status, last_login) VALUES 
        ('admin@mnrec.mn', 'Админ', 'password123', 'admin', 'active', NOW()),
        ('editor@mnrec.mn', 'Редактор', 'editor123', 'editor', 'active', NOW()),
        ('user@example.com', 'Энгийн хэрэглэгч', 'user123', 'user', 'inactive', '2024-09-28 13:45:00')
      `);
      console.log("✅ Default users created");
    }

    // Insert sample news if not exists
    const [existingNews] = await connection.execute("SELECT COUNT(*) as count FROM news");

    if ((existingNews as any)[0].count === 0) {
      const [adminUser] = await connection.execute(
        'SELECT id FROM users WHERE email = "admin@mnrec.mn"',
      );
      const adminId = (adminUser as any)[0].id;

      const [editorUser] = await connection.execute(
        'SELECT id FROM users WHERE email = "editor@mnrec.mn"',
      );
      const editorId = (editorUser as any)[0].id;

      await connection.execute(`
        INSERT INTO news (title, content, summary, slug, status, featured_image, category, tags, author_id, published_at, view_count) VALUES 
        (
          'IMARC хурлын тайлан',
          'IMARC (International Mining and Resources Conference) хурлын дэлгэрэнгүй тайлан. Энэ хурал дээр дэлхийн уул уурхайн салбарын хамгийн сүүлийн үеийн технологи, инноваци, хөрөнгө оруулалтын чиглэлүүдийг хэлэлцсэн.',
          'IMARC хурлын гол агуулгыг товч тайлбарласан тайлан',
          'imarc-conference-report-2024',
          'published',
          '/assets/images/news/imarc-conference.jpg',
          'Хурал',
          '["IMARC", "хурал", "уул уурхай", "технологи"]',
          ${adminId},
          '2024-10-05 10:00:00',
          1250
        ),
        (
          'Халзан Бүрэгтэй төслийн шинэчлэл',
          'Халзан Бүрэгтэй төслийн хүрээнд хийгдсэн геологийн судалгааны үр дүн, ашигт малтмалын нөөцийн үнэлгээ, боловсруулах технологийн судалгааны талаархи дэлгэрэнгүй мэдээлэл.',
          'Халзан Бүрэгтэй төслийн сүүлийн үеийн ахиц дэвшлийн тухай',
          'khalzan-buregtei-project-update',
          'published',
          '/assets/images/news/khalzan-buregtei.jpg',
          'Төсөл',
          '["Халзан Бүрэгтэй", "төсөл", "геологи", "нөөц"]',
          ${editorId},
          '2024-10-03 14:20:00',
          890
        ),
        (
          'Газрын ховор элементийн зах зээлийн судалгаа',
          '2024 оны газрын ховор элементийн дэлхийн зах зээлийн нөхцөл байдал, үнийн хөдөлгөөн, эрэлт нийлүүлэлтийн тэнцвэрт байдлын талаархи судалгааны тайлан.',
          'ГХЭ-ийн зах зээлийн өнөөгийн байдал болон ирээдүйн чиг хандлага',
          'rare-earth-market-analysis-2024',
          'draft',
          NULL,
          'Судалгаа',
          '["ГХЭ", "зах зээл", "судалгаа", "үнэ"]',
          ${editorId},
          NULL,
          0
        ),
        (
          'Байгаль орчны хамгаалалын арга хэмжээ',
          'MNREC-ийн байгаль орчныг хамгаалах талаар хэрэгжүүлж буй арга хэмжээний тайлан. Усны эх үүсвэрийг хамгаалах, хог хаягдлыг боловсруулах, нөхөн сэргээх ажлын талаар.',
          'Байгаль орчны хамгаалалын хүрээнд хийгдсэн ажлуудын тайлан',
          'environmental-protection-measures',
          'published',
          '/assets/images/news/environment.jpg',
          'Байгаль орчин',
          '["байгаль орчин", "хамгаалал", "нөхөн сэргээлт"]',
          ${adminId},
          '2024-09-28 13:45:00',
          675
        )
      `);
      console.log("✅ Sample news created");
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
