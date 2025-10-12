"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

interface PaginationInfo {
  current: number;
  total: number;
  count: number;
  perPage: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pagination, setPagination] = useState<PaginationInfo>({
    current: 1,
    total: 1,
    count: 0,
    perPage: 10,
  });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  
  useEffect(() => {
    fetchUsers();
  }, [pagination.current, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.current.toString(),
        limit: pagination.perPage.toString(),
      });

      if (search) params.append("search", search);
      if (roleFilter) params.append("role", roleFilter);
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(`/api/users?${params.toString()}`);
      const result = await response.json();

      console.log("Fetch users result:", result);

      if (response.ok) {
        console.log("Users fetched successfully:", result.data);
        setUsers(result.data);
        setPagination(result.pagination);
      } else {
        setError(result.message || "Хэрэглэгчдийг татахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Users fetch error:", error);
      setError("Серверт холбогдох үед алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchUsers();
  };

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Хэрэглэгч амжилттай устгагдлаа");
        setDeleteConfirm(null);
        fetchUsers();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        // Handle specific error cases
        if (response.status === 403) {
          // Permission denied - show once and clear
          setError(result.message || "Та энэ үйлдлийг хийх эрхгүй байна");
          setDeleteConfirm(null);
          setTimeout(() => setError(""), 3000);
        } else {
          setError(result.message || "Хэрэглэгч устгахад алдаа гарлаа");
          setTimeout(() => setError(""), 3000);
        }
      }
    } catch (error) {
      console.error("User delete error:", error);
      setError("Серверт холбогдох үед алдаа гарлаа");
      setTimeout(() => setError(""), 3000);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "superAdmin":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "editor":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "superAdmin":
        return "Супер Админ";
      case "admin":
        return "Админ";
      case "editor":
        return "Редактор";
      default:
        return role;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Идэвхтэй";
      case "inactive":
        return "Идэвхгүй";
      case "suspended":
        return "Түр хаасан";
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Хэрэглэгчийн удирдлага</h1>
            <p className="text-gray-600 mt-1">Системийн хэрэглэгчдийг удирдах</p>
          </div>
          <Link
            href="/admin/users/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            + Шинэ хэрэглэгч
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Нэр эсвэл и-мэйлээр хайх..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400  text-gray-400"
              />
            </div>
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
              >
                <option value="">Бүх эрх</option>
                <option value="superAdmin">Супер Админ</option>
                <option value="admin">Админ</option>
                <option value="editor">Редактор</option>
              </select>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
              >
                <option value="">Бүх төлөв</option>
                <option value="active">Идэвхтэй</option>
                <option value="inactive">Идэвхгүй</option>
                <option value="suspended">Түр хаасан</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Хайх
            </button>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setRoleFilter("");
                setStatusFilter("");
                setPagination(prev => ({ ...prev, current: 1 }));
                setTimeout(() => fetchUsers(), 100);
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Цэвэрлэх
            </button>
          </div>
        </form>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">❌</span>
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-md bg-green-50 border border-green-200 p-4">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            <div className="text-sm text-green-700">{success}</div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Хэрэглэгчдийг ачааллаж байна...</p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Хэрэглэгч олдсонгүй</p>
            <p className="text-gray-400 text-sm mt-2">Шинэ хэрэглэгч нэмнэ үү</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Хэрэглэгч
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Эрх
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Төлөв
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Үүсгэсэн
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сүүлд нэвтэрсэн
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Үйлдэл
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                            user.role
                          )}`}
                        >
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                            user.status
                          )}`}
                        >
                          {getStatusLabel(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString("mn-MN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.last_login
                          ? new Date(user.last_login).toLocaleDateString("mn-MN")
                          : "Хэзээ ч үгүй"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/users/edit/${user.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Засах
                          </Link>
                          {deleteConfirm === user.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-600 hover:text-red-900 font-bold"
                              >
                                Тийм
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Үгүй
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Устгах
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.total > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, current: prev.current - 1 }))
                    }
                    disabled={pagination.current === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Өмнөх
                  </button>
                  <button
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, current: prev.current + 1 }))
                    }
                    disabled={pagination.current === pagination.total}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Дараах
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Нийт <span className="font-medium">{pagination.count}</span> хэрэглэгчээс{" "}
                      <span className="font-medium">
                        {(pagination.current - 1) * pagination.perPage + 1}
                      </span>{" "}
                      -{" "}
                      <span className="font-medium">
                        {Math.min(pagination.current * pagination.perPage, pagination.count)}
                      </span>{" "}
                      харуулж байна
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() =>
                          setPagination((prev) => ({ ...prev, current: prev.current - 1 }))
                        }
                        disabled={pagination.current === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Өмнөх
                      </button>
                      {Array.from({ length: pagination.total }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setPagination((prev) => ({ ...prev, current: page }))}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === pagination.current
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setPagination((prev) => ({ ...prev, current: prev.current + 1 }))
                        }
                        disabled={pagination.current === pagination.total}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Дараах
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
