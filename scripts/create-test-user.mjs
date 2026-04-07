import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Load .env.local
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

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-prod";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function createTestUser() {
  let connection;

  try {
    console.log("\n🔍 Шинэ хэрэглэгч үүсгэх тест\n");

    // 1. Database-тай холбогдох
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database амжилттай холбогдлоо");

    // 2. SuperAdmin хэрэглэгч байгаа эсэхийг шалгах
    const [adminUsers] = await connection.execute(
      "SELECT id, email, name, role FROM users WHERE role = 'superAdmin' LIMIT 1",
    );

    let adminUser;

    if (adminUsers.length > 0) {
      adminUser = adminUsers[0];
      console.log(`✅ SuperAdmin олдлоо: ${adminUser.email}`);
    } else {
      // 3. SuperAdmin байхгүй бол үүсгэх
      console.log("⚠️  SuperAdmin олдсонгүй, үүсгэж байна...");

      await connection.execute(
        `INSERT INTO users (email, name, password, role, status, created_at, updated_at) 
         VALUES (?, ?, ?, 'superAdmin', 'active', NOW(), NOW())`,
        ["admin@example.com", "System Admin", hashedPassword],
      );

      adminUser = {
        id: 1,
        email: "admin@example.com",
        name: "System Admin",
        role: "superAdmin",
      };
    }

    // 4. JWT Token үүсгэх
    const accessToken = jwt.sign({ userId: adminUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`\n🔑 Access Token үүсгэгдлээ`);

    // 5. Шинэ хэрэглэгчийн өгөгдөл
    // const newUser = {
    //   name: "Тест Хэрэглэгч",
    //   email: `test-${Date.now()}@example.com`,
    //   password: "TestPass123",
    //   role: "editor",
    // };

    console.log(`\n👤 Шинэ хэрэглэгчийн мэдээлэл:`);
    console.log(`   Нэр: ${newUser.name}`);
    console.log(`   И-мэйл: ${newUser.email}`);
    console.log(`   Нууц үг: ${newUser.password}`);
    console.log(`   Эрх: ${newUser.role}`);

    // 6. API дуудах
    console.log(`\n📤 API руу POST хүсэлт явуулж байна...`);

    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(newUser),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`\n✅ Хэрэглэгч амжилттай үүсгэгдлээ!`);
      console.log(`\n📝 Хэрэглэгчийн дэлгэрэнгүй:`);
      console.log(`   ID: ${result.data.id}`);
      console.log(`   Нэр: ${result.data.name}`);
      console.log(`   И-мэйл: ${result.data.email}`);
      console.log(`   Эрх: ${result.data.role}`);
      console.log(`   Статус: ${result.data.status}`);
      console.log(`   Үүсгэсэн: ${result.data.created_at}`);
    } else {
      console.error(`\n❌ API алдаа: ${response.status}`);
      console.error(`📋 Хариу: ${JSON.stringify(result, null, 2)}`);
    }
  } catch (error) {
    console.error("❌ Алдаа:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.error("💡 Зөвлөгөө: Database server-тэй холбогдох боломжгүй");
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log("\n🔌 Database холболт хаагдлаа");
    }
  }
}

createTestUser();
