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

async function executeSQLFile(sqlFileName) {
  try {
    // SQL файл уншиж авах
    const sqlFilePath = path.resolve(process.cwd(), "scripts", sqlFileName);

    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`SQL файл олдсонгүй: ${sqlFilePath}`);
    }

    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

    // Database-тай холбогдох
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database холбогдлоо");

    // SQL команд ажиллуулах
    const statements = sqlContent
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
        console.log("✅ SQL команд амжилттай ажиллаа");
      }
    }

    await connection.end();
    console.log(`✅ ${sqlFileName} файл амжилттай ажиллаа!`);
  } catch (error) {
    console.error("❌ Алдаа гарлаа:", error.message);
    process.exit(1);
  }
}

// Command line-аас файл нэр авах
const sqlFileName = process.argv[2];

if (!sqlFileName) {
  console.log("Хэрэглээ: node execute-sql.mjs <filename.sql>");
  console.log("Жишээ: node execute-sql.mjs create-example-table.sql");
  process.exit(1);
}

executeSQLFile(sqlFileName);
