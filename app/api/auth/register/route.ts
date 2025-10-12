import { NextResponse } from "next/server";
import { hashPassword } from "../../../../lib/auth";
import pool from "../../../../lib/database";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    const conn = await pool.getConnection();
    let insertId = null;
    try {
      const [result] = await conn.execute(
        "INSERT INTO users (email, name, password, role, status) VALUES (?, ?, ?, 'user', 'active')",
        [email, name, hashed]
      );
      insertId = (result as any).insertId;
    } finally {
      conn.release();
    }

    // create tokens and set cookies
    const { signAccessToken, createRefreshToken } = await import(
      "../../../../lib/auth"
    );
    const access = signAccessToken({ userId: insertId, role: "user" });
    const refresh = await createRefreshToken(insertId);
    const res = NextResponse.json(
      { ok: true, user: { id: insertId, email, name, role: "user" } },
      { status: 201 }
    );
    res.cookies.set("accessToken", access, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15,
    });
    res.cookies.set("refreshToken", refresh, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
