import { NextResponse } from "next/server";
import pool from "@/lib/database";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  let query = "SELECT * FROM media WHERE status = 'active'";
  let params: any[] = [];
  if (type) {
    query += " AND type = ?";
    // Map string type to number
    const typeMap: Record<string, number> = {
      vlog: 0,
      broadcast: 1,
      advertisement: 2,
    };
    params.push(typeMap[type] ?? type);
  }
  query += " ORDER BY id DESC";
  const connection = await pool.getConnection();
  const [rows] = await connection.execute(query, params);
  connection.release();
  return NextResponse.json({ success: true, data: rows });
}
