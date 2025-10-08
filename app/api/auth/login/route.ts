import { NextRequest, NextResponse } from "next/server";

// Demo хэрэглэгчийн мэдээлэл
const DEMO_USERS = [
  {
    id: 1,
    email: "admin@mnrec.mn",
    password: "password123", // Бодитоор bcrypt ашиглах хэрэгтэй
    name: "Админ",
    role: "admin",
  },
  {
    id: 2,
    email: "editor@mnrec.mn",
    password: "editor123",
    name: "Редактор",
    role: "editor",
  },
];

// JWT токен үүсгэх (энгийн demo, бодитоор JWT library ашиглах хэрэгтэй)
function generateToken(user: any) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 цаг
  };

  // Энгийн base64 encoding (бодитоор JWT ашиглах хэрэгтэй)
  return btoa(JSON.stringify(payload));
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Өгөгдөл шалгах
    if (!email || !password) {
      return NextResponse.json({ message: "И-мэйл болон нууц үг шаардлагатай" }, { status: 400 });
    }

    // Хэрэглэгч олох
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ message: "И-мэйл эсвэл нууц үг буруу байна" }, { status: 401 });
    }

    // Токен үүсгэх
    const token = generateToken(user);

    // Амжилттай хариу
    return NextResponse.json({
      success: true,
      message: "Амжилттай нэвтэрлээ",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login API алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}

// GET method - токен шалгах
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Токен байхгүй" }, { status: 401 });
    }

    const token = authHeader.substring(7);

    try {
      // Токен decode хийх
      const payload = JSON.parse(atob(token));

      // Токеный хугацаа шалгах
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json({ message: "Токеның хугацаа дууссан" }, { status: 401 });
      }

      // Хэрэглэгч олох
      const user = DEMO_USERS.find(u => u.id === payload.id);

      if (!user) {
        return NextResponse.json({ message: "Хэрэглэгч олдсонгүй" }, { status: 401 });
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      return NextResponse.json({ message: "Буруу токен" }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth check алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
