import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import Link from "next/link";
import ModernSlider from "@/app/components/ModernSlider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Fund(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  // Define slider images
  const sliderImages = [
    "/assets/images/gallery/sustainable/fund/cover1.jpg",
    "/assets/images/gallery/sustainable/fund/cover2.jpg",
    "/assets/images/gallery/sustainable/fund/cover3.jpg",
  ];

  return (
    <div>
      <PageBanner pageName={t.sustainable?.fund?.pageTitle ?? "News"} />
      <section className="rs-postbox-area section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-8">
              <div className="rs-postbox-details-wrapper">
                <div className="rs-postbox-content">
                  <h3 className="rs-postbox-details-title">{t.sustainable?.fund?.pageTitle}</h3>
                </div>

                {/* Modern Swiper Slider */}
                <ModernSlider
                  images={sliderImages}
                  height="450px"
                  autoplay={true}
                  effect="fade"
                  showTitles={false}
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="rs-sidebar-wrapper rs-sidebar-sticky">
                <div className="sidebar-widget mb-30">
                  <div className="sidebar-search">
                    <form action="#">
                      <div className="sidebar-search-input">
                        <input type="text" placeholder="Searching..." />
                        <button type="submit">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.11111 15.2222C12.0385 15.2222 15.2222 12.0385 15.2222 8.11111C15.2222 4.18375 12.0385 1 8.11111 1C4.18375 1 1 4.18375 1 8.11111C1 12.0385 4.18375 15.2222 8.11111 15.2222Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M16.9995 17L13.1328 13.1333"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="sidebar-widget mb-30">
                  <h5 className="sidebar-widget-title">{t.menu.kb_project}</h5>
                  <div className="sidebar-widget-content">
                    <div className="sidebar-blog-item-wrapper">
                      <div className="sidebar-blog-item">
                        <div className="sidebar-blog-thumb">
                          <Link href={`/${lang}/geology-deposit`}>
                            <img src="/assets/images/gallery/khb/cover2.jpg" alt="image" />
                          </Link>
                        </div>
                        <div className="sidebar-blog-content">
                          <h6 className="sidebar-blog-title">
                            <Link href={`/${lang}/geology-deposit`}>{t.medee5.pageTitle}</Link>
                          </h6>
                        </div>
                      </div>
                      <div className="sidebar-blog-item">
                        <div className="sidebar-blog-thumb">
                          <Link href={`/${lang}/project-timeline`}>
                            <img src="/assets/images/gallery/khb/7.png" alt="image" />
                          </Link>
                        </div>
                        <div className="sidebar-blog-content">
                          <h6 className="sidebar-blog-title">
                            <Link href={`/${lang}/project-timeline`}>{t.history.pageTitle}</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
