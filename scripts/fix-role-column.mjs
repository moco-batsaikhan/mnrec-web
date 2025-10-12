/**
 * Fix role and status columns in users table
 * This script uses the same database connection as the app
 * Run: npm run fix-db или node --loader ts-node/esm scripts/fix-role-column.mjs
 */

import pool from "../lib/database.js";

async function fixRoleColumn() {
  console.log("🔧 Starting database column fix...\n");

  const connection = await pool.getConnection();

  try {
    console.log("✅ Connected to database\n");

    // Check current role column
    console.log("📋 Current role column structure:");
    const [roleColumns] = await connection.query(
      "SHOW COLUMNS FROM users WHERE Field = 'role'"
    );
    console.log(roleColumns);
    console.log("");

    // Fix role column
    console.log(
      "🔄 Updating role column to support admin, editor, superAdmin..."
    );
    await connection.query(`
      ALTER TABLE users 
      MODIFY COLUMN role ENUM('admin', 'editor', 'superAdmin') NOT NULL DEFAULT 'editor'
    `);
    console.log("✅ Role column updated successfully!\n");

    // Check current status column
    console.log("📋 Current status column structure:");
    const [statusColumns] = await connection.query(
      "SHOW COLUMNS FROM users WHERE Field = 'status'"
    );
    console.log(statusColumns);
    console.log("");

    // Fix status column
    console.log(
      "🔄 Updating status column to support active, inactive, suspended..."
    );
    await connection.query(`
      ALTER TABLE users 
      MODIFY COLUMN status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active'
    `);
    console.log("✅ Status column updated successfully!\n");

    // Add indexes if they don't exist
    console.log("🔄 Adding indexes for better performance...");
    try {
      await connection.query("CREATE INDEX idx_users_role ON users(role)");
      console.log("✅ Added index on role column");
    } catch (err) {
      if (err.code === "ER_DUP_KEYNAME") {
        console.log("ℹ️  Index on role column already exists");
      } else {
        throw err;
      }
    }

    try {
      await connection.query("CREATE INDEX idx_users_status ON users(status)");
      console.log("✅ Added index on status column");
    } catch (err) {
      if (err.code === "ER_DUP_KEYNAME") {
        console.log("ℹ️  Index on status column already exists");
      } else {
        throw err;
      }
    }

    try {
      await connection.query("CREATE INDEX idx_users_email ON users(email)");
      console.log("✅ Added index on email column");
    } catch (err) {
      if (err.code === "ER_DUP_KEYNAME") {
        console.log("ℹ️  Index on email column already exists");
      } else {
        throw err;
      }
    }
    console.log("");

    // Verify the changes
    console.log("✅ Verifying changes...");
    const [verifyRole] = await connection.query(
      "SHOW COLUMNS FROM users WHERE Field = 'role'"
    );
    const [verifyStatus] = await connection.query(
      "SHOW COLUMNS FROM users WHERE Field = 'status'"
    );

    console.log("\n📊 Final column structures:");
    console.log("Role column:", verifyRole[0]);
    console.log("Status column:", verifyStatus[0]);

    console.log("\n🎉 Database columns fixed successfully!");
    console.log("You can now use role values: admin, editor, superAdmin");
    console.log("You can now use status values: active, inactive, suspended");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.sqlMessage) {
      console.error("SQL Error:", error.sqlMessage);
    }
    process.exit(1);
  } finally {
    connection.release();
    await pool.end();
    console.log("\n✅ Database connection closed");
  }
}

fixRoleColumn();
