/**
 * Users таблицид 'superAdmin' role нэмэх
 */

import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

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
    console.warn("⚠️  .env.local ачаалахад алдаа");
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

async function addSuperAdminRole() {
  let connection;

  try {
    console.log("\n🔧 Users таблицид 'superAdmin' role нэмэх\n");

    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database холбогдлоо\n");

    // ENUM-ийг өөрчлөх
    console.log("🔄 Role ENUM-ийг өөрчлөж байна...");
    await connection.execute(
      `ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'editor', 'user', 'superAdmin') DEFAULT 'user'`,
    );

    console.log("✅ ENUM амжилттай өөрчлөгдлөө\n");

    // Баталгаажуулах
    console.log("✔️  Role column-ийг баталгаажуулж байна...");
    const [structure] = await connection.execute(
      "SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='users' AND COLUMN_NAME='role' AND TABLE_SCHEMA=?",
      [process.env.DATABASE_NAME],
    );

    if (structure.length > 0) {
      console.log(`✅ Шинэ role Type: ${structure[0].COLUMN_TYPE}\n`);
    }
  } catch (error) {
    console.error("❌ Алдаа:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Database холболт хаагдлаа");
    }
  }
}

addSuperAdminRole();
