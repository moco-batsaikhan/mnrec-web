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
  category: string;
  tags: string[];
  authorId: number;
  authorName: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

// GET - Бүх мэдээг авах
export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";
    const category = url.searchParams.get("category") || "";
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
    if (search) {
      query += ` AND (n.title LIKE ? OR n.content LIKE ? OR n.summary LIKE ? OR u.name LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      query += ` AND n.status = ?`;
      queryParams.push(status);
    }

    if (category) {
      query += ` AND n.category = ?`;
      queryParams.push(category);
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
    const countQuery = query.replace("n.*, u.name as author_name", "COUNT(*) as total");
    const [countResult] = await connection.execute(countQuery, queryParams);
    const totalCount = (countResult as any)[0].total;

    // Add ordering and pagination to main query
    const validSortColumns = {
      title: "n.title",
      createdAt: "n.created_at",
      updatedAt: "n.updated_at",
      viewCount: "n.view_count",
      status: "n.status",
      category: "n.category",
      publishedAt: "n.published_at",
    };

    const sortColumn = validSortColumns[sortBy as keyof typeof validSortColumns] || "n.created_at";
    const sortDirection = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";

    query += ` ORDER BY ${sortColumn} ${sortDirection}`;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, (page - 1) * limit);

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
    const newsData = (rows as any[]).map(row => ({
      id: row.id,
      title: row.title,
      content: row.content,
      summary: row.summary,
      slug: row.slug,
      status: row.status,
      featuredImage: row.featured_image,
      category: row.category,
      tags: row.tags ? JSON.parse(row.tags) : [],
      authorId: row.author_id,
      authorName: row.author_name || "Unknown",
      publishedAt: row.published_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      viewCount: row.view_count,
    }));

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
  try {
    const connection = await pool.getConnection();
    const {
      title,
      content,
      summary,
      status = "draft",
      category,
      tags = [],
      authorId,
      featuredImage,
    } = await request.json();

    // Validation
    if (!title || !content || !summary || !category || !authorId) {
      connection.release();
      return NextResponse.json({ message: "Шаардлагатай талбарууд дутуу байна" }, { status: 400 });
    }

    // Author байгаа эсэхийг шалгах
    const [authorResult] = await connection.execute("SELECT name FROM users WHERE id = ?", [
      authorId,
    ]);

    if ((authorResult as any).length === 0) {
      connection.release();
      return NextResponse.json({ message: "Зохиогч олдсонгүй" }, { status: 404 });
    }

    const authorName = (authorResult as any)[0].name;

    // Slug үүсгэх (title-ээс)
    let slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();

    // Slug давхардаж байгаа эсэхийг шалгах
    const [existingSlug] = await connection.execute("SELECT id FROM news WHERE slug = ?", [slug]);

    if ((existingSlug as any).length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    // Шинэ мэдээ нэмэх
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const publishedAt = status === "published" ? now : null;

    const [result] = await connection.execute(
      `INSERT INTO news (
        title, content, summary, slug, status, featured_image, 
        category, tags, author_id, published_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        content,
        summary,
        slug,
        status,
        featuredImage,
        category,
        JSON.stringify(tags),
        authorId,
        publishedAt,
        now,
        now,
      ],
    );

    const insertId = (result as any).insertId;

    // Үүссэн мэдээг буцаах
    const [newNewsResult] = await connection.execute("SELECT * FROM news WHERE id = ?", [insertId]);

    const newNews = (newNewsResult as any)[0];

    connection.release();

    return NextResponse.json({
      success: true,
      message: "Мэдээ амжилттай нэмэгдлээ",
      data: {
        id: newNews.id,
        title: newNews.title,
        content: newNews.content,
        summary: newNews.summary,
        slug: newNews.slug,
        status: newNews.status,
        featuredImage: newNews.featured_image,
        category: newNews.category,
        tags: newNews.tags ? JSON.parse(newNews.tags) : [],
        authorId: newNews.author_id,
        authorName,
        publishedAt: newNews.published_at,
        createdAt: newNews.created_at,
        updatedAt: newNews.updated_at,
        viewCount: newNews.view_count,
      },
    });
  } catch (error) {
    console.error("News create алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
