import PageBanner from "@/app/components/pageBanner";
import Link from "next/link";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function NewsPage(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  const newsArticles = [
    {
      id: 1,
      title: t.videos.news1.title || "Ирээдүйг бүтээлцэх залуу инженер",
      intro:
        t.videos.news1.intro || "Олон улсын эмэгтэйчүүдийн эрхийг хамгаалах өдрийг тохиолдуулан...",
      author: "MNREC",
      date: "2025 оны 3-р сар",
      image: "/assets/images/gallery/news/news-1.avif",
    },
    {
      id: 2,
      title: t.videos.news2.title || "Мэдээ 2",
      intro: t.videos.news2.intro || "Мэдээ 2-ын танилцуулга",
      author: "MNREC",
      date: "2025 оны 2-р сар",
      image: "/assets/images/gallery/news/news-2.avif",
    },
    {
      id: 3,
      title: t.videos.news3.title || "Мэдээ 3",
      intro: t.videos.news3.intro || "Мэдээ 3-ын танилцуулга",
      author: "MNREC",
      date: "2025 оны 1-р сар",
      image: "/assets/images/gallery/news/news-3.avif",
    },
    {
      id: 4,
      title: t.videos.news4.title || "Мэдээ 4",
      intro: t.videos.news4.intro || "Мэдээ 4-ын танилцуулга",
      author: "MNREC",
      date: "2025 оны 6-р сар",
      image: "/assets/images/gallery/news/news-4.avif",
    },
    {
      id: 5,
      title: t.videos.news5.title || "Мэдээ 5",
      intro: t.videos.news5.intro || "Мэдээ 5-ын танилцуулга",
      author: "MNREC",
      date: "2025 оны 6-р сар",
      image: "/assets/images/gallery/news/news-5.avif",
    },
    {
      id: 6,
      title: t.videos.news6.title || "Мэдээ 6",
      intro: t.videos.news6.intro || "Мэдээ 6-ын танилцуулга",
      author: "MNREC",
      date: "2025 оны 6-р сар",
      image: "/assets/images/gallery/news/news-6.avif",
    },
    {
      id: 7,
      title: t.videos.news7.title || "Мэдээ 7",
      intro: t.videos.news7.intro || "Мэдээ 7-ын танилцуулга",
      author: "MNREC",
      date: "2025 оны 6-р сар",
      image: "/assets/images/gallery/news/news-7.avif",
    },
  ];

  return (
    <div>
      <PageBanner pageName={t.menu.latest_news ?? "News"} />
      <section className="rs-postbox-area section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-8">
              <div className="rs-postbox-wrapper">
                {newsArticles.map(article => (
                  <article key={article.id} className="rs-postbox-item">
                    <div className="rs-postbox-thumb">
                      <Link href={`/${lang}/news/${article.id}`}>
                        <img src={article.image} alt={article.title} />
                      </Link>
                    </div>
                    <div className="rs-postbox-content">
                      <div className="rs-postbox-meta-list">
                        <div className="rs-postbox-meta-item">
                          <span className="rs-meta-text">
                            By
                            <Link className="meta-author" href={`/${lang}/news/${article.id}`}>
                              {article.author}
                            </Link>
                          </span>
                        </div>
                        <div className="rs-postbox-meta-item">
                          <span className="rs-postbox-meta-text">
                            <Link href={`/${lang}/news/${article.id}`}>{article.date}</Link>
                          </span>
                        </div>
                      </div>
                      <h3 className="rs-postbox-title">
                        <Link href={`/${lang}/news/${article.id}`}>{article.title}</Link>
                      </h3>
                      <div className="rs-postbox-text">
                        <p>{article.intro.substring(0, 150)}...</p>
                      </div>
                      <div className="rs-postbox-btn">
                        <Link
                          className="rs-btn has-theme-orange has-icon has-bg"
                          href={`/${lang}/news/${article.id}`}
                        >
                          {lang === "mn" ? "Дэлгэрэнгүй унших" : "Continue Reading"}
                          <span className="icon-box">
                            <svg
                              className="icon-first"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                            >
                              <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"></path>
                            </svg>
                            <svg
                              className="icon-second"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                            >
                              <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"></path>
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <aside className="rs-postbox-sidebar">
                <div className="sidebar-widget mb-30">
                  <h5 className="sidebar-widget-title">{t.menu.latest_news}</h5>
                  <div className="sidebar-widget-content">
                    <div className="sidebar-blog-item-wrapper">
                      {newsArticles.map(article => (
                        <div key={article.id} className="sidebar-blog-item">
                          <div className="sidebar-blog-thumb">
                            <Link href={`/${lang}/news/${article.id}`}>
                              <img src={article.image} alt={article.title} />
                            </Link>
                          </div>
                          <div className="sidebar-blog-content">
                            <h6 className="sidebar-blog-title">
                              <Link href={`/${lang}/news/${article.id}`}>{article.title}</Link>
                            </h6>
                          </div>
                        </div>
                      ))}
                      {/* <div className="sidebar-blog-item">
                        <div className="sidebar-blog-thumb">
                          <a href="blog-details.html">
                            <img src="/assets/images/blog/sidebar/blog-sm-01.png" alt="image" />
                          </a>
                        </div>
                        <div className="sidebar-blog-content">
                          <h6 className="sidebar-blog-title">
                            <a href="blog-details.html"> Construction of a new high tech plant</a>
                          </h6>
                        </div>
                      </div>
                      <div className="sidebar-blog-item">
                        <div className="sidebar-blog-thumb">
                          <a href="blog-details.html">
                            <img src="/assets/images/blog/sidebar/blog-sm-02.png" alt="image" />
                          </a>
                        </div>
                        <div className="sidebar-blog-content">
                          <h6 className="sidebar-blog-title">
                            <a href="blog-details.html">
                              Building resilient supply chains for industries{" "}
                            </a>
                          </h6>
                        </div>
                      </div> */}
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
