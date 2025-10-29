import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";

async function selectOne() {
  const [rows] = await db.query("SELECT * FROM homeText WHERE id = ?", 1);
  const homeText = Array.isArray(rows) ? (rows[0] as any) : null;
  return homeText || null;
}

// GET /api/homeText/1 - findOne
export async function GET() {
  try {
    const homeText = await selectOne();
    if (!homeText) {
      return NextResponse.json({ message: "text олдсонгүй" }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      data: {
        id: homeText.id,
        mn_keyWord: homeText.mn_keyWord,
        en_keyWord: homeText.en_keyWord,
        mn_keyNote: homeText.mn_keyNote,
        en_keyNote: homeText.en_keyNote,
        mn_slogan_text: homeText.mn_slogan_text,
        en_slogan_text: homeText.en_slogan_text,
        createdAt: homeText.created_at,
        updatedAt: homeText.updated_at,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// PUT /api/homeText - update id=1
export async function PUT(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON" },
      { status: 400 }
    );
  }
  try {
    await db.query(
      "UPDATE homeText SET mn_keyWord = ?, en_keyWord = ?, mn_keyNote = ?, en_keyNote = ?, mn_slogan_text = ?, en_slogan_text = ?, status = ? WHERE id = 1",
      [
        body.mn_keyWord,
        body.en_keyWord,
        body.mn_keyNote,
        body.en_keyNote,
        body.mn_slogan_text,
        body.en_slogan_text,
        body.status || "active",
      ]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error updating" },
      { status: 500 }
    );
  }
}
