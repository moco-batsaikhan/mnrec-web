import { NextResponse } from "next/server";
import { revokeRefreshToken } from "../../../../lib/auth";

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();
    if (refreshToken) await revokeRefreshToken(refreshToken);
    const res = NextResponse.json({ ok: true });
    // clear cookies if set
    res.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
    res.cookies.set("refreshToken", "", { path: "/", maxAge: 0 });
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
