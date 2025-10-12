import { NextResponse } from "next/server";
import pool from "@/lib/database";
import { RowDataPacket } from "mysql2";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let connection;
  try {
    const { id } = await params;
    connection = await pool.getConnection();

    const [messages] = await connection.query<RowDataPacket[]>(
      `SELECT id, first_name, last_name, email, phone, subject, message, status, created_at, updated_at
       FROM contact_messages 
       WHERE id = ?`,
      [id]
    );

    if (messages.length === 0) {
      return NextResponse.json(
        { success: false, message: "Мэдээлэл олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: messages[0],
    });
  } catch (error) {
    console.error("Get contact message error:", error);
    return NextResponse.json(
      { success: false, message: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let connection;
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ["new", "read", "replied", "archived"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Статус буруу байна" },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();

    // Update status
    const [result] = await connection.query(
      `UPDATE contact_messages 
       SET status = ?, updated_at = NOW() 
       WHERE id = ?`,
      [status, id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Мэдээлэл олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Статус амжилттай шинэчлэгдлээ",
    });
  } catch (error) {
    console.error("Update contact message error:", error);
    return NextResponse.json(
      { success: false, message: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let connection;
  try {
    const { id } = await params;
    connection = await pool.getConnection();

    const [result] = await connection.query(
      `DELETE FROM contact_messages WHERE id = ?`,
      [id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Мэдээлэл олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Мэдээлэл амжилттай устгагдлаа",
    });
  } catch (error) {
    console.error("Delete contact message error:", error);
    return NextResponse.json(
      { success: false, message: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
