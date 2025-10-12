"use client";

import { useState } from "react";

interface ContactFormProps {
  translations: {
    yourEmail: string;
    subject: string;
    message: string;
    submit: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.message || "Алдаа гарлаа");
        setTimeout(() => setError(""), 5000);
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Серверт холбогдох үед алдаа гарлаа");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-area">
      <div className="contact-form-wrapper">
        {success && (
          <div className="alert alert-success mb-4" role="alert">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            ❌ {error}
          </div>
        )}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder={translations.yourEmail}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder={translations.subject}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  rows={6}
                  placeholder={translations.message}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                ></textarea>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary contact-btn"
                  disabled={loading}
                >
                  {loading ? "Илгээж байна..." : translations.submit}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
