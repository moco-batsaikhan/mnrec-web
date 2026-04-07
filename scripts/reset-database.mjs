import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// Environment variables-ийг ачаалах (recreate-all-tables.mjs-тай адилхан)
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

async function resetDatabase() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database холбогдлоо!\n");

    // Одоо байгаа хүснэгтүүдийн жагсаалтыг авах
    console.log("📋 Одоо байгаа хүснэгтүүд:");
    const [existingTables] = await connection.execute("SHOW TABLES");

    if (existingTables.length === 0) {
      console.log("   Хүснэгт олдсонгүй.\n");
    } else {
      existingTables.forEach((table, index) => {
        console.log(`   ${index + 1}. ${Object.values(table)[0]}`);
      });
    }

    // Foreign key constraints-г түр идэвхгүй болгох
    console.log("\n🔧 Foreign key шалгалтыг түр хаах...");
    await connection.execute("SET FOREIGN_KEY_CHECKS = 0");

    // Хүснэгтүүдийг устгах дараалал (dependencies-ийн дагуу хойшлуулж)
    const tablesToDrop = [
      "news", // news has FK to users
      "media", // media has FK to users
      "homeText",
      "newsletter",
      "team",
      "contact_messages",
      "users", // users should be dropped last
    ];

    console.log("🗑️  Хуучин хүснэгтүүдийг устгаж байна...");
    for (const tableName of tablesToDrop) {
      try {
        await connection.execute(`DROP TABLE IF EXISTS ${tableName}`);
        console.log(`   ✅ ${tableName} хүснэгт устгагдлаа`);
      } catch (error) {
        console.log(
          `   ⚠️  ${tableName} хүснэгт устгахад алдаа: ${error.message}`,
        );
      }
    }

    // Foreign key шалгалтыг дахин идэвхжүүлэх
    await connection.execute("SET FOREIGN_KEY_CHECKS = 1");
    console.log("✅ Foreign key шалгалт дахин идэвхжлээ\n");

    // Шинэ хүснэгтүүдийг үүсгэх
    console.log("🔄 Шинэ хүснэгтүүдийг үүсгэж байна...\n");
    await connection.end(); // Close current connection

    // Import and run the recreate script
    const { default: recreateScript } =
      await import("./recreate-all-tables.mjs");
  } catch (error) {
    console.error("❌ Database reset алдаа:", error.message);
    process.exit(1);
  }
}

// Аюулгүй байдлын асуулга
async function confirmReset() {
  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.log(
      "⚠️  АНХААРУУЛГА: Энэ нь танай бүх хүснэгт болон өгөгдлийг устгана!",
    );
    console.log("🗃️  Database: " + dbConfig.database);
    console.log("🖥️  Host: " + dbConfig.host);

    rl.question(
      "\n❓ Та үнэхээр бүх хүснэгтийг устгаж шинээр үүсгэхийг хүсэж байна уу? (yes/no): ",
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === "yes" || answer.toLowerCase() === "y");
      },
    );
  });
}

// Main function
async function main() {
  console.log("🔥 Database-ийг бүрэн reset хийх script\n");

  const confirmed = await confirmReset();

  if (!confirmed) {
    console.log("❌ Үйл ажиллагаа цуцлагдлаа");
    process.exit(0);
  }

  console.log("\n🚀 Database reset-г эхлүүлж байна...\n");
  await resetDatabase();
}

// Script ажиллуулах
main();
