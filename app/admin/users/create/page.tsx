"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "editor",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const router = useRouter();

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

    if (!formData.role) {
      errors.role = "Эрх сонгоно уу";
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

    if (!validateForm()) {
      setError("Формын мэдээллийг зөв бөглөнө үү");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/admin/users");
      } else {
        // Handle specific error cases
        if (response.status === 403) {
          // Permission denied - show once and redirect
          setError(result.message || "Та энэ үйлдлийг хийх эрхгүй байна");
          setTimeout(() => {
            router.push("/admin/users");
          }, 2000);
        } else {
          setError(result.message || "Хэрэглэгч нэмэхэд алдаа гарлаа");
        }
      }
    } catch (error) {
      console.error("User create error:", error);
      setError("Серверт холбогдох үед алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Шинэ хэрэглэгч нэмэх</h1>
            <p className="text-gray-600">Системд шинэ хэрэглэгч бүртгэх</p>
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Нууц үг <span className="text-red-500">*</span>
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
                validationErrors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
            )}
          </div>

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

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-4">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">❌</span>
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Хадгалж байна..." : "Хэрэглэгч нэмэх"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
