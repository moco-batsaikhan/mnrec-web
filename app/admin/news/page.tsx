"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Inline styles for line clamping
const lineClampStyles = `
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

interface News {
  id: number;
  title: string;
  content: string;
  summary: string;
  slug: string;
  status: "draft" | "published" | "archived";
  featuredImage: string | null;
  category: string;
  tags: string[];
  authorId: number;
  authorName: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

interface Pagination {
  current: number;
  total: number;
  count: number;
  perPage: number;
}

interface Stats {
  total: number;
  published: number;
  draft: number;
  archived: number;
}

export default function AdminNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, draft: 0, archived: 0 });
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    total: 1,
    count: 0,
    perPage: 10,
  });

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [authorFilter, setAuthorFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const router = useRouter();

  const categories = [
    "Мэдээ",
    "Хурал",
    "Төсөл",
    "Судалгаа",
    "Байгаль орчин",
    "Технологи",
    "Хөрөнгө оруулалт",
  ];

  useEffect(() => {
    fetchNews();
  }, [
    pagination.current,
    search,
    statusFilter,
    categoryFilter,
    sortBy,
    sortOrder,
    authorFilter,
    dateRange,
  ]);

  const fetchNews = async () => {
    try {
      const params = new URLSearchParams({
        page: pagination.current.toString(),
        limit: pagination.perPage.toString(),
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...(authorFilter && { author: authorFilter }),
        ...(dateRange.start && { startDate: dateRange.start }),
        ...(dateRange.end && { endDate: dateRange.end }),
      });

      const response = await fetch(`/api/news?${params}`);
      if (response.ok) {
        const result = await response.json();
        setNews(result.data);
        setPagination(result.pagination);
        setStats(result.stats);
      } else {
        console.error("News fetch failed:", await response.text());
      }
    } catch (error) {
      console.error("News fetch алдаа:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Энэ мэдээг устгахыг хүсэж байна уу?")) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchNews(); // Refresh list
      } else {
        alert("Мэдээ устгахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Delete алдаа:", error);
      alert("Серверт холбогдох үед алдаа гарлаа");
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: "bg-yellow-100 text-yellow-800",
      published: "bg-green-100 text-green-800",
      archived: "bg-gray-100 text-gray-800",
    };

    const labels = {
      draft: "Ноорог",
      published: "Нийтлэгдсэн",
      archived: "Архивлагдсан",
    };

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          badges[status as keyof typeof badges]
        }`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchNews();
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handlePerPageChange = (perPage: number) => {
    setPagination(prev => ({ ...prev, perPage, current: 1 }));
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCategoryFilter("");
    setAuthorFilter("");
    setDateRange({ start: "", end: "" });
    setSortBy("createdAt");
    setSortOrder("desc");
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return "↕️";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Мэдээлэл ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: lineClampStyles }} />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Мэдээ удирдах</h1>
              <p className="text-gray-600">Веб сайтын мэдээ, нийтлэлүүдийг удирдах</p>
            </div>
            <button
              onClick={() => router.push("/admin/news/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Шинэ мэдээ нэмэх
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">📰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Нийт мэдээ</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">📝</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Ноорог</p>
                <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">📦</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Архивлагдсан</p>
                <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Хайлт ба шүүлтүүр</h3>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Бүгдийг цэвэрлэх
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-6">
            {/* Main Search and Actions */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Хайлт</label>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Гарчиг, агуулга, товч тайлбараар хайх..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хуудас тутамд
                </label>
                <select
                  value={pagination.perPage}
                  onChange={e => handlePerPageChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Эрэмбэлэх</label>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={e => {
                    const [field, order] = e.target.value.split("-");
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="createdAt-desc">Шинэээс хуучин руу</option>
                  <option value="createdAt-asc">Хуучнаас шинэ рүү</option>
                  <option value="title-asc">Гарчиг А-Я</option>
                  <option value="title-desc">Гарчиг Я-А</option>
                  <option value="viewCount-desc">Үзэлт ихээс бага руу</option>
                  <option value="viewCount-asc">Үзэлт багаас их рүү</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Хайх
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Төлөв</label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Бүгд</option>
                  <option value="draft">Ноорог</option>
                  <option value="published">Нийтлэгдсэн</option>
                  <option value="archived">Архивлагдсан</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ангилал</label>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Бүгд</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Эхлэх огноо</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Дуусах огноо</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </form>
        </div>

        {/* News List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Мэдээний жагсаалт ({pagination.count})
            </h3>
          </div>

          {news.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Мэдээ</span>
                        <span className="text-gray-400">{getSortIcon("title")}</span>
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("category")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Ангилал</span>
                        <span className="text-gray-400">{getSortIcon("category")}</span>
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Төлөв</span>
                        <span className="text-gray-400">{getSortIcon("status")}</span>
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("viewCount")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Үзэлт</span>
                        <span className="text-gray-400">{getSortIcon("viewCount")}</span>
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Огноо</span>
                        <span className="text-gray-400">{getSortIcon("createdAt")}</span>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Үйлдэл
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {news.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          {item.featuredImage ? (
                            <div className="flex-shrink-0 mr-4">
                              <img
                                src={item.featuredImage}
                                alt=""
                                className="w-16 h-12 rounded-lg object-cover border border-gray-200"
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 mr-4">
                              <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400 text-xs">📰</span>
                              </div>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                              {item.summary || "Товч тайлбар байхгүй"}
                            </div>
                            <div className="flex items-center mt-2 text-xs text-gray-400 space-x-4">
                              <span>✍️ {item.authorName}</span>
                              {item.tags && item.tags.length > 0 && (
                                <span>
                                  🏷️ {item.tags.slice(0, 2).join(", ")}
                                  {item.tags.length > 2 ? "..." : ""}
                                </span>
                              )}
                              <span>#{item.id}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {item.viewCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">үзэлт</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(item.createdAt).toLocaleDateString("mn-MN")}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleTimeString("mn-MN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => router.push(`/admin/news/edit/${item.id}`)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            Засах
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            Устгах
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">📰</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Мэдээ олдсонгүй</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                {search || statusFilter || categoryFilter || dateRange.start
                  ? "Таны хайлтад тохирох мэдээ олдсонгүй. Өөр хайлтын утга оруулж үзнэ үү."
                  : "Та анхны мэдээгээ нэмж эхлээрэй."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {(search || statusFilter || categoryFilter || dateRange.start) && (
                  <button
                    onClick={clearFilters}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Шүүлтүүрийг цэвэрлэх
                  </button>
                )}
                <button
                  onClick={() => router.push("/admin/news/create")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  + Шинэ мэдээ нэмэх
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Pagination */}
          {pagination.total > 1 && (
            <div className="bg-white px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{pagination.count}</span> мэдээнээс{" "}
                  <span className="font-medium">
                    {(pagination.current - 1) * pagination.perPage + 1}
                  </span>
                  -
                  <span className="font-medium">
                    {Math.min(pagination.current * pagination.perPage, pagination.count)}
                  </span>{" "}
                  харуулж байна
                </div>

                <div className="flex items-center space-x-2">
                  {/* First page */}
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={pagination.current === 1}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    ««
                  </button>

                  {/* Previous page */}
                  <button
                    onClick={() => handlePageChange(pagination.current - 1)}
                    disabled={pagination.current === 1}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    « Өмнөх
                  </button>

                  {/* Page numbers */}
                  {(() => {
                    const maxVisible = 5;
                    const start = Math.max(1, pagination.current - Math.floor(maxVisible / 2));
                    const end = Math.min(pagination.total, start + maxVisible - 1);
                    const adjustedStart = Math.max(1, end - maxVisible + 1);

                    return Array.from({ length: end - adjustedStart + 1 }, (_, i) => {
                      const page = adjustedStart + i;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                            page === pagination.current
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    });
                  })()}

                  {/* Next page */}
                  <button
                    onClick={() => handlePageChange(pagination.current + 1)}
                    disabled={pagination.current === pagination.total}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Дараах »
                  </button>

                  {/* Last page */}
                  <button
                    onClick={() => handlePageChange(pagination.total)}
                    disabled={pagination.current === pagination.total}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    »»
                  </button>
                </div>
              </div>

              {/* Quick jump to page */}
              <div className="flex items-center justify-center mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500">Хуудас руу үсрэх:</span>
                  <input
                    type="number"
                    min={1}
                    max={pagination.total}
                    placeholder={pagination.current.toString()}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        const page = parseInt(e.currentTarget.value);
                        if (page >= 1 && page <= pagination.total) {
                          handlePageChange(page);
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />
                  <span className="text-gray-500">/ {pagination.total}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
