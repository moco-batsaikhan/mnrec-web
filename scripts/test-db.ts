const { testConnection, initDatabase } = require("../lib/database");

async function main() {
  try {
    // Test database connection
    console.log("Testing database connection...");
    const isConnected = await testConnection();

    if (!isConnected) {
      console.error("❌ Database connection failed");
      process.exit(1);
    }

    // Initialize database tables
    console.log("\nInitializing database tables...");
    await initDatabase();

    console.log("✅ Database setup completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
