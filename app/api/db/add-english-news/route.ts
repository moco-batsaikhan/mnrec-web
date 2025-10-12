import { NextResponse } from "next/server";
import pool from "@/lib/database";

/**
 * Add English language columns to news table
 * GET /api/db/add-english-news
 */
export async function GET() {
  try {
    const connection = await pool.getConnection();

    try {
      // Check if columns already exist
      const [columns]: any = await connection.execute(`
        SHOW COLUMNS FROM news LIKE 'en_title'
      `);

      if (columns.length > 0) {
        return NextResponse.json({
          success: true,
          message: "English columns already exist in news table",
        });
      }

      // Add English columns
      await connection.execute(`
        ALTER TABLE news 
        ADD COLUMN en_title VARCHAR(500) NULL AFTER title,
        ADD COLUMN en_content LONGTEXT NULL AFTER content,
        ADD COLUMN en_summary TEXT NULL AFTER summary
      `);

      // Drop old FULLTEXT index (ignore error if not exists)
      try {
        await connection.execute(`DROP INDEX idx_search ON news`);
      } catch (err) {
        // Index might not exist, continue
        console.log("Index does not exist or already dropped");
      }

      // Create new FULLTEXT index with English columns
      await connection.execute(`
        CREATE FULLTEXT INDEX idx_search ON news (title, content, summary, en_title, en_content, en_summary)
      `);

      return NextResponse.json({
        success: true,
        message:
          "Successfully added English columns to news table and updated search index",
      });
    } finally {
      connection.release();
    }
  } catch (error: any) {
    console.error("Add English columns error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to add English columns",
      },
      { status: 500 }
    );
  }
}
