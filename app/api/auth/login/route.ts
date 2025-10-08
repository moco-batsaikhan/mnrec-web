import { NextResponse } from "next/server";
import {
  comparePassword,
  signAccessToken,
  createRefreshToken,
  verifyAccessToken,
} from "../../../../lib/auth";
import pool from "../../../../lib/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.execute(
        "SELECT id, password, role, name, email FROM users WHERE email = ?",
        [email]
      );
      const user = (rows as any)[0];
      if (!user)
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );

      const ok = await comparePassword(password, user.password);
      if (!ok)
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );

      const access = signAccessToken({ userId: user.id, role: user.role });
      const refresh = await createRefreshToken(user.id);

      const res = NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
      // Set cookies (httpOnly)
      res.cookies.set("accessToken", access, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 15,
      }); // 15 minutes
      res.cookies.set("refreshToken", refresh, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }); // 30 days
      return res;
    } finally {
      conn.release();
    }
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const auth = request.headers.get("authorization") || "";
    if (!auth.startsWith("Bearer "))
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    const token = auth.substring(7);
    try {
      const payload = verifyAccessToken(token) as any;
      return NextResponse.json({ ok: true, payload });
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
