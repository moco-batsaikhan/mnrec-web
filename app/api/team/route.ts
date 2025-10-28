import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";

// GET: List all team members
export async function GET() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute("SELECT * FROM team ORDER BY id ASC");
  connection.release();
  return NextResponse.json({ success: true, data: rows });
}

// POST: Create a new team member
export async function POST(request: NextRequest) {
  const {
    en_name,
    mn_name,
    en_position,
    mn_position,
    en_description,
    mn_description,
    image_url,
  } = await request.json();
  if (
    !en_name ||
    !mn_name ||
    !en_position ||
    !mn_position ||
    !en_description ||
    !mn_description
  ) {
    return NextResponse.json(
      { success: false, message: "All fields required" },
      { status: 400 }
    );
  }
  const connection = await pool.getConnection();
  await connection.execute(
    "INSERT INTO team (en_name, mn_name, en_position, mn_position, en_description, mn_description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      en_name,
      mn_name,
      en_position,
      mn_position,
      en_description,
      mn_description,
      image_url || null,
    ]
  );
  connection.release();
  return NextResponse.json({ success: true, message: "Team member created" });
}
