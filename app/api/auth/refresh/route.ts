import { NextResponse } from "next/server";
import {
  findRefreshToken,
  revokeRefreshToken,
  signAccessToken,
} from "../../../../lib/auth";
import pool from "../../../../lib/database";

export async function POST(request: Request) {
  try {
    let { refreshToken } = await request.json().catch(() => ({}));
    if (!refreshToken) {
      // try cookie
      const cookieHeader = (request as any).headers?.get?.("cookie") || "";
      const match = cookieHeader.match(/refreshToken=([^;]+)/);
      refreshToken = match ? match[1] : null;
    }

    if (!refreshToken)
      return NextResponse.json(
        { error: "Missing refreshToken" },
        { status: 400 }
      );

    const row = await findRefreshToken(refreshToken);
    if (!row)
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );

    // Optionally rotate: revoke old and issue new
    await revokeRefreshToken(refreshToken);
    // fetch user role
    const conn = await pool.getConnection();
    let role = "user";
    try {
      const [urows] = await conn.execute(
        "SELECT role FROM users WHERE id = ?",
        [row.user_id]
      );
      role = (urows as any)[0]?.role ?? "user";
    } finally {
      conn.release();
    }

    // rotate: revoke old and issue new
    await revokeRefreshToken(refreshToken);
    const newAccess = signAccessToken({ userId: row.user_id, role });
    const { createRefreshToken } = await import("../../../../lib/auth");
    const newRefresh = await createRefreshToken(row.user_id);

    const res = NextResponse.json({ ok: true });
    res.cookies.set("accessToken", newAccess, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15,
    });
    res.cookies.set("refreshToken", newRefresh, {
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
