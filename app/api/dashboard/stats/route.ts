import { NextRequest, NextResponse } from "next/server";

// Demo өгөгдөл - бодитоор өгөгдлийн сангаас авна
const getDashboardStats = () => {
  // Users статистик
  const users = [
    { id: 1, role: "admin", status: "active" },
    { id: 2, role: "editor", status: "active" },
    { id: 3, role: "user", status: "inactive" },
  ];

  // News статистик
  const news = [
    { id: 1, status: "published", viewCount: 1250, createdAt: "2024-10-05" },
    { id: 2, status: "published", viewCount: 890, createdAt: "2024-10-03" },
    { id: 3, status: "draft", viewCount: 0, createdAt: "2024-10-01" },
    { id: 4, status: "published", viewCount: 675, createdAt: "2024-09-28" },
  ];

  // Статистик тооцоолох
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const totalNews = news.length;
  const publishedNews = news.filter(n => n.status === "published").length;
  const draftNews = news.filter(n => n.status === "draft").length;
  const totalViews = news.reduce((sum, n) => sum + n.viewCount, 0);
  const totalComments = 89; // Demo тоо

  // Сүүлийн 7 өдрийн статистик
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split("T")[0],
      views: Math.floor(Math.random() * 200) + 50,
      posts: Math.floor(Math.random() * 3),
      users: Math.floor(Math.random() * 5),
    };
  }).reverse();

  return {
    overview: {
      totalUsers,
      activeUsers,
      totalNews,
      publishedNews,
      draftNews,
      totalViews,
      totalComments,
    },
    charts: {
      last7Days,
    },
    recentActivity: [
      {
        id: 1,
        type: "post",
        message: 'Шинэ нийтлэл "IMARC хурлын тайлан" нэмэгдлээ',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        user: "Админ",
      },
      {
        id: 2,
        type: "user",
        message: "Шинэ хэрэглэгч бүртгүүллээ: user@example.com",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        user: "Систем",
      },
      {
        id: 3,
        type: "comment",
        message: 'Шинэ сэтгэгдэл "Уул уурхайн технологи" нийтлэлд',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        user: "Хэрэглэгч",
      },
    ],
    topPosts: news
      .filter(n => n.status === "published")
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 5)
      .map(n => ({
        id: n.id,
        title:
          n.id === 1
            ? "IMARC хурлын тайлан"
            : n.id === 2
            ? "Халзан Бүрэгтэй төслийн шинэчлэл"
            : n.id === 4
            ? "Байгаль орчны хамгаалалын арга хэмжээ"
            : "Demo мэдээ",
        viewCount: n.viewCount,
        createdAt: n.createdAt,
      })),
  };
};

// GET - Dashboard статистик авах
export async function GET(request: NextRequest) {
  try {
    const stats = getDashboardStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Stats API алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
