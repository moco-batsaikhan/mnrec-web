"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "../../components/RichTextEditor";

interface NewsForm {
  title: string;
  content: string;
  summary: string;
  status: "draft" | "published" | "archived";
  category: string;
  tags: string[];
  featuredImage: string;
}

export default function CreateNews() {
  const [formData, setFormData] = useState<NewsForm>({
    title: "",
    content: "",
    summary: "",
    status: "draft",
    category: "",
    tags: [],
    featuredImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState("");
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

    if (!formData.category) {
      errors.category = "Ангилал заавал сонгоно уу";
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

    setLoading(true);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          authorId: 1, // Demo - бодитоор current user-аас авна
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Мэдээ амжилттай үүсгэгдлээ!");
        setTimeout(() => {
          router.push("/admin/news");
        }, 1500);
      } else {
        setError(result.message || "Мэдээ нэмэхэд алдаа гарлаа");
      }
    } catch (error) {
      console.error("News create алдаа:", error);
      setError("Серверт холбогдох үед алдаа гарлаа");
    } finally {
      setLoading(false);
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

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...draftData,
          authorId: 1,
        }),
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Шинэ мэдээ нэмэх</h1>
            <p className="text-gray-600">Веб сайтад нийтлэх шинэ мэдээ үүсгэх</p>
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Буцах
          </button>
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
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
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
            <div
              className={`border rounded-lg ${
                validationErrors.content ? "border-red-300" : "border-gray-300"
              }`}
            >
              <RichTextEditor
                value={formData.content}
                onChange={content => handleChange("content", content)}
                placeholder="Мэдээний дэлгэрэнгүй агуулгыг энд бичнэ үү... (хамгийн багадаа 50 тэмдэгт)"
                height={400}
              />
            </div>
            {validationErrors.content && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.content}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {formData.content.replace(/<[^>]*>/g, "").length} тэмдэгт
            </p>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ангилал *</label>
              <select
                value={formData.category}
                onChange={e => handleChange("category", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validationErrors.category ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              >
                <option value="">Ангилал сонгоно уу</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {validationErrors.category && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Төлөв</label>
              <select
                value={formData.status}
                onChange={e =>
                  handleChange("status", e.target.value as "draft" | "published" | "archived")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">📝 Ноорог</option>
                <option value="published">✅ Нийтлэх</option>
                <option value="archived">📦 Архивлах</option>
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
            <div className="space-y-3">
              <input
                type="text"
                value={formData.featuredImage}
                onChange={e => handleChange("featuredImage", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validationErrors.featuredImage ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="https://example.com/image.jpg эсвэл /assets/images/news/example.jpg"
              />
              {validationErrors.featuredImage && (
                <p className="text-red-500 text-sm">{validationErrors.featuredImage}</p>
              )}
              <p className="text-xs text-gray-500">
                Зургийн URL эсвэл файлын зам оруулна уу (.jpg, .png, .webp, .gif)
              </p>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Зургийн урьдчилан харах:</p>
                  <div className="border rounded-lg p-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                </div>
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Түлхүүр үг нэмэх (Enter дарж нэмэх)"
                  maxLength={30}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.length >= 10}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={loading}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Цуцлах
            </button>

            <button
              type="button"
              onClick={handleDraft}
              disabled={loading || !formData.title.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Хадгалж байна..." : "📝 Ноорог хадгалах"}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Хадгалж байна..."
                : formData.status === "published"
                ? "✅ Нийтлэх"
                : formData.status === "archived"
                ? "📦 Архивлах"
                : "📝 Хадгалах"}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Зөвлөмж:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>Ноорог хадгалах:</strong> Зөвхөн гарчиг шаардлагатай, дараа нь засварлах
                боломжтой
              </li>
              <li>
                • <strong>Нийтлэх:</strong> Бүх талбар бөглөсний дараа хэрэглэгчдэд харуулна
              </li>
              <li>
                • <strong>Архивлах:</strong> Хадгалагдсан боловч хэрэглэгчдэд харагдахгүй
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
