import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";
import bcrypt from "bcryptjs";
import { getUserFromRequest, hasRole } from "@/lib/auth";

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
    
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "10");
      const search = url.searchParams.get("search") || "";
      const role = url.searchParams.get("role") || "";
      const status = url.searchParams.get("status") || "";

      // Build WHERE clause
      let whereClause = "WHERE 1=1";
      const queryParams: any[] = [];

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
      const countQuery = `SELECT COUNT(*) as total FROM users ${whereClause}`;
      const [countResult] = await connection.execute(countQuery, queryParams);
      const totalCount = (countResult as any)[0].total;

      // Get paginated results
      const offset = (page - 1) * limit;
      const dataQuery = `SELECT id, email, name, role, status, created_at, updated_at, last_login 
         FROM users ${whereClause} 
         ORDER BY created_at DESC 
         LIMIT ${limit} OFFSET ${offset}`;
      
      const [users] = await connection.execute(dataQuery, queryParams);

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
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Users API алдаа:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        message: "Серверийн алдаа",
        error: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}

// POST - Шинэ хэрэглэгч нэмэх (SuperAdmin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication and authorization
    const currentUser = await getUserFromRequest(request);
    
    if (!currentUser) {
      return NextResponse.json(
        { message: "Нэвтрэх шаардлагатай" },
        { status: 401 }
      );
    }

    if (!hasRole(currentUser, ["superAdmin"])) {
      return NextResponse.json(
        { message: "Зөвхөн супер админ хэрэглэгч үүсгэх эрхтэй" },
        { status: 403 }
      );
    }

    const connection = await pool.getConnection();
    
    try {
      const { email, name, role, password } = await request.json();

      // Validation
      if (!email || !name || !role || !password) {
        return NextResponse.json(
          { message: "Бүх талбарыг бөглөнө үү" },
          { status: 400 }
        );
      }

      // Validate role
      const validRoles = ["admin", "editor", "superAdmin"];
      if (!validRoles.includes(role)) {
        return NextResponse.json({ message: "Буруу эрх" }, { status: 400 });
      }

      // Validate password strength
      if (password.length < 6) {
        return NextResponse.json(
          { message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой" },
          { status: 400 }
        );
      }

      // И-мэйл давхардаж байгаа эсэхийг шалгах
      const [existingUsers] = await connection.execute(
        "SELECT COUNT(*) as count FROM users WHERE email = ?",
        [email]
      );

      if ((existingUsers as any)[0].count > 0) {
        return NextResponse.json(
          { message: "Энэ и-мэйл хаяг аль хэдийн бүртгэгдсэн байна" },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Шинэ хэрэглэгч үүсгэх
      const [result] = await connection.execute(
        `INSERT INTO users (email, name, password, role, status, created_at, updated_at) 
         VALUES (?, ?, ?, ?, 'active', NOW(), NOW())`,
        [email, name, hashedPassword, role]
      );

      const insertId = (result as any).insertId;

      // Шинэ хэрэглэгчийн мэдээллийг буцаах
      const [newUser] = await connection.execute(
        "SELECT id, email, name, role, status, created_at, updated_at, last_login FROM users WHERE id = ?",
        [insertId]
      );

      return NextResponse.json({
        success: true,
        message: "Хэрэглэгч амжилттай нэмэгдлээ",
        data: (newUser as any)[0],
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("User create алдаа:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        message: "Серверийн алдаа",
        error: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}
