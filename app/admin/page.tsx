"use client";

import AdminSidebar from "./components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64 p-6">
        <div className="bg-white rounded-lg shadow p-6"></div>
      </div>
    </div>
  );
}
