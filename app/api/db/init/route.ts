import { NextResponse } from "next/server";
import { testConnection, initDatabase } from "../../../../lib/database";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "test";

  try {
    if (action === "test") {
      const ok = await testConnection();
      return NextResponse.json({ ok });
    }

    if (action === "init") {
      const ok = await initDatabase();
      return NextResponse.json({ ok });
    }

    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
