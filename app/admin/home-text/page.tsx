"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeTextEditPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    en_keyWord: "",
    mn_keyWord: "",
    en_keyNote: "",
    mn_keyNote: "",
    en_slogan_text: "",
    mn_slogan_text: "",
    status: "active"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/homeText`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setForm(data.data);
        } else {
          setError(data.message || "Not found");
        }
      })
      .catch(() => setError("Failed to fetch homeText"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch(`/api/homeText`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      alert("Амжилттай хадгаллаа!");
      router.push("/admin/home-text");
    } else {
      setError(data.message || "Error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit HomeText</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1" htmlFor="en_keyWord">EN KeyWord</label>
            <input
              id="en_keyWord"
              name="en_keyWord"
              value={form.en_keyWord}
              onChange={handleChange}
              placeholder="EN KeyWord"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1" htmlFor="mn_keyWord">MN KeyWord</label>
            <input
              id="mn_keyWord"
              name="mn_keyWord"
              value={form.mn_keyWord}
              onChange={handleChange}
              placeholder="MN KeyWord"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1" htmlFor="en_keyNote">EN KeyNote</label>
            <textarea
              id="en_keyNote"
              name="en_keyNote"
              value={form.en_keyNote}
              onChange={handleChange}
              placeholder="EN KeyNote"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 min-h-[80px]"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1" htmlFor="mn_keyNote">MN KeyNote</label>
            <textarea
              id="mn_keyNote"
              name="mn_keyNote"
              value={form.mn_keyNote}
              onChange={handleChange}
              placeholder="MN KeyNote"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 min-h-[80px]"
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1" htmlFor="en_slogan_text">EN Slogan Text</label>
            <textarea
              id="en_slogan_text"
              name="en_slogan_text"
              value={form.en_slogan_text}
              onChange={handleChange}
              placeholder="EN Slogan Text"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 min-h-[80px]"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1" htmlFor="mn_slogan_text">MN Slogan Text</label>
            <textarea
              id="mn_slogan_text"
              name="mn_slogan_text"
              value={form.mn_slogan_text}
              onChange={handleChange}
              placeholder="MN Slogan Text"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 min-h-[80px]"
              required
            />
          </div>
        </div>
        {error && <div className="text-red-500 font-bold">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition-all duration-150" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
      </form>
    </div>
  );
}
