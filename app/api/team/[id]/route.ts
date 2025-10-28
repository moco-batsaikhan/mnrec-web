import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";

// GET: Get a single team member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute("SELECT * FROM team WHERE id = ?", [
    params.id,
  ]);
  connection.release();
  const teamRows = rows as any[];
  if (teamRows.length === 0) {
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: teamRows[0] });
}

// PUT: Edit a team member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    "UPDATE team SET en_name = ?, mn_name = ?, en_position = ?, mn_position = ?, en_description = ?, mn_description = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [
      en_name,
      mn_name,
      en_position,
      mn_position,
      en_description,
      mn_description,
      image_url || null,
      params.id,
    ]
  );
  connection.release();
  return NextResponse.json({ success: true, message: "Team member updated" });
}

// DELETE: Remove a team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  await connection.execute("DELETE FROM team WHERE id = ?", [params.id]);
  connection.release();
  return NextResponse.json({ success: true, message: "Team member deleted" });
}
