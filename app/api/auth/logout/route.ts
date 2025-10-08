import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Logout хийх - client талаас token устгах хэрэгтэй

    return NextResponse.json({
      success: true,
      message: "Амжилттай гарлаа",
    });
  } catch (error) {
    console.error("Logout API алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
