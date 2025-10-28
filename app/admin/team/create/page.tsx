"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import TipTapEditor to avoid SSR issues (match news/create usage)
const TipTapEditor = dynamic(() => import("../../components/TipTapEditor"), {
  ssr: false,
  loading: () => <div className="p-4 text-center text-gray-600">Editor ачааллаж байна...</div>,
});
import { useRouter } from "next/navigation";

export default function TeamCreatePage() {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    // Validate file type
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
    // Upload to API
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
    const res = await fetch("/api/team", {
      method: "POST",
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

  return (
    <div className="max-w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-10 text-center drop-shadow-lg">Add Team Member</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-lg font-bold text-blue-800">Name (EN)</label>
            <input name="en_name" value={form.en_name} onChange={handleChange} placeholder="Name in English" className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg font-semibold text-sm focus:border-blue-700 focus:outline-none placeholder:text-gray-400 text-gray-500" required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Name (MN)</label>
            <input name="mn_name" value={form.mn_name} onChange={handleChange} placeholder="Name in Mongolian" className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg font-semibold text-sm focus:border-blue-700 focus:outline-none placeholder:text-gray-400 text-gray-500" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Position (EN)</label>
            <input name="en_position" value={form.en_position} onChange={handleChange} placeholder="Position in English" className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg font-semibold text-sm focus:border-blue-700 focus:outline-none placeholder:text-gray-400 text-gray-500" required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-800">Position (MN)</label>
            <input name="mn_position" value={form.mn_position} onChange={handleChange} placeholder="Position in Mongolian" className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg font-semibold text-sm focus:border-blue-700 focus:outline-none placeholder:text-gray-400 text-gray-500" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-lg font-bold text-blue-800">Description (EN)</label>
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
            <label className="block text-lg font-bold text-blue-800">Description (MN)</label>
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
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg text-gray-500" />
          <p className="text-xs text-gray-500 mt-1">Max size: 10MB. Allowed types: JPG, PNG, WebP, GIF.</p>
          {form.image_url && (
            <div className="mt-4 flex flex-col items-center">
              <img src={form.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-full border-4 border-blue-300 shadow-lg" />
              <span className="text-blue-700 font-semibold mt-2">Image Preview</span>
            </div>
          )}
        </div>
        {error && <div className="text-red-500 font-bold text-lg text-center">{error}</div>}
  <button type="submit" className="w-full bg-blue-700 text-white text-xl font-bold py-3 rounded-lg shadow hover:bg-blue-800 transition" disabled={loading || uploadingImage || !form.image_url}>{loading ? <span className="animate-pulse">Saving...</span> : uploadingImage ? <span className="animate-pulse">Uploading image...</span> : "Save"}</button>
      </form>
    </div>
  );
}
