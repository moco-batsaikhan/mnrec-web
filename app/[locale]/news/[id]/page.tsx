"use client";

import PageBanner from "@/app/components/pageBanner";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import "../news.css";

interface NewsArticle {
  id: number;
  title: string;
  en_title?: string | null;
  content: string;
  en_content?: string | null;
  summary: string;
  en_summary?: string | null;
  slug: string;
  status: string;
  featuredImage: string | null;
  category: string;
  authorName: string;
  publishedAt: string;
  createdAt: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "mn";
  const newsId = params?.id as string;
  
  const [news, setNews] = useState<NewsArticle | null>(null);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNewsDetail();
    fetchLatestNews();
  }, [newsId]);

  const fetchNewsDetail = async () => {
    setLoading(true);
    setError("");

    try {
      // Fetch news by ID directly
      const response = await fetch(`/api/news/${newsId}`);
      
      if (!response.ok) {
        throw new Error("Мэдээ татахад алдаа гарлаа");
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        setNews(result.data);
      } else {
        setError(locale === "mn" ? "Мэдээ олдсонгүй" : "News not found");
      }
    } catch (err) {
      console.error("Fetch news error:", err);
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestNews = async () => {
    try {
      const response = await fetch(`/api/news?limit=3&status=published&sortBy=publishedAt&sortOrder=desc`);
      
      if (!response.ok) {
        return;
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // Filter out current news from the list
        const filtered = result.data.filter((article: NewsArticle) => article.id !== parseInt(newsId));
        setLatestNews(filtered.slice(0, 3));
      }
    } catch (err) {
      console.error("Fetch latest news error:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if (locale === "mn") {
      return `${year} оны ${month}-р сарын ${day}`;
    } else {
      const monthNames = ["January", "February", "March", "April", "May", "June", 
                         "July", "August", "September", "October", "November", "December"];
      return `${monthNames[month - 1]} ${day}, ${year}`;
    }
  };

  const getTitle = (article: NewsArticle) => {
    return locale === "en" && article.en_title ? article.en_title : article.title;
  };

  const getContent = (article: NewsArticle) => {
    return locale === "en" && article.en_content ? article.en_content : article.content;
  };

  const getSummary = (article: NewsArticle) => {
    return locale === "en" && article.en_summary ? article.en_summary : article.summary;
  };

  if (loading) {
    return (
      <div>
        <PageBanner 
          bannerImage={"/assets/images/bg/media.jpg"} 
          pageName={locale === "mn" ? "Мэдээ" : "News"} 
        />
        <section className="rs-postbox-area section-space">
          <div className="container">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">{locale === "mn" ? "Мэдээ ачааллаж байна..." : "Loading news..."}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div>
        <PageBanner 
          bannerImage={"/assets/images/bg/media.jpg"} 
          pageName={locale === "mn" ? "Мэдээ" : "News"} 
        />
        <section className="rs-postbox-area section-space">
          <div className="container">
            <div className="alert alert-danger" role="alert">
              {error || (locale === "mn" ? "Мэдээ олдсонгүй" : "News not found")}
            </div>
            <Link href={`/${locale}/news`} className="rs-btn has-theme-orange has-icon has-bg mt-3">
              {locale === "mn" ? "Буцах" : "Go Back"}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageBanner 
        bannerImage={"/assets/images/bg/media.jpg"} 
        pageName={getTitle(news)} 
      />
      <section className="rs-postbox-area section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-8">
              <div className="rs-postbox-details-wrapper">
                <div className="rs-postbox-details-thumb">
                  <img
                    src={news.featuredImage || "/assets/images/gallery/news/news-1.avif"}
                    alt={getTitle(news)}
                  />
                </div>
                <div className="rs-postbox-content">
                  <div className="rs-postbox-meta-list">
                    <div className="rs-postbox-meta-item">
                      <span className="rs-meta-text">
                        {locale === "mn" ? "Зохиогч:" : "By"}
                        <span className="meta-author"> {news.authorName || "MNREC"}</span>
                      </span>
                    </div>
                    <div className="rs-postbox-meta-item">
                      <span className="rs-postbox-meta-text">
                        {formatDate(news.publishedAt || news.createdAt)}
                      </span>
                    </div>
                  </div>
                  <h3 className="rs-postbox-details-title">{getTitle(news)}</h3>
                  <p className="rs-postbox-intro">{getSummary(news)}</p>
                </div>
                <div className="rs-postbox-details-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getContent(news)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4">
              <aside className="rs-postbox-sidebar">
                {/* Latest News Widget */}
                <div className="sidebar-widget mb-30">
                  <h5 className="sidebar-widget-title">
                    {locale === "mn" ? "Сүүлийн мэдээ" : "Latest News"}
                  </h5>
                  <div className="sidebar-widget-content">
                    {latestNews.length > 0 ? (
                      <div className="sidebar-blog-item-wrapper">
                        {latestNews.map(article => (
                          <div key={article.id} className="sidebar-blog-item">
                            <div className="sidebar-blog-thumb">
                              <Link href={`/${locale}/news/${article.id}`}>
                                <img 
                                  src={article.featuredImage || "/assets/images/gallery/news/news-1.avif"} 
                                  alt={getTitle(article)} 
                                />
                              </Link>
                            </div>
                            <div className="sidebar-blog-content">
                              <h6 className="sidebar-blog-title">
                                <Link href={`/${locale}/news/${article.id}`}>
                                  {getTitle(article)}
                                </Link>
                              </h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>{locale === "mn" ? "Мэдээ байхгүй байна" : "No news available"}</p>
                    )}
                  </div>
                </div>

                {/* Back Button Widget */}
                <div className="sidebar-widget mb-30">
                  <h5 className="sidebar-widget-title">
                    {locale === "mn" ? "Буцах" : "Go Back"}
                  </h5>
                  <div className="sidebar-widget-content">
                    <Link 
                      href={`/${locale}/news`} 
                      className="rs-btn has-theme-orange has-icon has-bg w-100"
                    >
                      {locale === "mn" ? "Мэдээний жагсаалт руу буцах" : "Back to News List"}
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
