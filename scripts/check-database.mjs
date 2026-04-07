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

const dbConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "25060"),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: { rejectUnauthorized: false },
};

async function checkDatabaseStatus() {
  let connection;

  try {
    console.log("🔗 Database холболт:");
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Port: ${dbConfig.port}`);
    console.log(`   Database: ${dbConfig.database}`);
    console.log(`   User: ${dbConfig.user}\n`);

    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database амжилттай холбогдлоо!\n");

    // Database мэдээлэл авах
    const [dbInfo] = await connection.execute(
      "SELECT DATABASE() as current_db, NOW() as current_time",
    );
    console.log("📊 Database мэдээлэл:");
    console.log(`   Одоогийн database: ${dbInfo[0].current_db}`);
    console.log(`   Серверийн цаг: ${dbInfo[0].current_time}\n`);

    // Хүснэгтүүдийн жагсаалт
    const [tables] = await connection.execute("SHOW TABLES");

    if (tables.length === 0) {
      console.log("📋 Хүснэгт олдсонгүй");
      return;
    }

    console.log(`📋 Нийт ${tables.length} хүснэгт байна:\n`);

    // Хүснэгт бүрийн дэлгэрэнгүй мэдээлэл
    for (let i = 0; i < tables.length; i++) {
      const tableName = Object.values(tables[i])[0];
      console.log(`${i + 1}. 🗂️  ${tableName}`);

      try {
        // Хүснэгтийн бүтэц
        const [structure] = await connection.execute(`DESCRIBE ${tableName}`);
        structure.forEach((column) => {
          const key = column.Key ? ` [${column.Key}]` : "";
          const nullable = column.Null === "YES" ? " (nullable)" : "";
          const extra = column.Extra ? ` ${column.Extra}` : "";
          console.log(
            `      📝 ${column.Field}: ${column.Type}${key}${nullable}${extra}`,
          );
        });

        // Өгөгдлийн тоо
        const [count] = await connection.execute(
          `SELECT COUNT(*) as total FROM ${tableName}`,
        );
        console.log(`      📊 Нийт мөр: ${count[0].total}\n`);
      } catch (error) {
        console.log(`      ❌ Алдаа: ${error.message}\n`);
      }
    }

    // Database-ийн хэмжээ
    try {
      const [sizeInfo] = await connection.execute(
        `
        SELECT 
          table_schema AS 'Database',
          ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
        FROM information_schema.tables 
        WHERE table_schema = ?
        GROUP BY table_schema
      `,
        [dbConfig.database],
      );

      if (sizeInfo.length > 0) {
        console.log(`💾 Database хэмжээ: ${sizeInfo[0]["Size (MB)"]} MB`);
      }
    } catch (error) {
      console.log("💾 Database хэмжээ тооцоолох боломжгүй");
    }
  } catch (error) {
    console.error("❌ Database алдаа:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.error(
        "💡 Зөвлөгөө: Database server-тэй холбогдох боломжгүй байна",
      );
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("💡 Зөвлөгөө: Database credentials буруу байна");
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log("\n🔌 Database холболт хаагдлаа");
    }
  }
}

console.log("🔍 Database статусыг шалгаж байна...\n");
checkDatabaseStatus();
