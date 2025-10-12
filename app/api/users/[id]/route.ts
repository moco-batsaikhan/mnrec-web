import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";
import bcrypt from "bcryptjs";
import { getUserFromRequest, hasRole } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { message: "Зөвхөн супер админ хэрэглэгч засварлах эрхтэй" },
        { status: 403 }
      );
    }

    const connection = await pool.getConnection();

    try {
      const resolvedParams = await params;
      const userId = parseInt(resolvedParams.id);
      const { email, name, role, status, password } = await request.json();

      const [existingUser] = await connection.execute(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );

      if ((existingUser as any).length === 0) {
        return NextResponse.json(
          { message: "Хэрэглэгч олдсонгүй" },
          { status: 404 }
        );
      }

      if (role) {
        const validRoles = ["admin", "editor", "superAdmin"];
        if (!validRoles.includes(role)) {
          return NextResponse.json({ message: "Буруу эрх" }, { status: 400 });
        }
      }

      if (email) {
        const [duplicateCheck] = await connection.execute(
          "SELECT COUNT(*) as count FROM users WHERE email = ? AND id != ?",
          [email, userId]
        );

        if ((duplicateCheck as any)[0].count > 0) {
          return NextResponse.json(
            { message: "Энэ и-мэйл хаяг аль хэдийн ашиглагдаж байна" },
            { status: 400 }
          );
        }
      }

      // Хэрэглэгч засварлах
      const updateFields = [];
      const updateValues = [];

      if (email) {
        updateFields.push("email = ?");
        updateValues.push(email);
      }
      if (name) {
        updateFields.push("name = ?");
        updateValues.push(name);
      }
      if (role) {
        updateFields.push("role = ?");
        updateValues.push(role);
      }
      if (status) {
        updateFields.push("status = ?");
        updateValues.push(status);
      }
      if (password) {
        // Validate password strength
        if (password.length < 6) {
          return NextResponse.json(
            { message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой" },
            { status: 400 }
          );
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.push("password = ?");
        updateValues.push(hashedPassword);
      }

      // Check if there are fields to update
      if (updateFields.length === 0) {
        return NextResponse.json(
          { message: "Шинэчлэх мэдээлэл байхгүй байна" },
          { status: 400 }
        );
      }

      updateFields.push("updated_at = NOW()");

      const sqlQuery = `UPDATE users SET ${updateFields.join(
        ", "
      )} WHERE id = ?`;
      const sqlParams = [...updateValues, userId];

      console.log("PUT /api/users/[id] - SQL Debug:", {
        query: sqlQuery,
        paramsCount: sqlParams.length,
        placeholderCount: (sqlQuery.match(/\?/g) || []).length,
        fields: updateFields,
      });

      await connection.execute(sqlQuery, sqlParams);

      // Засварласан хэрэглэгчийн мэдээллийг буцаах
      const [updatedUser] = await connection.execute(
        "SELECT id, email, name, role, status, created_at, updated_at, last_login FROM users WHERE id = ?",
        [userId]
      );

      return NextResponse.json({
        success: true,
        message: "Хэрэглэгч амжилттай засварлагдлаа",
        data: (updatedUser as any)[0],
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("========================================");
    console.error("PUT /api/users/[id] - АЛДАА:");
    console.error("Error:", error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    console.error("========================================");

    return NextResponse.json(
      {
        message: "Серверийн алдаа",
        error: error instanceof Error ? error.message : String(error),
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// DELETE - Хэрэглэгч устгах (SuperAdmin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { message: "Зөвхөн супер админ хэрэглэгч устгах эрхтэй" },
        { status: 403 }
      );
    }

    const connection = await pool.getConnection();

    try {
      const resolvedParams = await params;
      const userId = parseInt(resolvedParams.id);

      // Хэрэглэгч олох
      const [user] = await connection.execute(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );

      if ((user as any).length === 0) {
        return NextResponse.json(
          { message: "Хэрэглэгч олдсонгүй" },
          { status: 404 }
        );
      }

      // Admin хэрэглэгчийг устгахыг хориглох
      if ((user as any)[0].role === "admin") {
        return NextResponse.json(
          { message: "Админ хэрэглэгчийг устгах боломжгүй" },
          { status: 403 }
        );
      }

      // Хэрэглэгч устгах
      await connection.execute("DELETE FROM users WHERE id = ?", [userId]);

      return NextResponse.json({
        success: true,
        message: "Хэрэглэгч амжилттай устгагдлаа",
        data: (user as any)[0],
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("User delete алдаа:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        message: "Серверийн алдаа",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET - Тодорхой хэрэглэгч авах
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const connection = await pool.getConnection();

    try {
      const resolvedParams = await params;
      const userId = parseInt(resolvedParams.id);

      const [rows] = await connection.execute(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );

      if ((rows as any).length === 0) {
        return NextResponse.json(
          { message: "Хэрэглэгч олдсонгүй" },
          { status: 404 }
        );
      }

      const user = (rows as any)[0];

      // Нууц үгийг хасах
      const { password, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        data: userWithoutPassword,
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("User get алдаа:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        message: "Серверийн алдаа",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
