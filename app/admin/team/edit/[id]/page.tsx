"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

interface TeamEditPageProps {
  params: { id: string };
}

const TipTapEditor = dynamic(() => import("../../../components/TipTapEditor"), {
  ssr: false,
  loading: () => <div className="p-4 text-center text-gray-600">Editor ачааллаж байна...</div>
});

import { use as usePromise } from "react";

export default function TeamEditPage({ params }: TeamEditPageProps) {
  const router = useRouter();
  const resolvedParams = usePromise(params);
  const id = resolvedParams.id;
  const [form, setForm] = useState({
    en_name: "",
    mn_name: "",
    en_position: "",
    mn_position: "",
    en_description: "",
    mn_description: "",
    image_url: ""
  });
  const [enDesc, setEnDesc] = useState("");
  const [mnDesc, setMnDesc] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/team/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setForm({
            en_name: data.data.en_name || "",
            mn_name: data.data.mn_name || "",
            en_position: data.data.en_position || "",
            mn_position: data.data.mn_position || "",
            en_description: data.data.en_description || "",
            mn_description: data.data.mn_description || "",
            image_url: data.data.image_url || ""
          });
          setEnDesc(data.data.en_description || "");
          setMnDesc(data.data.mn_description || "");
        } else {
          setError(data.message || "Not found");
        }
      })
      .catch(() => setError("Failed to fetch team member"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Зөвхөн зураг файл ашиглана уу (JPG, PNG, WebP, GIF)");
      return;
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Зургийн хэмжээ 10MB-аас хэтэрч болохгүй");
      return;
    }
    setError("");
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("/api/upload/team-image", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success && result.url) {
        setForm({ ...form, image_url: result.url });
        setIsDirty(true);
      } else {
        setError(result.message || "Image upload failed");
      }
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!form.image_url) {
      setError("Зураг ачаалж дуусахыг хүлээнэ үү");
      setLoading(false);
      return;
    }
    const payload = {
      ...form,
      en_description: enDesc,
      mn_description: mnDesc
    };
    const res = await fetch(`/api/team/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      router.push("/admin/team");
    } else {
      setError(data.message || "Error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Team member ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (error && !form.en_name && !form.mn_name) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Буцах
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-8 drop-shadow">Edit Team Member</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Name (EN)</label>
            <input
              name="en_name"
              value={form.en_name}
              onChange={handleChange}
              placeholder="Name in English"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-400 shadow-sm text-blue-900 font-semibold text-lg placeholder-blue-400 transition-all duration-150"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Name (MN)</label>
            <input
              name="mn_name"
              value={form.mn_name}
              onChange={handleChange}
              placeholder="Name in Mongolian"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-400 shadow-sm text-blue-900 font-semibold text-lg placeholder-blue-400 transition-all duration-150"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Position (EN)</label>
            <input
              name="en_position"
              value={form.en_position}
              onChange={handleChange}
              placeholder="Position in English"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-400 shadow-sm text-blue-900 font-semibold text-lg placeholder-blue-400 transition-all duration-150"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Position (MN)</label>
            <input
              name="mn_position"
              value={form.mn_position}
              onChange={handleChange}
              placeholder="Position in Mongolian"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-400 shadow-sm text-blue-900 font-semibold text-lg placeholder-blue-400 transition-all duration-150"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Description (EN)</label>
            <div className="[&_.tiptap-editor__content_.tiptap-placeholder]:text-blue-500 [&_.tiptap-editor__content_.tiptap-placeholder]:font-semibold">
              <TipTapEditor
                value={enDesc}
                onChange={setEnDesc}
                placeholder="Description in English"
                readOnly={false}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Description (MN)</label>
            <div className="[&_.tiptap-editor__content_.tiptap-placeholder]:text-blue-500 [&_.tiptap-editor__content_.tiptap-placeholder]:font-semibold">
              <TipTapEditor
                value={mnDesc}
                onChange={setMnDesc}
                placeholder="Description in Mongolian"
                readOnly={false}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-lg font-bold text-blue-800">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow-sm text-blue-900 bg-white transition-all duration-150"
          />
          <p className="text-xs text-gray-500 mt-1">Max size: 10MB. Allowed types: JPG, PNG, WebP, GIF.</p>
          {form.image_url && <img src={form.image_url} alt="Preview" className="w-32 h-32 object-cover rounded" />}
        </div>
        {error && <div className="text-red-500 font-bold text-lg">{error}</div>}
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-pulse">Saving...</span>
          ) : uploadingImage ? (
            <span className="animate-pulse">Uploading image...</span>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
}
