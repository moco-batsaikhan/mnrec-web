"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./BannerNews.css";

interface NewsItem {
  id: number;
  title: string;
  en_title: string | null;
  content: string;
  en_content: string | null;
  summary: string;
  en_summary: string | null;
  featuredImage: string | null;
  slug: string;
  tags: string[];
  status: string;
  createdAt: string;
}

interface BannerNewsProps {
  locale: string;
}

export default function BannerNews({ locale }: BannerNewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/banner-news");
        const data = await response.json();
        
        console.log("BannerNews API Response:", data);
        
        if (data.success && Array.isArray(data.news)) {
          console.log("News items loaded:", data.news.length);
          setNews(data.news);
        }
      } catch (error) {
        console.error("Error fetching banner news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  console.log("BannerNews render - Loading:", loading, "News count:", news.length);

  if (loading) {
    return (
      <div className="banner-news-section">
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="banner-news-section">
      </div>
    );
  }

  return (
    <div className="banner-news-section">
      <div className="banner-news-grid">
        {news.map((item, index) => (
          <div key={item.id} className="banner-news-card">
            <div className="banner-news-image">
              <img
                src={item.featuredImage || "/assets/images/news/default.jpg"}
                alt={locale === "mn" ? item.title : (item.en_title || item.title)}
              />
            </div>
            <div className="banner-news-content">
              <div className="banner-news-meta">
                <span className="banner-news-badge">
                  {index === 0 
                    ? (locale === "mn" ? "Сүүлийн үеийн мэдээ" : "Latest News")
                    : (locale === "mn" ? "Сүүлийн үеийн танилцуулга" : "Latest Introduction")
                  }
                </span>
                
              </div>
              <h3 className="banner-news-title">
                {locale === "mn" ? item.title : (item.en_title || item.title)}
              </h3>
              <span className="banner-news-date">
                  {new Date(item.createdAt).toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
                    year: "numeric",
                    month: locale === "mn" ? "numeric" : "long",
                    day: "numeric"
                  })}
                </span>
              <Link
                href={`/${locale}/news/${item.id}`}
                className="banner-news-button"
              >
                {locale === "mn" ? "Дэлгэрэнгүй" : "Read More"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
