"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export default function EditUser({ params }: { params: Promise<{ id: string }> }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "editor",
    status: "active",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [changePassword, setChangePassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.id);
      fetchUser(resolvedParams.id);
    };
    initializeParams();
  }, [params]);

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (response.ok) {
        const result = await response.json();
        const userData = result.data;

        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          status: userData.status,
          password: "",
          confirmPassword: "",
        });
      } else {
        setError("Хэрэглэгч олдсонгүй");
      }
    } catch (error) {
      console.error("User fetch error:", error);
      setError("Хэрэглэгч татахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Нэр заавал оруулна уу";
    } else if (formData.name.length < 2) {
      errors.name = "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "И-мэйл хаяг заавал оруулна уу";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "И-мэйл хаягийн формат буруу байна";
    }

    if (changePassword) {
      if (!formData.password) {
        errors.password = "Нууц үг заавал оруулна уу";
      } else if (formData.password.length < 6) {
        errors.password = "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой";
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = "Нууц үг баталгаажуулна уу";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Нууц үг таарахгүй байна";
      }
    }

    if (!formData.role) {
      errors.role = "Эрх сонгоно уу";
    }

    if (!formData.status) {
      errors.status = "Төлөв сонгоно уу";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
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
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      };

      // Only include password if changing it
      if (changePassword && formData.password) {
        updateData.password = formData.password;
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Хэрэглэгч амжилттай шинэчлэгдлээ!");
        setChangePassword(false);
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
        setTimeout(() => {
          router.push("/admin/users");
        }, 1500);
      } else {
        // Handle specific error cases
        if (response.status === 403) {
          // Permission denied - show once and redirect
          setError(result.message || "Та энэ үйлдлийг хийх эрхгүй байна");
          setTimeout(() => {
            router.push("/admin/users");
          }, 2000);
        } else {
          const errorMessage = result.error 
            ? `${result.message}: ${result.error}` 
            : result.message || "Хэрэглэгч засварлахад алдаа гарлаа";
          console.error("Алдаа гарлаа:", errorMessage);
          setError(errorMessage);
        }
      }
    } catch (error) {
      console.error("User update error:", error);
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
          <p className="text-gray-600">Хэрэглэгч ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Хэрэглэгч засварлах</h1>
              <p className="text-gray-600 mt-1">
                &quot;{user?.name || "Ачааллаж байна..."}&quot; хэрэглэгчийн мэдээлэл
              </p>
              {user && (
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Үүсгэсэн:</span>{" "}
                    {new Date(user.created_at).toLocaleString("mn-MN")}
                  </div>
                  {user.last_login && (
                    <div>
                      <span className="font-medium">Сүүлд нэвтэрсэн:</span>{" "}
                      {new Date(user.last_login).toLocaleString("mn-MN")}
                    </div>
                  )}
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
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Нэр <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                validationErrors.name ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Жишээ нь: Бат Болд"
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              И-мэйл хаяг <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                validationErrors.email ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="example@domain.com"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Password Change Toggle */}
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="changePassword"
                checked={changePassword}
                onChange={(e) => {
                  setChangePassword(e.target.checked);
                  if (!e.target.checked) {
                    setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
                    setValidationErrors((prev) => {
                      const { password, confirmPassword, ...rest } = prev;
                      return rest;
                    });
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="changePassword" className="ml-2 block text-sm text-gray-700">
                Нууц үг солих
              </label>
            </div>
          </div>

          {/* Password Fields (conditional) */}
          {changePassword && (
            <>
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шинэ нууц үг <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                    validationErrors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                {validationErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">Хамгийн багадаа 6 тэмдэгт</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нууц үг баталгаажуулах <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                    validationErrors.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                )}
              </div>
            </>
          )}

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Эрх <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                validationErrors.role ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="editor">Редактор</option>
              <option value="admin">Админ</option>
              <option value="superAdmin">Супер Админ</option>
            </select>
            {validationErrors.role && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.role}</p>
            )}
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <p>
                • <strong>Редактор:</strong> Мэдээ нэмэх, засах, устгах эрхтэй
              </p>
              <p>
                • <strong>Админ:</strong> Редакторын эрхтэй + мэдээ хянах, тохиргоо засах эрхтэй
              </p>
              <p>
                • <strong>Супер Админ:</strong> Бүх эрхтэй + хэрэглэгч удирдах эрхтэй
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Төлөв <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className={`w-full px-4 py-3 text-gray-800 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                validationErrors.status ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="active">Идэвхтэй</option>
              <option value="inactive">Идэвхгүй</option>
              <option value="suspended">Түр хаасан</option>
            </select>
            {validationErrors.status && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.status}</p>
            )}
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <p>
                • <strong>Идэвхтэй:</strong> Хэрэглэгч системд нэвтэрч ажиллах боломжтой
              </p>
              <p>
                • <strong>Идэвхгүй:</strong> Хэрэглэгч түр хугацаанд идэвхгүй
              </p>
              <p>
                • <strong>Түр хаасан:</strong> Хэрэглэгч нэвтрэх эрхгүй
              </p>
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
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={saving}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
