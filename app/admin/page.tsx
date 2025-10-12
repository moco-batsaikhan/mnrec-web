"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSidebar";

interface DashboardStats {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalNews: number;
    publishedNews: number;
    draftNews: number;
  };
  recentNews: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      if (response.ok) {
        const result = await response.json();
        setStats(result.data);
      } else {
        setError("Статистик ачаалахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Stats fetch error:", error);
      setError("Серверт холбогдох үед алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Хянах самбар</h1>
        <p className="text-gray-600">MNREC удирдлагын системийн нүүр хуудас</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Нийт мэдээ</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.overview.totalNews || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Нийтлэгдсэн</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.overview.publishedNews || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-lg">�</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ноорог</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.overview.draftNews || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-lg">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Хэрэглэгчид</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.overview.totalUsers || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Шуурхай холбоосууд</h3>
          <div className="space-y-2">
            <a
              href="/admin/news/create"
              className="block p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              ➕ Шинэ мэдээ нэмэх
            </a>
            <a
              href="/admin/news"
              className="block p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              📰 Мэдээ удирдах
            </a>
            <a
              href="/admin/users"
              className="block p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              👥 Хэрэглэгчид
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Сүүлийн мэдээнүүд</h3>
          {stats && stats.recentNews && stats.recentNews.length > 0 ? (
            <div className="space-y-3">
              {stats.recentNews.map((news: any) => (
                <div key={news.id} className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm font-medium text-gray-900">{news.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(news.created_at).toLocaleDateString("mn-MN")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Мэдээ байхгүй байна</p>
          )}
        </div>
      </div>
    </div>
  );
}
