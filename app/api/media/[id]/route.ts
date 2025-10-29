import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";

// Helper: selectOne media by id
async function selectOne(id: string) {
  // MySQL2 returns [rows, fields], rows is array
  const [rows] = await db.query("SELECT * FROM media WHERE id = ?", [id]);
  const media = Array.isArray(rows) ? (rows[0] as any) : null;
  return media || null;
}

// GET /api/media/[id] - findOne
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const media = await selectOne(id);
    if (!media) {
      return NextResponse.json({ message: "Медиа олдсонгүй" }, { status: 404 });
    }
    // Normalize response to always return an object, not array
    return NextResponse.json({
      success: true,
      data: {
        id: media.id,
        mn_title: media.mn_title,
        en_title: media.en_title,
        url: media.url,
        type: media.type,
        status: media.status,
        createdAt: media.created_at,
        updatedAt: media.updated_at,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// PUT /api/media/[id] - update
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  try {
    await db.query(
      "UPDATE media SET mn_title = ?, en_title = ?, url = ?, type = ?, status = ? WHERE id = ?",
      [body.mn_title, body.en_title, body.url, body.type, body.status, id]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error updating" },
      { status: 500 }
    );
  }
}

// DELETE /api/media/[id] - delete
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await db.query("DELETE FROM media WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error deleting" },
      { status: 500 }
    );
  }
}
