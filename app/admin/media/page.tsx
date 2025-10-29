"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MediaListPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMedia(data.data);
        else setError(data.message || "Error");
      })
      .catch(() => setError("Failed to fetch media"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Media List</h1>
            </div>
            <button
              onClick={() => router.push("/admin/media/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Нэмэх
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <th className="py-3 px-4 font-semibold text-lg">ID</th>
                <th className="py-3 px-4 font-semibold text-lg">MN Title</th>
                <th className="py-3 px-4 font-semibold text-lg">EN Title</th>
                <th className="py-3 px-4 font-semibold text-lg">URL</th>
                <th className="py-3 px-4 font-semibold text-lg">Type</th>
                <th className="py-3 px-4 font-semibold text-lg">Status</th>
                <th className="py-3 px-4 font-semibold text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {media.map((item: any, idx: number) => (
                <tr
                  key={item.id}
                  className={
                    idx % 2 === 0
                      ? "bg-white hover:bg-blue-50"
                      : "bg-blue-50 hover:bg-blue-100"
                  }
                >
                  <td className="py-2 px-4 text-blue-700 font-bold">{item.id}</td>
                  <td className="py-2 px-4 text-blue-800 font-semibold">{item.mn_title}</td>
                  <td className="py-2 px-4 text-blue-800 font-semibold">{item.en_title}</td>
                  <td className="py-2 px-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 font-medium"
                    >
                      {item.url}
                    </a>
                  </td>
                  <td className="py-2 px-4 text-purple-700 font-semibold">{item.type}</td>
                  <td className={`py-2 px-4 font-semibold ${item.status === "active" ? "text-green-600" : "text-red-500"}`}>{item.status}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => router.push(`/admin/media/edit/${item.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
