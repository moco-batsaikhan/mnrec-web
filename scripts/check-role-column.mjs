/**
 * Users таблицийн структур шалгах
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

async function checkUsersTable() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database холбогдлоо\n");

    // Таблицийн структур авах
    const [structure] = await connection.execute("DESCRIBE users");

    console.log("📋 Users таблицийн статус:\n");

    structure.forEach((col) => {
      if (col.Field === "role") {
        console.log(`🔍 Role column-ийн дэлгэрэнгүй:`);
        console.log(`   Field: ${col.Field}`);
        console.log(`   Type: ${col.Type}`);
        console.log(`   Null: ${col.Null}`);
        console.log(`   Key: ${col.Key || "None"}`);
        console.log(`   Default: ${col.Default || "None"}`);
        console.log(`   Extra: ${col.Extra || "None"}`);
        console.log("");
      }
    });

    // Одоо байгаа role утгуудыг шалгах
    const [rolesCount] = await connection.execute(
      "SELECT DISTINCT role, COUNT(*) as count FROM users GROUP BY role",
    );

    console.log("📊 Одоо байгаа role утгууд:");
    rolesCount.forEach((row) => {
      console.log(`   ${row.role}: ${row.count} хэрэглэгч`);
    });
  } catch (error) {
    console.error("❌ Алдаа:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUsersTable();
