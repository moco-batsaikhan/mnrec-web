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

// PUT - Мэдээ засварлах
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await pool.getConnection();
    const newsId = parseInt(params.id);
    const { title, content, summary, status, category, tags, featuredImage } = await request.json();

    // Мэдээ олох
    const [existingNews] = await connection.execute("SELECT * FROM news WHERE id = ?", [newsId]);

    if ((existingNews as any).length === 0) {
      connection.release();
      return NextResponse.json({ message: "Мэдээ олдсонгүй" }, { status: 404 });
    }

    const currentNews = (existingNews as any)[0];

    // Slug шинэчлэх (title өөрчлөгдсөн бол)
    let newSlug = currentNews.slug;
    if (title && title !== currentNews.title) {
      newSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim();

      // Slug давхардаж байгаа эсэхийг шалгах
      const [slugCheck] = await connection.execute(
        "SELECT id FROM news WHERE slug = ? AND id != ?",
        [newSlug, newsId],
      );

      if ((slugCheck as any).length > 0) {
        newSlug = `${newSlug}-${Date.now()}`;
      }
    }

    // Published date шинэчлэх
    let publishedAt = currentNews.published_at;
    if (status === "published" && currentNews.status !== "published") {
      publishedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    } else if (status !== "published") {
      publishedAt = null;
    }

    // Update values
    const updateFields = [];
    const updateValues = [];

    if (title) {
      updateFields.push("title = ?");
      updateValues.push(title);
    }
    if (content) {
      updateFields.push("content = ?");
      updateValues.push(content);
    }
    if (summary) {
      updateFields.push("summary = ?");
      updateValues.push(summary);
    }
    if (status) {
      updateFields.push("status = ?");
      updateValues.push(status);
    }
    if (category) {
      updateFields.push("category = ?");
      updateValues.push(category);
    }
    if (tags) {
      updateFields.push("tags = ?");
      updateValues.push(JSON.stringify(Array.isArray(tags) ? tags : []));
    }
    if (featuredImage !== undefined) {
      updateFields.push("featured_image = ?");
      updateValues.push(featuredImage);
    }

    updateFields.push("slug = ?", "published_at = ?", "updated_at = ?");
    updateValues.push(
      newSlug,
      publishedAt,
      new Date().toISOString().slice(0, 19).replace("T", " "),
    );
    updateValues.push(newsId);

    // Мэдээ засварлах
    await connection.execute(
      `UPDATE news SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues,
    );

    // Засварласан мэдээг авах
    const [updatedNews] = await connection.execute(
      "SELECT n.*, u.name as author_name FROM news n LEFT JOIN users u ON n.author_id = u.id WHERE n.id = ?",
      [newsId],
    );

    const newsData = (updatedNews as any)[0];
    connection.release();

    return NextResponse.json({
      success: true,
      message: "Мэдээ амжилттай засварлагдлаа",
      data: {
        id: newsData.id,
        title: newsData.title,
        content: newsData.content,
        summary: newsData.summary,
        slug: newsData.slug,
        status: newsData.status,
        featuredImage: newsData.featured_image,
        category: newsData.category,
        tags: newsData.tags ? JSON.parse(newsData.tags) : [],
        authorId: newsData.author_id,
        authorName: newsData.author_name,
        publishedAt: newsData.published_at,
        createdAt: newsData.created_at,
        updatedAt: newsData.updated_at,
        viewCount: newsData.view_count,
      },
    });
  } catch (error) {
    console.error("News update алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// DELETE - Мэдээ устгах
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await pool.getConnection();
    const newsId = parseInt(params.id);

    // Мэдээ олох
    const [existingNews] = await connection.execute("SELECT * FROM news WHERE id = ?", [newsId]);

    if ((existingNews as any).length === 0) {
      connection.release();
      return NextResponse.json({ message: "Мэдээ олдсонгүй" }, { status: 404 });
    }

    const newsData = (existingNews as any)[0];

    // Мэдээ устгах
    await connection.execute("DELETE FROM news WHERE id = ?", [newsId]);

    connection.release();

    return NextResponse.json({
      success: true,
      message: "Мэдээ амжилттай устгагдлаа",
      data: {
        id: newsData.id,
        title: newsData.title,
        content: newsData.content,
        summary: newsData.summary,
        slug: newsData.slug,
        status: newsData.status,
        featuredImage: newsData.featured_image,
        category: newsData.category,
        tags: newsData.tags ? JSON.parse(newsData.tags) : [],
        authorId: newsData.author_id,
        authorName: newsData.author_name,
        publishedAt: newsData.published_at,
        createdAt: newsData.created_at,
        updatedAt: newsData.updated_at,
        viewCount: newsData.view_count,
      },
    });
  } catch (error) {
    console.error("News delete алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// GET - Нэг мэдээ авах
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await pool.getConnection();
    const newsId = parseInt(params.id);

    // Мэдээ олох
    const [newsResult] = await connection.execute(
      "SELECT n.*, u.name as author_name FROM news n LEFT JOIN users u ON n.author_id = u.id WHERE n.id = ?",
      [newsId],
    );

    if ((newsResult as any).length === 0) {
      connection.release();
      return NextResponse.json({ message: "Мэдээ олдсонгүй" }, { status: 404 });
    }

    const newsData = (newsResult as any)[0];

    // Үзэлтийн тоо нэмэгдүүлэх (GET хүсэлт ирэх бүрд)
    await connection.execute("UPDATE news SET view_count = view_count + 1 WHERE id = ?", [newsId]);

    connection.release();

    return NextResponse.json({
      success: true,
      data: {
        id: newsData.id,
        title: newsData.title,
        content: newsData.content,
        summary: newsData.summary,
        slug: newsData.slug,
        status: newsData.status,
        featuredImage: newsData.featured_image,
        category: newsData.category,
        tags: newsData.tags ? JSON.parse(newsData.tags) : [],
        authorId: newsData.author_id,
        authorName: newsData.author_name,
        publishedAt: newsData.published_at,
        createdAt: newsData.created_at,
        updatedAt: newsData.updated_at,
        viewCount: newsData.view_count + 1, // Updated count
      },
    });
  } catch (error) {
    console.error("News get алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
