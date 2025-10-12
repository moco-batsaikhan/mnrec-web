import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";
import { getUserFromRequest, hasRole } from "@/lib/auth";

/**
 * Get dashboard statistics from database
 * GET /api/dashboard/stats
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const currentUser = await getUserFromRequest(request);

    if (!currentUser) {
      return NextResponse.json(
        { message: "Нэвтрэх шаардлагатай" },
        { status: 401 }
      );
    }

    // Only admin, editor, and superAdmin can access dashboard stats
    if (!hasRole(currentUser, ["admin", "editor", "superAdmin"])) {
      return NextResponse.json(
        { message: "Хандах эрхгүй байна" },
        { status: 403 }
      );
    }

    const connection = await pool.getConnection();

    try {
      // Get total news count
      const [newsCount] = await connection.query(
        "SELECT COUNT(*) as total FROM news"
      );
      const totalNews = (newsCount as any)[0]?.total || 0;

      // Get published news count
      const [publishedCount] = await connection.query(
        "SELECT COUNT(*) as total FROM news WHERE status = 'published'"
      );
      const publishedNews = (publishedCount as any)[0]?.total || 0;

      // Get draft news count
      const [draftCount] = await connection.query(
        "SELECT COUNT(*) as total FROM news WHERE status = 'draft'"
      );
      const draftNews = (draftCount as any)[0]?.total || 0;

      // Get total users count
      const [usersCount] = await connection.query(
        "SELECT COUNT(*) as total FROM users"
      );
      const totalUsers = (usersCount as any)[0]?.total || 0;

      // Get active users count
      const [activeUsersCount] = await connection.query(
        "SELECT COUNT(*) as total FROM users WHERE status = 'active'"
      );
      const activeUsers = (activeUsersCount as any)[0]?.total || 0;

      // Get recent news (last 5)
      const [recentNews] = await connection.query(
        `SELECT id, title, status, created_at, updated_at 
         FROM news 
         ORDER BY created_at DESC 
         LIMIT 5`
      );

      return NextResponse.json({
        success: true,
        data: {
          overview: {
            totalUsers,
            activeUsers,
            totalNews,
            publishedNews,
            draftNews,
          },
          recentNews: recentNews,
        },
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      {
        message: "Серверийн алдаа",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
