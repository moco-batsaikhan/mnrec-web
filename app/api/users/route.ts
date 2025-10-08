import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  status: string;
  created_at: string;
  last_login: string | null;
}

// GET - Бүх хэрэглэгчдийг авах
export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const role = url.searchParams.get("role") || "";
    const status = url.searchParams.get("status") || "";

    // Build WHERE clause
    let whereClause = "WHERE 1=1";
    let queryParams: any[] = [];

    if (search) {
      whereClause += " AND (name LIKE ? OR email LIKE ?)";
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (role) {
      whereClause += " AND role = ?";
      queryParams.push(role);
    }

    if (status) {
      whereClause += " AND status = ?";
      queryParams.push(status);
    }

    // Get total count
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM users ${whereClause}`,
      queryParams,
    );
    const totalCount = (countResult as any)[0].total;

    // Get paginated results
    const offset = (page - 1) * limit;
    const [users] = await connection.execute(
      `SELECT id, email, name, role, status, created_at, updated_at, last_login 
       FROM users ${whereClause} 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset],
    );

    connection.release();

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        current: page,
        total: Math.ceil(totalCount / limit),
        count: totalCount,
        perPage: limit,
      },
    });
  } catch (error) {
    console.error("Users API алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// POST - Шинэ хэрэглэгч нэмэх
export async function POST(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    const { email, name, role, password } = await request.json();

    // Validation
    if (!email || !name || !role || !password) {
      connection.release();
      return NextResponse.json({ message: "Бүх талбарыг бөглөнө үү" }, { status: 400 });
    }

    // И-мэйл давхардаж байгаа эсэхийг шалгах
    const [existingUsers] = await connection.execute(
      "SELECT COUNT(*) as count FROM users WHERE email = ?",
      [email],
    );

    if ((existingUsers as any)[0].count > 0) {
      connection.release();
      return NextResponse.json(
        { message: "Энэ и-мэйл хаяг аль хэдийн бүртгэгдсэн байна" },
        { status: 400 },
      );
    }

    // Шинэ хэрэглэгч үүсгэх
    const [result] = await connection.execute(
      `INSERT INTO users (email, name, password, role, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, 'active', NOW(), NOW())`,
      [email, name, password, role],
    );

    const insertId = (result as any).insertId;

    // Шинэ хэрэглэгчийн мэдээллийг буцаах
    const [newUser] = await connection.execute(
      "SELECT id, email, name, role, status, created_at, updated_at, last_login FROM users WHERE id = ?",
      [insertId],
    );

    connection.release();

    return NextResponse.json({
      success: true,
      message: "Хэрэглэгч амжилттай нэмэгдлээ",
      data: (newUser as any)[0],
    });
  } catch (error) {
    console.error("User create алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
