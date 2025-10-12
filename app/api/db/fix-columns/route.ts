import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";

/**
 * Database migration endpoint to fix role and status columns
 * Access: GET http://localhost:3000/api/db/fix-columns
 */
export async function GET(request: NextRequest) {
  const connection = await pool.getConnection();
  
  const results: {
    steps: any[];
    success: boolean;
  } = {
    steps: [],
    success: false,
  };

  try {
    // Step 1: Check current role column
    results.steps.push({ step: "Checking current role column structure..." });
    const [roleColumns] = await connection.query(
      "SHOW COLUMNS FROM users WHERE Field = 'role'"
    );
    results.steps.push({ 
      step: "Current role column", 
      data: roleColumns 
    });

    // Step 2: Fix role column
    results.steps.push({ step: "Updating role column to ENUM('admin', 'editor', 'superAdmin')..." });
    await connection.query(`
      ALTER TABLE users 
      MODIFY COLUMN role ENUM('admin', 'editor', 'superAdmin') NOT NULL DEFAULT 'editor'
    `);
    results.steps.push({ step: "✅ Role column updated successfully!" });

    // Step 3: Check current status column
    results.steps.push({ step: "Checking current status column structure..." });
    const [statusColumns] = await connection.query(
      "SHOW COLUMNS FROM users WHERE Field = 'status'"
    );
    results.steps.push({ 
      step: "Current status column", 
      data: statusColumns 
    });

    // Step 4: Fix status column
    results.steps.push({ step: "Updating status column to ENUM('active', 'inactive', 'suspended')..." });
    await connection.query(`
      ALTER TABLE users 
      MODIFY COLUMN status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active'
    `);
    results.steps.push({ step: "✅ Status column updated successfully!" });

    // Step 5: Add indexes
    results.steps.push({ step: "Adding indexes for better performance..." });
    
    try {
      await connection.query('CREATE INDEX idx_users_role ON users(role)');
      results.steps.push({ step: "✅ Added index on role column" });
    } catch (err: any) {
      if (err.code === 'ER_DUP_KEYNAME') {
        results.steps.push({ step: "ℹ️ Index on role column already exists" });
      } else {
        throw err;
      }
    }

    try {
      await connection.query('CREATE INDEX idx_users_status ON users(status)');
      results.steps.push({ step: "✅ Added index on status column" });
    } catch (err: any) {
      if (err.code === 'ER_DUP_KEYNAME') {
        results.steps.push({ step: "ℹ️ Index on status column already exists" });
      } else {
        throw err;
      }
    }

    try {
      await connection.query('CREATE INDEX idx_users_email ON users(email)');
      results.steps.push({ step: "✅ Added index on email column" });
    } catch (err: any) {
      if (err.code === 'ER_DUP_KEYNAME') {
        results.steps.push({ step: "ℹ️ Index on email column already exists" });
      } else {
        throw err;
      }
    }

    // Step 6: Verify changes
    results.steps.push({ step: "Verifying changes..." });
    const [verifyRole] = await connection.query(
      "SHOW COLUMNS FROM users WHERE Field = 'role'"
    );
    const [verifyStatus] = await connection.query(
      "SHOW COLUMNS FROM users WHERE Field = 'status'"
    );
    
    results.steps.push({
      step: "Final verification",
      roleColumn: (verifyRole as any)[0],
      statusColumn: (verifyStatus as any)[0],
    });

    results.success = true;
    results.steps.push({ 
      step: "🎉 Database migration completed successfully!",
      message: "You can now use role values: admin, editor, superAdmin",
      message2: "You can now use status values: active, inactive, suspended"
    });

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error("Database migration error:", error);
    results.steps.push({
      step: "❌ Error occurred",
      error: error.message,
      sqlMessage: error.sqlMessage,
    });
    return NextResponse.json(results, { status: 500 });
  } finally {
    connection.release();
  }
}
