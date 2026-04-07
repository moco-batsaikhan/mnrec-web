/**
 * Admin хэрэглэгч үүсгэх/шинэчлэх скрипт
 *
 * Ашиглалт: node scripts/create-admin.mjs
 */

import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (!fs.existsSync(envPath)) {
      console.warn("⚠️  .env.local файл олдсонгүй");
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
    console.warn("⚠️  .env.local ачаалахад алдаа:", err.message);
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

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_NAME = "System Administrator";

async function createAdmin() {
  let connection;

  try {
    console.log("\n🔧 Admin хэрэглэгч үүсгэх/шинэчлэх\n");

    // Database-тай холбогдох
    console.log("🔗 Database-тай холбогдож байна...");
    connection = await mysql.createConnection(dbConfig);
    console.log(`✅ ${dbConfig.database} database-тай холбогдлоо\n`);

    // 1. Одоогийн admin олох
    console.log(`🔍 1. Admin хэрэглэгчийг хайж байна (${ADMIN_EMAIL})...`);
    const [existingAdmins] = await connection.execute(
      "SELECT id, email, name FROM users WHERE email = ? LIMIT 1",
      [ADMIN_EMAIL],
    );

    // 2. Нууц үгийг hash хийх
    console.log(`🔐 2. Нууц үгийг hash хийж байна...`);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    console.log(`✅ Нууц үг hash болсон (salt rounds: 10)\n`);

    // 3. Admin үүсгэх эсвэл шинэчлэх
    if (existingAdmins.length > 0) {
      // Одоосом байгаа admin-ийн нууц үгийг шинэчлэх
      const existingAdmin = existingAdmins[0];
      console.log(
        `✏️  3. Одоогийн admin-ийг шинэчлэж байна (ID: ${existingAdmin.id})...`,
      );

      await connection.execute(
        "UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?",
        [hashedPassword, existingAdmin.id],
      );

      console.log(`✅ Admin-ийн нууц үг шинэчлэгдлээ\n`);
    } else {
      // Шинэ admin үүсгэх
      console.log(`➕ 3. Шинэ admin хэрэглэгч үүсгэж байна...`);

      const [result] = await connection.execute(
        `INSERT INTO users (email, name, password, role, status, created_at, updated_at) 
         VALUES (?, ?, ?, 'superAdmin', 'active', NOW(), NOW())`,
        [ADMIN_EMAIL, ADMIN_NAME, hashedPassword],
      );

      const insertId = result.insertId;
      console.log(`✅ Admin хэрэглэгч үүсгэгдлээ (ID: ${insertId})\n`);
    }

    // 4. Баталгаажуулах
    console.log(`✔️  4. Admin-ийг баталгаажуулж байна...`);
    const [verifyUsers] = await connection.execute(
      "SELECT id, email, name, role, status FROM users WHERE email = ?",
      [ADMIN_EMAIL],
    );

    if (verifyUsers.length > 0) {
      const admin = verifyUsers[0];
      console.log(`\n✅ Admin амжилттай үүсгэгдлээ!\n`);
      console.log(`📝 Admin мэдээлэл:`);
      console.log(`   ID: ${admin.id}`);
      console.log(`   И-мэйл: ${admin.email}`);
      console.log(`   Нэр: ${admin.name}`);
      console.log(`   Эрх: ${admin.role}`);
      console.log(`   Статус: ${admin.status}`);
      console.log(`\n🔐 Нэвтрэх мэдээлэл:`);
      console.log(`   И-мэйл: ${ADMIN_EMAIL}`);
      console.log(`   Нууц үг: ${ADMIN_PASSWORD}`);
    } else {
      console.log(`\n❌ Admin баталгаажуулах алдаа`);
    }
  } catch (error) {
    console.error("\n❌ Алдаа:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.error("💡 Зөвлөгөө: Database server-тэй холбогдох боломжгүй");
      console.error("   DigitalOcean console дээр IP whitelist нэмсэн үү?");
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

createAdmin();
