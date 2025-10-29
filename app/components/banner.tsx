"use client";

import BannerNews from "./BannerNews";
import { useEffect, useState } from "react";

export default function Banner({ locale }: { locale: string }) {
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

  const keyWord = homeText ? (lang === "en" ? homeText.en_keyWord : homeText.mn_keyWord) : "";
  const keyNote = homeText ? (lang === "en" ? homeText.en_keyNote : homeText.mn_keyNote) : "";

  return (
    <section
      className="rs-banner-area rs-banner-two p-relative"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <video
        src="/assets/mp4/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div className="rs-video-overlay"></div>
      <div className="rs-banner-bg-thumb" style={{ position: "relative", zIndex: 1 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row">
          <div className="col-xxl-8 col-xl-9 col-lg-9">
            <div className="rs-banner-wrapper">
              <div className="rs-banner-content">
                {error ? (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                ) : null}
                <h1
                  className="rs-banner-title wow fadeInUp"
                  data-wow-delay=".3s"
                  data-wow-duration=".7s"
                  style={{ textTransform: 'none' }}
                >
                  {loading ? (
                    <span className="inline-block h-8 w-2/3 bg-gray-200 animate-pulse rounded" />
                  ) : keyWord}
                </h1>
                <div
                  className="rs-banner-descrip wow fadeInUp"
                  data-wow-delay=".5s"
                  data-wow-duration=".9s"
                >
                  <p>
                    {loading ? (
                      <span className="inline-block h-5 w-1/2 bg-gray-200 animate-pulse rounded" />
                    ) : keyNote}
                  </p>
                </div>
                <div
                  className="wow fadeInUp"
                  data-wow-delay=".7s"
                  data-wow-duration="1.1s"
                >
                  <BannerNews locale={locale} />
                </div>
                <div
                  className="rs-banner-btn wow fadeInUp"
                  data-wow-delay=".9s"
                  data-wow-duration="1.3s"
                  style={{ display: "flex", gap: "30px" }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
