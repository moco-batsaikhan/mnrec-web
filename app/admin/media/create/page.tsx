"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function MediaCreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    mn_title: "",
    en_title: "",
    url: "",
    type: "vlog",
    status: "active"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      router.push("/admin/media");
    } else {
      setError(data.message || "Error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Media</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="mn_title" value={form.mn_title} onChange={handleChange} placeholder="MN Title" className="w-full border px-3 py-2 rounded text-gray-800" required />
        <input name="en_title" value={form.en_title} onChange={handleChange} placeholder="EN Title" className="w-full border px-3 py-2 rounded text-gray-800" required />
        <input name="url" value={form.url} onChange={handleChange} placeholder="URL" className="w-full border px-3 py-2 rounded text-gray-800" required />
        <select name="type" value={form.type} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-800">
          <option value="vlog">Влог</option>
          <option value="broadcast">Нэврүүлэг</option>
          <option value="advertisement">Суртчилгаа</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-800">
          <option value="active">Идэвхтэй</option>
          <option value="inactive">Идэвхгүй</option>
        </select>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
      </form>
    </div>
  );
}
