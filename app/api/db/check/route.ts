import { NextResponse } from "next/server";
import pool from "@/lib/database";

/**
 * Database connection check endpoint
 * GET /api/db/check
 */
export async function GET() {
  try {
    const connection = await pool.getConnection();

    try {
      // Simple query to check connection
      await connection.query("SELECT 1");

      connection.release();

      return NextResponse.json({
        status: "ok",
        message: "✅ Database холболт амжилттай",
        timestamp: new Date().toISOString(),
      });
    } catch (queryError: any) {
      connection.release();

      return NextResponse.json(
        {
          status: "error",
          message: "❌ Database query алдаатай",
          error: queryError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "❌ Database холболт амжилтгүй",
        error: error.message,
        config: {
          host: process.env.DATABASE_HOST ? "✅ Тохируулсан" : "❌ Алга",
          user: process.env.DATABASE_USER ? "✅ Тохируулсан" : "❌ Алга",
          database: process.env.DATABASE_NAME ? "✅ Тохируулсан" : "❌ Алга",
          password: process.env.DATABASE_PASSWORD
            ? "✅ Тохируулсан"
            : "❌ Алга",
        },
      },
      { status: 500 }
    );
  }
}
