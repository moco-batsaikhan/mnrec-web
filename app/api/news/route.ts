import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";

interface News {
  id: number;
  title: string;
  content: string;
  summary: string;
  slug: string;
  status: "draft" | "published" | "archived";
  featuredImage: string | null;
  tags: string[];
  authorId: number;
  authorName: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// GET - Бүх мэдээг авах
export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const slug = url.searchParams.get("slug") || "";
    const status = url.searchParams.get("status") || "";
    const author = url.searchParams.get("author") || "";
    const startDate = url.searchParams.get("startDate") || "";
    const endDate = url.searchParams.get("endDate") || "";
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") || "desc";

    // Base query
    let query = `
      SELECT n.*, u.name as author_name 
      FROM news n 
      LEFT JOIN users u ON n.author_id = u.id 
      WHERE 1=1
    `;
    const queryParams: any[] = [];

    // Хайлт болон шүүлт
    if (slug) {
      query += ` AND n.slug = ?`;
      queryParams.push(slug);
    }

    if (search) {
      query += ` AND (n.title LIKE ? OR n.content LIKE ? OR n.summary LIKE ? OR u.name LIKE ?)`;
      queryParams.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    if (status) {
      query += ` AND n.status = ?`;
      queryParams.push(status);
    }

    if (author) {
      query += ` AND u.name LIKE ?`;
      queryParams.push(`%${author}%`);
    }

    if (startDate) {
      query += ` AND DATE(n.created_at) >= ?`;
      queryParams.push(startDate);
    }

    if (endDate) {
      query += ` AND DATE(n.created_at) <= ?`;
      queryParams.push(endDate);
    }

    // Count query for pagination
    const countQuery = query.replace(
      "n.*, u.name as author_name",
      "COUNT(*) as total"
    );
    const [countResult] = await connection.execute(countQuery, queryParams);
    const totalCount = (countResult as any)[0].total;

    // Add ordering and pagination to main query
    const validSortColumns = {
      title: "n.title",
      createdAt: "n.created_at",
      updatedAt: "n.updated_at",
      status: "n.status",
      publishedAt: "n.published_at",
    };

    const sortColumn =
      validSortColumns[sortBy as keyof typeof validSortColumns] ||
      "n.created_at";
    const sortDirection = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";

    query += ` ORDER BY ${sortColumn} ${sortDirection}`;

    // Use direct numeric values for LIMIT/OFFSET instead of ? placeholders
    // to avoid MySQL prepared statement issues (ER_WRONG_ARGUMENTS)
    const safeLimit = Math.max(1, Math.min(100, Number(limit) || 10));
    const safeOffset = Math.max(0, Number((page - 1) * limit) || 0);
    query += ` LIMIT ${safeLimit} OFFSET ${safeOffset}`;

    const [rows] = await connection.execute(query, queryParams);

    // Get stats
    const [statsResult] = await connection.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
        SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived
      FROM news
    `);

    // Transform data to match interface
    const newsData = (rows as any[]).map((row) => {
      // Safely parse tags JSON, fallback to empty array if invalid
      let tags = [];
      if (row.tags) {
        try {
          tags = JSON.parse(row.tags);
        } catch (error) {
          console.warn(`Invalid JSON in tags for news ID ${row.id}:`, row.tags);
          tags = [];
        }
      }

      return {
        id: row.id,
        title: row.title,
        content: row.content,
        summary: row.summary,
        en_title: row.en_title || null,
        en_content: row.en_content || null,
        en_summary: row.en_summary || null,
        slug: row.slug,
        status: row.status,
        category: row.category || "news",
        featuredImage: row.featured_image,
        tags,
        authorId: row.author_id,
        authorName: row.author_name || "Unknown",
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    });

    connection.release();

    return NextResponse.json({
      success: true,
      data: newsData,
      pagination: {
        current: page,
        total: Math.ceil(totalCount / limit),
        count: totalCount,
        perPage: limit,
      },
      stats: (statsResult as any)[0],
    });
  } catch (error) {
    console.error("News API алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// POST - Шинэ мэдээ нэмэх
export async function POST(request: NextRequest) {
  let connection;
  try {
    console.log("📝 NEWS CREATE API - Starting...");

    const body = await request.json();
    console.log("📝 Received data:", {
      title: body.title,
      hasContent: !!body.content,
      hasSummary: !!body.summary,
      authorId: body.authorId,
      status: body.status,
      tags: body.tags,
    });

    connection = await pool.getConnection();
    console.log("✅ Database connection established");

    const {
      title,
      content,
      summary,
      en_title,
      en_content,
      en_summary,
      status = "draft",
  category = "news",
      tags = [],
      authorId,
      featuredImage,
    } = body;

    // Validation
    if (!title || !content || !summary || !authorId) {
      console.error("❌ Validation failed:", {
        title: !!title,
        content: !!content,
        summary: !!summary,
        authorId: !!authorId,
      });
      connection.release();
      return NextResponse.json(
        { message: "Шаардлагатай талбарууд дутуу байна" },
        { status: 400 }
      );
    }

    // Author байгаа эсэхийг шалгах
    console.log("🔍 Checking author with ID:", authorId);
    const [authorResult] = await connection.execute(
      "SELECT name FROM users WHERE id = ?",
      [authorId]
    );

    if ((authorResult as any).length === 0) {
      console.error("❌ Author not found:", authorId);
      connection.release();
      return NextResponse.json(
        { message: "Зохиогч олдсонгүй" },
        { status: 404 }
      );
    }

    const authorName = (authorResult as any)[0].name;
    console.log("✅ Author found:", authorName);

    // Slug үүсгэх (title-ээс)
    let slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();

    console.log("📝 Generated slug:", slug);

    // Slug давхардаж байгаа эсэхийг шалгах
    const [existingSlug] = await connection.execute(
      "SELECT id FROM news WHERE slug = ?",
      [slug]
    );

    if ((existingSlug as any).length > 0) {
      slug = `${slug}-${Date.now()}`;
      console.log("⚠️ Slug existed, using new slug:", slug);
    }

    // Шинэ мэдээ нэмэх
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const publishedAt = status === "published" ? now : null;

    console.log("💾 Inserting news into database...");
    const [result] = await connection.execute(
      `INSERT INTO news (
        title, content, summary, en_title, en_content, en_summary,
        slug, status, category, featured_image, tags, author_id, published_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        content,
        summary,
        en_title || null,
        en_content || null,
        en_summary || null,
        slug,
        status,
        category,
        featuredImage,
        JSON.stringify(tags),
        authorId,
        publishedAt,
        now,
        now,
      ]
    );

    const insertId = (result as any).insertId;
    console.log("✅ News inserted with ID:", insertId);

    // Үүссэн мэдээг буцаах
    const [newNewsResult] = await connection.execute(
      "SELECT * FROM news WHERE id = ?",
      [insertId]
    );

    const newNews = (newNewsResult as any)[0];

    connection.release();

    // Safely parse tags JSON, fallback to empty array if invalid
    let parsedTags = [];
    if (newNews.tags) {
      try {
        parsedTags = JSON.parse(newNews.tags);
      } catch (error) {
        console.warn(
          `Invalid JSON in tags for new news ID ${newNews.id}:`,
          newNews.tags
        );
        parsedTags = [];
      }
    }

    return NextResponse.json({
      success: true,
      message: "Мэдээ амжилттай нэмэгдлээ",
      data: {
        id: newNews.id,
        title: newNews.title,
        content: newNews.content,
        summary: newNews.summary,
        en_title: newNews.en_title || null,
        en_content: newNews.en_content || null,
        en_summary: newNews.en_summary || null,
        slug: newNews.slug,
        status: newNews.status,
        category: newNews.category,
        featuredImage: newNews.featured_image,
        tags: parsedTags,
        authorId: newNews.author_id,
        authorName,
        publishedAt: newNews.published_at,
        createdAt: newNews.created_at,
        updatedAt: newNews.updated_at,
      },
    });
  } catch (error) {
    console.error("❌ NEWS CREATE ERROR:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : "No stack trace",
    });

    if (connection) {
      connection.release();
    }

    return NextResponse.json(
      {
        message: "Серверийн алдаа",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
