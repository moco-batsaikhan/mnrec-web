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
} // PUT - Хэрэглэгч засварлах
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await pool.getConnection();
    const userId = parseInt(params.id);
    const { email, name, role, status } = await request.json();

    // Хэрэглэгч олох
    const [existingUser] = await connection.execute("SELECT * FROM users WHERE id = ?", [userId]);

    if ((existingUser as any).length === 0) {
      connection.release();
      return NextResponse.json({ message: "Хэрэглэгч олдсонгүй" }, { status: 404 });
    }

    // Өөр хэрэглэгчтэй и-мэйл давхцаж байгаа эсэхийг шалгах
    if (email) {
      const [duplicateCheck] = await connection.execute(
        "SELECT COUNT(*) as count FROM users WHERE email = ? AND id != ?",
        [email, userId],
      );

      if ((duplicateCheck as any)[0].count > 0) {
        connection.release();
        return NextResponse.json(
          { message: "Энэ и-мэйл хаяг аль хэдийн ашиглагдаж байна" },
          { status: 400 },
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

    updateFields.push("updated_at = NOW()");
    updateValues.push(userId);

    await connection.execute(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues,
    );

    // Засварласан хэрэглэгчийн мэдээллийг буцаах
    const [updatedUser] = await connection.execute(
      "SELECT id, email, name, role, status, created_at, updated_at, last_login FROM users WHERE id = ?",
      [userId],
    );

    connection.release();

    return NextResponse.json({
      success: true,
      message: "Хэрэглэгч амжилттай засварлагдлаа",
      data: (updatedUser as any)[0],
    });
  } catch (error) {
    console.error("User update алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// DELETE - Хэрэглэгч устгах
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await pool.getConnection();
    const userId = parseInt(params.id);

    // Хэрэглэгч олох
    const [user] = await connection.execute("SELECT * FROM users WHERE id = ?", [userId]);

    if ((user as any).length === 0) {
      connection.release();
      return NextResponse.json({ message: "Хэрэглэгч олдсонгүй" }, { status: 404 });
    }

    // Admin хэрэглэгчийг устгахыг хориглох
    if ((user as any)[0].role === "admin") {
      connection.release();
      return NextResponse.json({ message: "Админ хэрэглэгчийг устгах боломжгүй" }, { status: 403 });
    }

    // Хэрэглэгч устгах
    await connection.execute("DELETE FROM users WHERE id = ?", [userId]);

    connection.release();

    return NextResponse.json({
      success: true,
      message: "Хэрэглэгч амжилттай устгагдлаа",
      data: (user as any)[0],
    });
  } catch (error) {
    console.error("User delete алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// GET - Тодорхой хэрэглэгч авах
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await pool.getConnection();
    const userId = parseInt(params.id);

    const [rows] = await connection.execute("SELECT * FROM users WHERE id = ?", [userId]);

    connection.release();

    if ((rows as any).length === 0) {
      return NextResponse.json({ message: "Хэрэглэгч олдсонгүй" }, { status: 404 });
    }

    const user = (rows as any)[0];

    // Нууц үгийг хасах
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("User get алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
