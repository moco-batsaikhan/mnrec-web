import { NextResponse } from "next/server";
import pool from "@/lib/database";
import { RowDataPacket } from "mysql2";

export async function POST(request: Request) {
  let connection;
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: "И-мэйл хаягаа оруулна уу" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "И-мэйл хаяг буруу байна" },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();

    // Check if already subscribed
    const [existing] = await connection.query<RowDataPacket[]>(
      `SELECT id FROM newsletter_subscribers WHERE email = ?`,
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "Та аль хэдийн бүртгэлтэй байна" },
        { status: 400 }
      );
    }

    // Insert new subscriber
    await connection.query(
      `INSERT INTO newsletter_subscribers (email, subscribed_at) 
       VALUES (?, NOW())`,
      [email]
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Амжилттай бүртгэгдлээ! Бидний мэдээллийг цаг тухайд нь хүлээн авна.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscribe error:", error);

    // Check if it's a table not found error
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (
      errorMessage.includes("doesn't exist") ||
      errorMessage.includes("Table")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Newsletter table үүсээгүй байна. Admin панел руу орж table үүсгэнэ үү.",
          error: errorMessage,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Серверийн алдаа гарлаа",
        error: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

// GET endpoint for admin to view subscribers
export async function GET(request: Request) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    connection = await pool.getConnection();

    // Get total count
    const [countResult] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM newsletter_subscribers`
    );
    const total = countResult[0].total;

    // Get subscribers with pagination
    const [subscribers] = await connection.query<RowDataPacket[]>(
      `SELECT id, email, subscribed_at
       FROM newsletter_subscribers 
       ORDER BY subscribed_at DESC 
       LIMIT ${limit} OFFSET ${offset}`
    );

    return NextResponse.json({
      success: true,
      data: subscribers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get newsletter subscribers error:", error);
    return NextResponse.json(
      { success: false, message: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
