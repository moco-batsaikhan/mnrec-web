import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";

// GET: List all media
export async function GET() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM media ORDER BY id DESC"
  );
  connection.release();
  return NextResponse.json({ success: true, data: rows });
}

// POST: Create new media
export async function POST(request: NextRequest) {
  const { mn_title, en_title, url, type, status } = await request.json();
  if (!mn_title || !en_title || !url || !type || !status) {
    return NextResponse.json(
      { success: false, message: "All fields required" },
      { status: 400 }
    );
  }
  const connection = await pool.getConnection();
  await connection.execute(
    "INSERT INTO media (mn_title, en_title, url, type, status) VALUES (?, ?, ?, ?, ?)",
    [mn_title, en_title, url, type, status]
  );
  connection.release();
  return NextResponse.json({ success: true, message: "Media created" });
}
