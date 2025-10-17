import { NextResponse } from "next/server";
import pool from "@/lib/database";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // Get the latest 2 published news items with category 'home'
    const query = `
      SELECT 
        n.id,
        n.title,
        n.en_title,
        n.summary,
        n.en_summary,
        n.featured_image,
        n.slug,
        n.tags,
        n.category,
        n.created_at
      FROM news n
      WHERE n.status = 'published' AND (n.category = 'homeNews' OR n.category = 'homeIntroduction')
      ORDER BY n.created_at DESC
      LIMIT 2
    `;

    const [rows] = await connection.execute(query);
    connection.release();

    // Transform data
    const newsData = (rows as any[]).map((row) => {
      // Parse tags
      let tags = [];
      if (row.tags) {
        try {
          tags = JSON.parse(row.tags);
        } catch (error) {
          tags = [];
        }
      }

      return {
        id: row.id,
        title: row.title,
        en_title: row.en_title || null,
        summary: row.summary,
        en_summary: row.en_summary || null,
        featuredImage: row.featured_image,
        slug: row.slug,
        tags,
        category: row.category || null,
        createdAt: row.created_at,
      };
    });

    return NextResponse.json({
      success: true,
      news: newsData,
    });
  } catch (error) {
    console.error("Banner News API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch news",
        news: [],
      },
      { status: 500 }
    );
  }
}
