"use client";
import React, { useEffect, useState } from "react";

interface HomeTextProps {
  locale: string;
}

export default function HomeText({ locale }: HomeTextProps) {
  const [homeText, setHomeText] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/homeText")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHomeText(data.data);
        } else {
          setError(data.message || "Not found");
        }
      })
      .catch(() => setError("Failed to fetch homeText"))
      .finally(() => setLoading(false));
  }, []);

  const lang = locale === "en" ? "en" : "mn";
  const slogan = homeText ? (lang === "en" ? homeText.en_slogan_text : homeText.mn_slogan_text) : "";

  return (
    <section 
      className="rs-cta-area rs-cta-four home-quote-section"
      style={{
        backgroundImage: 'url(/assets/images/bg/home-text-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          zIndex: 1,
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="rs-cta-wrapper">
          <div className="rs-section-title-wrapper quote-layout-horizontal">
            <div className="quote-text-with-icon">
              {error ? (
                <p className="split-in-fade text-red-600 bg-red-100 p-2 rounded mb-2">{error}</p>
              ) : null}
              <p className="split-in-fade">
                {loading ? (
                  <span className="inline-block h-6 w-2/3 bg-gray-200 animate-pulse rounded" />
                ) : slogan || "No slogan found."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
