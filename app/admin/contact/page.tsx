"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ContactMessage {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
}

export default function ContactMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [page, statusFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });
      if (statusFilter) {
        params.append("status", statusFilter);
      }

      const response = await fetch(`/api/contact?${params}`);
      if (response.ok) {
        const result = await response.json();
        setMessages(result.data);
        setTotalPages(result.pagination.totalPages);
      } else {
        setError("Мэдээлэл ачаалахад алдаа гарлаа");
      }
    } catch (err) {
      console.error("Fetch messages error:", err);
      setError("Серверт холбогдох үед алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      new: "bg-blue-100 text-blue-800",
      read: "bg-gray-100 text-gray-800",
      replied: "bg-green-100 text-green-800",
      archived: "bg-yellow-100 text-yellow-800",
    };
    const labels = {
      new: "Шинэ",
      read: "Уншсан",
      replied: "Хариулсан",
      archived: "Архивласан",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const openMessageDetail = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  const updateMessageStatus = async (messageId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh messages
        fetchMessages();
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage({ ...selectedMessage, status: newStatus as any });
        }
      }
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Холбоо барих мэдээлэл</h1>
        <p className="text-gray-600">Вэбсайтаас ирсэн мэдээллүүд</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded-lg border-gray-500 text-gray-500 "
        >
          <option value="">Бүх статус</option>
          <option value="new">Шинэ</option>
          <option value="read">Уншсан</option>
          <option value="replied">Хариулсан</option>
          <option value="archived">Архивласан</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Нэр
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                И-мэйл
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Утас
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Сэдэв
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Огноо
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Үйлдэл
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {msg.first_name} {msg.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {msg.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {msg.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{msg.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(msg.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(msg.created_at).toLocaleDateString("mn-MN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openMessageDetail(msg)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Дэлгэрэнгүй
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Мэдээлэл байхгүй байна
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Өмнөх
          </button>
          <span className="px-4 py-2">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Дараах
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Мэдээллийн дэлгэрэнгүй</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Овог</label>
                  <p className="text-lg text-gray-900">{selectedMessage.last_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Нэр</label>
                  <p className="text-lg text-gray-900">{selectedMessage.first_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">И-мэйл</label>
                  <p className="text-lg text-gray-900">
                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                      {selectedMessage.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Утас</label>
                  <p className="text-lg text-gray-900">
                    <a href={`tel:${selectedMessage.phone}`} className="text-blue-600 hover:underline">
                      {selectedMessage.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-500">Сэдэв</label>
                <p className="text-lg text-gray-900 font-semibold">{selectedMessage.subject}</p>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-500">Мессеж</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Статус</label>
                  <div className="mt-2">{getStatusBadge(selectedMessage.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Огноо</label>
                  <p className="text-lg text-gray-900">
                    {new Date(selectedMessage.created_at).toLocaleString("mn-MN")}
                  </p>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="border-t border-gray-200 pt-6">
                <label className="text-sm font-medium text-gray-700 block mb-3">
                  Статус шинэчлэх:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, "read")}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    📖 Уншсан
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, "replied")}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    ✅ Хариулсан
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, "archived")}
                    className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                  >
                    📦 Архивлах
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, "new")}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    🆕 Шинэ
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
