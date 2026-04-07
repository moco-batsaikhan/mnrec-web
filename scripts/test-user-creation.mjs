/**
 * Шинэ хэрэглэгч үүсгэх тест скрипт
 *
 * Ашиглалт:
 * node scripts/test-user-creation.mjs
 */

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
    console.warn("⚠️  .env.local ачаалах боломжгүй:", err.message);
  }
}

loadEnvLocal();

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const ADMIN_EMAIL = "admin@example.com";

async function testUserCreation() {
  console.log("\n🔍 Шинэ хэрэглэгч үүсгэх API тест\n");
  console.log("📋 Тохиргоо:");
  console.log(`   API URL: ${API_URL}`);
  console.log(`   Admin Email: ${ADMIN_EMAIL}`);
  console.log("");

  try {
    // 1. Admin-ээр нэвтрэх
    console.log("🔐 1. Admin-ээр нэвтрэх...");
    const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      console.log("❌ Нэвтрэх алдаа:");
      console.log(JSON.stringify(loginData, null, 2));
      console.log("\n💡 Шалгах зүйл:");
      console.log(
        "   1. Next.js dev сервер ажиллаж байгаа эсэх? (npm run dev)",
      );
      console.log("   2. Database-тай холбогдож байгаа эсэх?");
      console.log("   3. Admin хэрэглэгч таблицт байгаа эсэх?");
      return;
    }

    const accessToken = loginData.data?.accessToken;
    if (!accessToken) {
      console.log("❌ Access token хүлээн авах боломжгүй");
      console.log("Response:", loginData);
      return;
    }

    console.log(`✅ Нэвтэрлээ (token: ${accessToken.substring(0, 20)}...)`);
    console.log("");

    // 2. Шинэ хэрэглэгч үүсгэх
    console.log("👤 2. Шинэ хэрэглэгч үүсгэж байна...");

    const newUser = {
      email: `test-${Date.now()}@example.com`,
      name: "Тест Хэрэглэгч",
      password: "TestPass123",
      role: "editor",
    };

    console.log(`   И-мэйл: ${newUser.email}`);
    console.log(`   Нэр: ${newUser.name}`);
    console.log(`   Эрх: ${newUser.role}`);

    const createResponse = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(newUser),
    });

    const createData = await createResponse.json();

    if (createResponse.ok) {
      console.log(`\n✅ Хэрэглэгч амжилттай үүсгэгдлээ!\n`);
      console.log(`📝 Үүсгэгдсэн хэрэглэгч:`);
      console.log(`   ID: ${createData.data.id}`);
      console.log(`   И-мэйл: ${createData.data.email}`);
      console.log(`   Нэр: ${createData.data.name}`);
      console.log(`   Эрх: ${createData.data.role}`);
      console.log(`   Статус: ${createData.data.status}`);
      console.log(`   Үүсгэсэн: ${createData.data.created_at}`);
      console.log("");
    } else {
      console.log("❌ Хэрэглэгч үүсгэх алдаа:");
      console.log(JSON.stringify(createData, null, 2));
    }
  } catch (error) {
    console.error("❌ Алдаа:", error.message);
    console.log("\n💡 Шалгах зүйл:");
    console.log("   1. Next.js dev сервер ажиллаж байгаа уу?");
    console.log("   2. Сервер localhost:3000 дээр ажиллаж байгаа уу?");
    console.log("   3. Database-тай холбогд байгаа уу?");
  }
}

testUserCreation();
