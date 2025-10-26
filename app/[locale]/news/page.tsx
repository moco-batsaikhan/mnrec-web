"use client";

import PageBanner from "@/app/components/pageBanner";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import "./news.css";

interface NewsArticle {
  id: number;
  title: string;
  en_title?: string;
  summary: string;
  en_summary?: string;
  slug: string;
  status: string;
  featuredImage: string;
  authorName: string;
  publishedAt: string;
  createdAt: string;
}

interface NewsResponse {
  success: boolean;
  data: NewsArticle[];
  pagination: {
    current: number;
    total: number;
    count: number;
    perPage: number;
  };
}

function NewsContent() {
  const params = useParams();
  const lang = (params?.locale as string) || "mn";
  
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    count: 0,
    perPage: 5,
  });

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const fetchNews = async () => {
    setLoading(true);
    setError("");

    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "3",
        status: "published",
        sortBy: "publishedAt",
        sortOrder: "desc",
      });

      if (searchQuery.trim()) {
        queryParams.append("search", searchQuery.trim());
      }

      const response = await fetch(`/api/news?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error("Мэдээ татахад алдаа гарлаа");
      }

      const result: NewsResponse = await response.json();
      
      setNews(result.data || []);
      setPagination(result.pagination);
    } catch (err) {
      console.error("Fetch news error:", err);
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPage(1); // Reset to first page on new search
    fetchNews();
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchNews();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    if (lang === "mn") {
      return `${year} оны ${month}-р сар`;
    } else {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[month - 1]} ${year}`;
    }
  };

  const getTitle = (article: NewsArticle) => {
    return lang === "en" && article.en_title ? article.en_title : article.title;
  };

  const getSummary = (article: NewsArticle) => {
    return lang === "en" && article.en_summary ? article.en_summary : article.summary;
  };

  const getPaginationPages = () => {
    const pages = [];
    const totalPages = pagination.total;
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination: show first, last, current, and neighbors
      if (currentPage <= 3) {
        // Near start
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // In middle
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div>
      <PageBanner
        bannerImage={"/assets/images/bg/media.jpg"}
        pageName={lang === "mn" ? "Мэдээ" : "News"}
      />
      <section className="rs-postbox-area section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-8">
              <div className="rs-postbox-wrapper">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">{lang === "mn" ? "Мэдээ ачааллаж байна..." : "Loading news..."}</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ) : news.length === 0 ? (
                  <div className="alert alert-info" role="alert">
                    {lang === "mn" ? "Мэдээ олдсонгүй" : "No news found"}
                  </div>
                ) : (
                  <>
                    {news.map(article => (
                      <article key={article.id} className="rs-postbox-item">
                        <div className="rs-postbox-thumb">
                          <Link href={`/${lang}/news/${article.id}`}>
                            <img 
                              src={article.featuredImage || "/assets/images/gallery/news/news-1.avif"} 
                              alt={getTitle(article)} 
                            />
                          </Link>
                        </div>
                        <div className="rs-postbox-content">
                          {/* <div className="rs-postbox-meta-list">
                            <div className="rs-postbox-meta-item">
                              <span className="rs-meta-text">
                                {lang === "mn" ? "Зохиогч:" : "By"}
                                MNREC
                                
                              </span>
                            </div>
                            
                          </div> */}
                           <div className="rs-postbox-meta-item">
                              <span className="rs-postbox-meta-text">
                                <Link href={`/${lang}/news/${article.id}`}>
                                  {formatDate(article.publishedAt || article.createdAt)}
                                </Link>
                              </span>
                            </div>
                          <h3 className="rs-postbox-title">
                            <Link href={`/${lang}/news/${article.id}`}>{getTitle(article)}</Link>
                          </h3>
                          <div className="rs-postbox-text">
                            <p>{getSummary(article).substring(0, 200)}...</p>
                          </div>
                          <div className="rs-postbox-btn">
                            <Link
                              className="rs-btn has-theme-orange has-icon has-bg"
                              href={`/${lang}/news/${article.id}`}
                            >
                              {lang === "mn" ? "Дэлгэрэнгүй унших" : "Continue Reading"}
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}

                    {/* Pagination */}
                    {pagination.total > 1 && (
                      <div className="rs-pagination-wrapper mt-5">
                        <nav aria-label="Page navigation">
                          <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                {lang === "mn" ? "Өмнөх" : "Previous"}
                              </button>
                            </li>
                            
                            {getPaginationPages().map((page, index) => 
                              typeof page === 'number' ? (
                                <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageChange(page)}
                                  >
                                    {page}
                                  </button>
                                </li>
                              ) : (
                                <li key={index} className="page-item disabled">
                                  <span className="page-link">{page}</span>
                                </li>
                              )
                            )}
                            
                            <li className={`page-item ${currentPage === pagination.total ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === pagination.total}
                              >
                                {lang === "mn" ? "Дараах" : "Next"}
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <aside className="rs-postbox-sidebar">
                {/* Search Widget */}
                <div className="sidebar-widget mb-30">
                  <h5 className="sidebar-widget-title">
                    {lang === "mn" ? "Хайлт" : "Search"}
                  </h5>
                  <div className="sidebar-widget-content">
                    <form onSubmit={(e) => e.preventDefault()} className="sidebar-search-form">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={lang === "mn" ? "Мэдээ хайх..." : "Search news..."}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                          type="button"
                          onClick={handleSearchClick}
                          className="sidebar-search-btn"
                          data-text={lang === "mn" ? "Хайх" : "Search"}
                        >
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                          </svg>
                          <span className="search-btn-text">{lang === "mn" ? "Хайх" : "Search"}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Latest News Widget */}
                <div className="sidebar-widget mb-30">
                  <h5 className="sidebar-widget-title">
                    {lang === "mn" ? "Сүүлийн мэдээ" : "Latest News"}
                  </h5>
                  <div className="sidebar-widget-content">
                    <div className="sidebar-blog-item-wrapper">
                      {news.slice(0, 5).map(article => (
                        <div key={article.id} className="sidebar-blog-item">
                          <div className="sidebar-blog-thumb">
                            <Link href={`/${lang}/news/${article.id}`}>
                              <img 
                                src={article.featuredImage || "/assets/images/gallery/news/news-1.avif"} 
                                alt={getTitle(article)} 
                              />
                            </Link>
                          </div>
                          <div className="sidebar-blog-content">
                            <h6 className="sidebar-blog-title">
                              <Link href={`/${lang}/news/${article.id}`}>{getTitle(article)}</Link>
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default function NewsPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading...</p>
      </div>
    }>
      <NewsContent />
    </Suspense>
  );
}
