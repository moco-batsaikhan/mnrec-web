"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

// Dynamically import TipTap editor to avoid SSR issues
const TipTapEditor = dynamic(() => import("../../../components/TipTapEditor"), {
  ssr: false,
  loading: () => <div className="p-4 text-center text-gray-600">Editor ачааллаж байна...</div>
});

interface NewsForm {
  title: string;
  content: string;
  summary: string;
  en_title: string;
  en_content: string;
  en_summary: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  featuredImage: string;
}

interface News extends NewsForm {
  id: number;
  slug: string;
  authorId: number;
  authorName: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function EditNews({ params }: { params: Promise<{ id: string }> }) {
  const [formData, setFormData] = useState<NewsForm>({
    title: "",
    content: "",
    summary: "",
    en_title: "",
    en_content: "",
    en_summary: "",
    status: "draft",
    tags: [],
    featuredImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [news, setNews] = useState<News | null>(null);
  const [newsId, setNewsId] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState<"mn" | "en">("mn");
  const router = useRouter();



  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setNewsId(resolvedParams.id);
      fetchNews(resolvedParams.id);
    };
    initializeParams();
  }, [params]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = "Гарчиг заавал оруулна уу";
    } else if (formData.title.length < 5) {
      errors.title = "Гарчиг хамгийн багадаа 5 тэмдэгт байх ёстой";
    } else if (formData.title.length > 200) {
      errors.title = "Гарчиг 200 тэмдэгтээс хэтрэж болохгүй";
    }

    if (!formData.summary.trim()) {
      errors.summary = "Товч агуулга заавал оруулна уу";
    } else if (formData.summary.length < 20) {
      errors.summary = "Товч агуулга хамгийн багадаа 20 тэмдэгт байх ёстой";
    } else if (formData.summary.length > 500) {
      errors.summary = "Товч агуулга 500 тэмдэгтээс хэтрэж болохгүй";
    }

    if (!formData.content.trim()) {
      errors.content = "Дэлгэрэнгүй агуулга заавал оруулна уу";
    } else if (formData.content.length < 50) {
      errors.content = "Дэлгэрэнгүй агуулга хамгийн багадаа 50 тэмдэгт байх ёстой";
    }



    if (formData.featuredImage && !isValidImageUrl(formData.featuredImage)) {
      errors.featuredImage = "Зургийн URL буруу байна";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidImageUrl = (url: string): boolean => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext)) || url.startsWith("http");
  };

  const fetchNews = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`);
      if (response.ok) {
        const result = await response.json();
        const newsData = result.data;

        setNews(newsData);
        const formDataValues = {
          title: newsData.title,
          content: newsData.content,
          summary: newsData.summary,
          en_title: newsData.en_title || "",
          en_content: newsData.en_content || "",
          en_summary: newsData.en_summary || "",
          status: newsData.status,
          tags: newsData.tags,
          featuredImage: newsData.featuredImage || "",
        };
        setFormData(formDataValues);

        // Set image preview if exists
        if (newsData.featuredImage) {
          setImagePreview(newsData.featuredImage);
        }
      } else {
        setError("Мэдээ олдсонгүй");
      }
    } catch (error) {
      console.error("News fetch алдаа:", error);
      setError("Мэдээ татахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof NewsForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: "",
      }));
    }

    // Update image preview
    if (field === "featuredImage" && value) {
      setImagePreview(value);
    } else if (field === "featuredImage" && !value) {
      setImagePreview("");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("File selected:", file.name, file.type, file.size);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError("Зөвхөн зураг файл ашиглана уу (JPG, PNG, WebP, GIF)");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("Зургийн хэмжээ 5MB-аас хэтэрч болохгүй");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('image', file);
      
      console.log("Starting upload to /api/upload/image");

      // Upload to our API endpoint
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });
      
      console.log("Upload response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        const imageUrl = result.url;
        
        console.log("Upload successful, image URL:", imageUrl);
        
        // Update form data and preview
        handleChange("featuredImage", imageUrl);
        setImagePreview(imageUrl);
        setSuccess("Зураг амжилттай ачааллагдлаа!");
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorResult = await response.json();
        console.log("Upload failed:", errorResult);
        setError(errorResult.message || "Зураг ачааллахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setError("Зураг ачааллахад алдаа гарлаа");
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };



  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      if (formData.tags.length >= 10) {
        setError("Хамгийн ихдээ 10 түлхүүр үг нэмэх боломжтой");
        return;
      }
      if (trimmedTag.length > 30) {
        setError("Түлхүүр үг 30 тэмдэгтээс хэтрэж болохгүй");
        return;
      }
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput("");
      setError("");
    }
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === "Backspace" && tagInput === "" && formData.tags.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      setError("Формын мэдээллийг зөв бөглөнө үү");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Мэдээ амжилттай шинэчлэгдлээ!");
        setTimeout(() => {
          router.push("/admin/news");
        }, 1500);
      } else {
        setError(result.message || "Мэдээ засварлахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("News update алдаа:", error);
      setError("Серверт холбогдох үед алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const handleDraft = async () => {
    const draftData = { ...formData, status: "draft" as const };
    setFormData(draftData);

    // Save as draft with minimal validation
    if (!draftData.title.trim()) {
      setError("Ноорог хадгалахын тулд гарчиг заавал оруулна уу");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draftData),
      });

      if (response.ok) {
        setSuccess("Ноорог амжилттай хадгалагдлаа!");
        setTimeout(() => {
          router.push("/admin/news");
        }, 1500);
      } else {
        const result = await response.json();
        setError(result.message || "Ноорог хадгалахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Draft save алдаа:", error);
      setError("Серверт холбогдох үед алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Мэдээ ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (error && !news) {
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
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Мэдээ засварлах</h1>
                {news && (
                  <span
                    className={`ml-3 inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      news.status === "published"
                        ? "bg-green-100 text-green-800"
                        : news.status === "draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {news.status === "published"
                      ? "Нийтлэгдсэн"
                      : news.status === "draft"
                      ? "Ноорог"
                      : "Архивлагдсан"}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-3">
                &quot;{news?.title || "Ачааллаж байна..."}&quot; мэдээг засварлах
              </p>
              {news && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Үүсгэсэн:</span>
                    <p className="font-medium text-gray-400">
                      {new Date(news.createdAt).toLocaleDateString("mn-MN")}
                    </p>
                  </div>
                  {news.publishedAt && (
                    <div>
                      <span className="text-gray-500">Нийтэлсэн:</span>
                      <p className="font-medium text-gray-400">
                        {new Date(news.publishedAt).toLocaleDateString("mn-MN")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              {news && (
                <a
                  href={`/news/${news.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Үзэх
                </a>
              )}
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Буцах
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Гарчиг *</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => handleChange("title", e.target.value)}
              className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                validationErrors.title ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Мэдээний гарчиг оруулна уу"
            />
            {validationErrors.title && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">{formData.title.length}/200 тэмдэгт</p>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Товч агуулга *</label>
            <textarea
              value={formData.summary}
              onChange={e => handleChange("summary", e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 ${
                validationErrors.summary ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Мэдээний товч агуулга (2-3 өгүүлбэр, 20-500 тэмдэгт)"
            />
            {validationErrors.summary && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.summary}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">{formData.summary.length}/500 тэмдэгт</p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дэлгэрэнгүй агуулга *
            </label>
            <div className={validationErrors.content ? "border-2 border-red-300 rounded-lg" : ""}>
              <TipTapEditor
                value={formData.content}
                onChange={(content) => handleChange("content", content)}
                placeholder="Мэдээний дэлгэрэнгүй агуулгыг засварлах..."
                readOnly={false}
              />
            </div>
            {validationErrors.content && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.content}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {formData.content.replace(/<[^>]*>/g, "").length} тэмдэгт (HTML-гүй)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Төлөв</label>
              <select
                value={formData.status}
                onChange={e =>
                  handleChange("status", e.target.value as "draft" | "published" | "archived")
                }
                className="w-full px-4 py-3 text-gray-800 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Ноорог</option>
                <option value="published">Нийтлэх</option>
                <option value="archived">Архивлах</option>
              </select>
              <p className="text-gray-500 text-xs mt-1">
                {formData.status === "draft" && "Ноорог нь хадгалагдсан боловч нийтлэгдээгүй"}
                {formData.status === "published" && "Нийтлэгдсэн нь хэрэглэгчдэд харагдана"}
                {formData.status === "archived" && "Архивлагдсан нь хэрэглэгчдэд харагдахгүй"}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Онцлох зураг</label>
            
            {/* Image Preview Section */}
            {imagePreview ? (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Одоогийн зураг:</p>
                <div className="relative inline-block border rounded-lg p-2 bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-sm h-32 object-cover rounded"
                    onError={() => setImagePreview("")}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      console.log("Edit: Removing image preview...");
                      setImagePreview("");
                      handleChange("featuredImage", "");
                      // Clear file input
                      const fileInput = document.getElementById('image-upload-edit') as HTMLInputElement;
                      if (fileInput) {
                        fileInput.value = '';
                        console.log("File input cleared");
                      }
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
                    title="Зураг арилгах"
                  >
                    ×
                  </button>
                </div>
              </div>
            ) : null}

            <div className="space-y-3">
              {/* File upload button */}
              <div>
                <label
                  htmlFor="image-upload-edit"
                  className={`block w-full py-3 px-4 rounded-lg transition-colors font-medium text-center ${
                    uploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  } text-white`}
                >
                  {uploading ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Зураг ачааллаж байна...
                    </>
                  ) : (
                    <>
                      <span className="text-lg mr-2">📷</span>
                      {imagePreview ? "Өөр зураг сонгох" : "Зураг сонгох"}
                    </>
                  )}
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload-edit"
                  disabled={uploading}
                />
              </div>

              <p className="text-xs text-gray-500 text-center">
                Зөвхөн PNG, JPG, WebP, GIF форматыг дэмждэг (хамгийн ихдээ 5MB)
              </p>

              {/* URL Input Alternative */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">эсвэл URL засварлах</span>
                </div>
              </div>

              <input
                type="text"
                value={formData.featuredImage}
                onChange={e => handleChange("featuredImage", e.target.value)}
                className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                  validationErrors.featuredImage ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="https://example.com/image.jpg"
              />

              {validationErrors.featuredImage && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.featuredImage}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Түлхүүр үгс</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="flex-1 px-4 py-3 text-gray-800 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="..."
                  maxLength={30}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.length >= 10}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-base font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Нэмэх
                </button>
              </div>

              <p className="text-xs text-gray-500">
                {formData.tags.length}/10 түлхүүр үг • Backspace: сүүлийн түлхүүр үгийг устгах
              </p>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      <span className="text-xs text-blue-600 mr-1">#{index + 1}</span>
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-600 hover:text-red-600 font-bold"
                        title="Устгах"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {formData.tags.length === 0 && (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">Түлхүүр үг нэмээгүй байна</p>
                  <p className="text-gray-400 text-xs mt-1">Хайлтанд тусална</p>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-4">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">❌</span>
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 border border-green-200 p-4">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <div className="text-sm text-green-700">{success}</div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={saving}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Цуцлах
            </button>

            <button
              type="button"
              onClick={handleDraft}
              disabled={saving || !formData.title.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Хадгалж байна..." : "📝 Ноорог болгох"}
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? "Хадгалж байна..."
                : formData.status === "published"
                ? "Нийтлэх"
                : formData.status === "archived"
                ? "Архивлах"
                : "Хадгалах"}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Зөвлөмж:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>Ноорог болгох:</strong> Мэдээг ноорог төлөвт шилжүүлэх
              </li>
              <li>
                • <strong>Нийтлэх:</strong> Бүх талбар бөглөсний дараа хэрэглэгчдэд харуулна
              </li>
              <li>
                • <strong>Архивлах:</strong> Хадгалагдсан боловч хэрэглэгчдэд харагдахгүй
              </li>
            </ul>
            {news && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>Сүүлд шинэчлэгдсэн:</strong>{" "}
                  {new Date(news.updatedAt).toLocaleString("mn-MN")} | <strong>Зохиогч:</strong>{" "}
                  {news.authorName}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
