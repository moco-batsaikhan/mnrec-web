"use client";

import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import UsersList from "./components/UsersList";
import NewsList from "./components/NewsList";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => setActiveTab("stats")}
                className={`py-2 px-4 ${
                  activeTab === "stats"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Статистик
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-2 px-4 ${
                  activeTab === "users"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Хэрэглэгчид
              </button>
              <button
                onClick={() => setActiveTab("news")}
                className={`py-2 px-4 ${
                  activeTab === "news"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Мэдээ
              </button>
            </div>
          </div>

          {activeTab === "stats" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Нийт хэрэглэгч</h3>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Нийт мэдээ</h3>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Нийт хандалт</h3>
                <p className="text-3xl font-bold">0</p>
              </div>
            </div>
          )}

          {activeTab === "users" && <UsersList />}
          {activeTab === "news" && <NewsList />}
        </div>
      </div>
    </div>
  );
}
