import { NextResponse } from "next/server";
import pool from "@/lib/database";

export async function GET() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM media WHERE status = 'active' ORDER BY id DESC"
  );
  connection.release();
  return NextResponse.json({ success: true, data: rows });
}
