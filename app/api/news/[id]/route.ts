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

// PUT - Мэдээ засварлах
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const connection = await pool.getConnection();
    const resolvedParams = await params;
    const newsId = parseInt(resolvedParams.id);
    const { 
      title, content, summary, 
      en_title, en_content, en_summary,
      status, tags, featuredImage 
    } = await request.json();

    // Мэдээ олох
    const [existingNews] = await connection.execute(
      "SELECT * FROM news WHERE id = ?",
      [newsId]
    );

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
        [newSlug, newsId]
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
    if (en_title !== undefined) {
      updateFields.push("en_title = ?");
      updateValues.push(en_title);
    }
    if (en_content !== undefined) {
      updateFields.push("en_content = ?");
      updateValues.push(en_content);
    }
    if (en_summary !== undefined) {
      updateFields.push("en_summary = ?");
      updateValues.push(en_summary);
    }
    if (status) {
      updateFields.push("status = ?");
      updateValues.push(status);
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
      new Date().toISOString().slice(0, 19).replace("T", " ")
    );
    updateValues.push(newsId);

    // Мэдээ засварлах
    await connection.execute(
      `UPDATE news SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues
    );

    // Засварласан мэдээг авах
    const [updatedNews] = await connection.execute(
      "SELECT n.*, u.name as author_name FROM news n LEFT JOIN users u ON n.author_id = u.id WHERE n.id = ?",
      [newsId]
    );

    const newsData = (updatedNews as any)[0];
    connection.release();

    // Safely parse tags JSON, fallback to empty array if invalid
    let parsedTags = [];
    if (newsData.tags) {
      try {
        parsedTags = JSON.parse(newsData.tags);
      } catch (error) {
        console.warn(
          `Invalid JSON in tags for updated news ID ${newsData.id}:`,
          newsData.tags
        );
        parsedTags = [];
      }
    }

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
        tags: parsedTags,
        authorId: newsData.author_id,
        authorName: newsData.author_name,
        publishedAt: newsData.published_at,
        createdAt: newsData.created_at,
        updatedAt: newsData.updated_at,
      },
    });
  } catch (error) {
    console.error("News update алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// DELETE - Мэдээ устгах
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const connection = await pool.getConnection();
    const resolvedParams = await params;
    const newsId = parseInt(resolvedParams.id);

    // Мэдээ олох
    const [existingNews] = await connection.execute(
      "SELECT * FROM news WHERE id = ?",
      [newsId]
    );

    if ((existingNews as any).length === 0) {
      connection.release();
      return NextResponse.json({ message: "Мэдээ олдсонгүй" }, { status: 404 });
    }

    const newsData = (existingNews as any)[0];

    // Мэдээ устгах
    await connection.execute("DELETE FROM news WHERE id = ?", [newsId]);

    connection.release();

    // Safely parse tags JSON, fallback to empty array if invalid
    let parsedTags = [];
    if (newsData.tags) {
      try {
        parsedTags = JSON.parse(newsData.tags);
      } catch (error) {
        console.warn(
          `Invalid JSON in tags for deleted news ID ${newsData.id}:`,
          newsData.tags
        );
        parsedTags = [];
      }
    }

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
        tags: parsedTags,
        authorId: newsData.author_id,
        authorName: newsData.author_name,
        publishedAt: newsData.published_at,
        createdAt: newsData.created_at,
        updatedAt: newsData.updated_at,
      },
    });
  } catch (error) {
    console.error("News delete алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// GET - Нэг мэдээ авах
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const connection = await pool.getConnection();
    const resolvedParams = await params;
    const newsId = parseInt(resolvedParams.id);

    // Мэдээ олох
    const [newsResult] = await connection.execute(
      "SELECT n.*, u.name as author_name FROM news n LEFT JOIN users u ON n.author_id = u.id WHERE n.id = ?",
      [newsId]
    );

    if ((newsResult as any).length === 0) {
      connection.release();
      return NextResponse.json({ message: "Мэдээ олдсонгүй" }, { status: 404 });
    }

    const newsData = (newsResult as any)[0];

    connection.release();

    // Safely parse tags JSON, fallback to empty array if invalid
    let parsedTags = [];
    if (newsData.tags) {
      try {
        parsedTags = JSON.parse(newsData.tags);
      } catch (error) {
        console.warn(
          `Invalid JSON in tags for news ID ${newsData.id}:`,
          newsData.tags
        );
        parsedTags = [];
      }
    }

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
        tags: parsedTags,
        authorId: newsData.author_id,
        authorName: newsData.author_name,
        publishedAt: newsData.published_at,
        createdAt: newsData.created_at,
        updatedAt: newsData.updated_at,
      },
    });
  } catch (error) {
    console.error("News get алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
