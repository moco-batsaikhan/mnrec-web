"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "../../../components/RichTextEditor";

interface NewsForm {
  title: string;
  content: string;
  summary: string;
  status: "draft" | "published" | "archived";
  category: string;
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
  viewCount: number;
}

export default function EditNews({ params }: { params: Promise<{ id: string }> }) {
  const [formData, setFormData] = useState<NewsForm>({
    title: "",
    content: "",
    summary: "",
    status: "draft",
    category: "",
    tags: [],
    featuredImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [news, setNews] = useState<News | null>(null);
  const [newsId, setNewsId] = useState<string>("");
  const router = useRouter();

  const categories = [
    "Мэдээ",
    "Хурал", 
    "Төсөл",
    "Судалгаа",
    "Байгаль орчин",
    "Технологи",
    "Хөрөнгө оруулалт"
  ];

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setNewsId(resolvedParams.id);
      fetchNews(resolvedParams.id);
    };
    initializeParams();
  }, [params]);

  const fetchNews = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`);
      if (response.ok) {
        const result = await response.json();
        const newsData = result.data;
        
        setNews(newsData);
        setFormData({
          title: newsData.title,
          content: newsData.content,
          summary: newsData.summary,
          status: newsData.status,
          category: newsData.category,
          tags: newsData.tags,
          featuredImage: newsData.featuredImage || "",
        });
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
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
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
    
    if (!formData.title || !formData.content || !formData.summary || !formData.category) {
      setError("Шаардлагатай талбарууд дутуу байна");
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
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/admin/news");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Мэдээ ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (error && !news) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мэдээ засварлах</h1>
            <p className="text-gray-600">&quot;{news?.title}&quot; мэдээг засварлах</p>
            {news && (
              <div className="text-sm text-gray-500 mt-2">
                <span>Үүсгэсэн: {new Date(news.createdAt).toLocaleDateString("mn-MN")}</span>
                {news.publishedAt && (
                  <span className="ml-4">
                    Нийтэлсэн: {new Date(news.publishedAt).toLocaleDateString("mn-MN")}
                  </span>
                )}
                <span className="ml-4">Үзэлт: {news.viewCount}</span>
              </div>
            )}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Гарчиг *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Мэдээний гарчиг оруулна уу"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Товч агуулга *
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Мэдээний товч агуулга (2-3 өгүүлбэр)"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дэлгэрэнгүй агуулга *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => handleChange("content", content)}
              placeholder="Мэдээний дэлгэрэнгүй агуулгыг энд бичнэ үү..."
              height={500}
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ангилал *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Ангилал сонгоно уу</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Төлөв
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value as "draft" | "published" | "archived")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Ноорог</option>
                <option value="published">Нийтлэх</option>
                <option value="archived">Архивлах</option>
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Онцлох зураг
            </label>
            <input
              type="text"
              value={formData.featuredImage}
              onChange={(e) => handleChange("featuredImage", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="/assets/images/news/example.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Зургийн URL эсвэл файлын зам оруулна уу
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Түлхүүр үгс
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Түлхүүр үг нэмэх"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Нэмэх
              </button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}