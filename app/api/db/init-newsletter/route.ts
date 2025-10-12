import { NextResponse } from "next/server";
import pool from "@/lib/database";

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();

    // Create newsletter_subscribers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_subscribed_at (subscribed_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    return NextResponse.json({
      success: true,
      message: "✅ newsletter_subscribers table амжилттай үүсгэгдлээ!",
    });
  } catch (error: any) {
    console.error("Database init error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Алдаа гарлаа",
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
