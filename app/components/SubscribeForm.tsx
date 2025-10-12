"use client";

import { useState } from "react";

export default function SubscribeForm({ translations }: { translations: { enterEmail: string; sendMessage: string } }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setIsError(false);
        setEmail("");
        setTimeout(() => setMessage(""), 5000);
      } else {
        // Show detailed error if available
        const errorMsg = result.error 
          ? `${result.message}\n${result.error}` 
          : result.message || "Алдаа гарлаа";
        setMessage(errorMsg);
        setIsError(true);
        setTimeout(() => setMessage(""), 8000); // Extended time for longer messages
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      setMessage("Серверт холбогдох үед алдаа гарлаа");
      setIsError(true);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <div
          className={`mb-3 p-3 rounded-lg text-sm font-medium ${
            isError
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-green-100 text-green-800 border border-green-200"
          }`}
        >
          <div className="whitespace-pre-wrap">
            {isError ? "❌" : "✅"} {message}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="rs-subscribe-input mb-70">
        <input
          name="email"
          type="email"
          placeholder={translations.enterEmail}
          className="subscribe-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="rs-btn blue-bg subscribe-btn"
          disabled={loading}
        >
          {loading ? "Илгээж байна..." : translations.sendMessage}
        </button>
      </form>
    </div>
  );
}
