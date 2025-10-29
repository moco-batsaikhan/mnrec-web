"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MediaEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [form, setForm] = useState({
    mn_title: "",
    en_title: "",
    url: "",
    type: "",
    status: "active"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/media/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
            console.log("data.data:", data.data);
          setForm(data.data);
        } else {
          setError(data.message || "Not found");
        }
      })
      .catch(() => setError("Failed to fetch media"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch(`/api/media/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      router.push("/admin/media");
    } else {
      setError(data.message || "Error");
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Edit Media</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="mn_title" value={form.mn_title} onChange={handleChange} placeholder="MN Title" className="w-full border px-3 py-2 rounded text-gray-700 placeholder-gray-400 font-semibold" required />
        <input name="en_title" value={form.en_title} onChange={handleChange} placeholder="EN Title" className="w-full border px-3 py-2 rounded text-gray-700 placeholder-gray-400 font-semibold" required />
        <input name="url" value={form.url} onChange={handleChange} placeholder="URL" className="w-full border px-3 py-2 rounded text-gray-700 placeholder-gray-400 font-semibold" required />
        <select name="type" value={form.type} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-800">
          <option value="vlog">Влог</option>
          <option value="broadcast">Нэврүүлэг</option>
          <option value="advertisement">Суртчилгаа</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-700 font-semibold">
          <option value="active" className="text-gray-700">Active</option>
          <option value="inactive" className="text-gray-700">Inactive</option>
        </select>
        {error && <div className="text-red-500 font-bold">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
      </form>
    </div>
  );
}
