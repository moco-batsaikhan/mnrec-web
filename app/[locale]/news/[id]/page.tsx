import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  const paths = [];

  for (const locale of locales) {
    for (let i = 1; i <= 7; i++) {
      paths.push({
        locale,
        id: i.toString(),
      });
    }
  }

  return paths;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function NewsDetailPage(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  const newsId = params?.id || "1";

  const getNewsArticle = (id: string) => {
    const newsKey = id === "1" ? "news1" : `news${id}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (t.videos as any)[newsKey] || (t.videos as any).news1;
  };

  const newsArticle = getNewsArticle(newsId);
  const newsData = {
    id: newsId,
    title: newsArticle?.title || "News Title",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: (newsArticle as any)?.htmlContent || "News content",
    intro: newsArticle?.intro || "News intro",
    author: "MNREC",
    date:
      newsId === "1"
        ? "2024 оны 3-р сар"
        : newsId === "2"
        ? "2024 оны 2-р сар"
        : newsId === "3"
        ? "2024 оны 1-р сар"
        : newsId === "4"
        ? "2023 оны 12-р сар"
        : newsId === "5"
        ? "2023 оны 11-р сар"
        : newsId === "6"
        ? "2023 оны 10-р сар"
        : "2023 оны 9-р сар",
    image: `/assets/images/blog/post/news-${newsId}.avif`,
  };

  return (
    <div>
      <PageBanner pageName={newsData.title} />
      <section className="rs-postbox-area section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-8">
              <div className="rs-postbox-details-wrapper">
                <div className="rs-postbox-details-thumb">
                  <img
                    src={`/assets/images/gallery/news/news-${newsId}.avif`}
                    alt={newsData.title}
                  />
                </div>
                <div className="rs-postbox-content">
                  <div className="rs-postbox-meta-list">
                    <div className="rs-postbox-meta-item">
                      <span className="rs-meta-text">
                        By
                        <span className="meta-author">{newsData.author}</span>
                      </span>
                    </div>
                    <div className="rs-postbox-meta-item">
                      <span className="rs-postbox-meta-text">{newsData.date}</span>
                    </div>
                  </div>
                  <h3 className="rs-postbox-details-title">{newsData.title}</h3>
                  <p>{newsData.intro}</p>
                </div>
                <div className="rs-postbox-details-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: newsData.content
                        .split("\n")
                        .map((paragraph: string) => `<p>${paragraph}</p>`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4">
              <aside className="rs-postbox-sidebar">
                <div className="rs-postbox-sidebar-widget search-widget"></div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
