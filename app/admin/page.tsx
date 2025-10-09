"use client";

import AdminSidebar from "./components/AdminSidebar";

export default function AdminDashboard() {
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
              <p className="text-2xl font-bold text-gray-900">24</p>
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
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-lg">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Хэрэглэгчид</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-lg">👁️</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Нийт үзэлт</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Сүүлийн үйл ажиллагаа</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">10:30</span>
              <span className="text-sm">Шинэ мэдээ нэмэгдлээ</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">09:15</span>
              <span className="text-sm">Хэрэглэгч бүртгэгдлээ</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">08:45</span>
              <span className="text-sm">Мэдээ засварлагдлаа</span>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
}
