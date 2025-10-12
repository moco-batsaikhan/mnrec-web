import { NextResponse } from "next/server";
import pool from "@/lib/database";
import { RowDataPacket } from "mysql2";

export async function POST(request: Request) {
  let connection;
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Бүх талбарыг бөглөнө үү" },
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

    // Insert contact message
    const [result] = await connection.query(
      `INSERT INTO contact_messages 
       (first_name, last_name, email, phone, subject, message, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 'new', NOW())`,
      [firstName, lastName, email, phone, subject, message]
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Таны мэдээлэл амжилттай илгээгдлээ. Бид тантай удахгүй холбогдох болно.",
        data: { id: (result as any).insertId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

// GET endpoint for admin to view contact messages
export async function GET(request: Request) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "";
    const offset = (page - 1) * limit;

    connection = await pool.getConnection();

    // Build query
    let whereClause = "";
    const queryParams: any[] = [];

    if (status) {
      whereClause = "WHERE status = ?";
      queryParams.push(status);
    }

    // Get total count
    const [countResult] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM contact_messages ${whereClause}`,
      queryParams
    );
    const total = countResult[0].total;

    // Get messages with pagination
    const [messages] = await connection.query<RowDataPacket[]>(
      `SELECT id, first_name, last_name, email, phone, subject, message, status, created_at, updated_at
       FROM contact_messages 
       ${whereClause}
       ORDER BY created_at DESC 
       LIMIT ${limit} OFFSET ${offset}`,
      queryParams
    );

    return NextResponse.json({
      success: true,
      data: messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get contact messages error:", error);
    return NextResponse.json(
      { success: false, message: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
