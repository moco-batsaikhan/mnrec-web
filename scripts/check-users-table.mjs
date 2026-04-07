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

async function checkUsersTable() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database холбогдлоо\n");

    // Check table structure
    const [structure] = await connection.execute("DESCRIBE users");

    console.log("📋 Users таблицийн бүтэц:\n");
    console.log("Field | Type | Null | Key | Extra");
    console.log("-".repeat(80));

    structure.forEach((col) => {
      const field = col.Field.padEnd(20);
      const type = col.Type.padEnd(30);
      const nullable = col.Null.padEnd(5);
      const key = (col.Key || "-").padEnd(5);
      console.log(`${field} ${type} ${nullable} ${key} ${col.Extra || ""}`);
    });

    // Check role column specifically
    const roleCol = structure.find((col) => col.Field === "role");
    if (roleCol) {
      console.log(`\n🔍 Role column:\n`);
      console.log(`   Type: ${roleCol.Type}`);
      console.log(`   Null: ${roleCol.Null}`);
      console.log(`   Default: ${roleCol.Default || "No default"}`);
    }
  } catch (error) {
    console.error("❌ Алдаа:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUsersTable();
