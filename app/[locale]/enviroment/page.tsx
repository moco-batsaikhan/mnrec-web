import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import Link from "next/link";
import "./style.css";
import ModernSlider from "@/app/components/ModernSlider";
import BoldBeforeColon from "@/app/components/BoldBeforeColon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Environment(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  // Define slider images for environment page
  const environmentImages = [
    "/assets/images/gallery/sustainable/cover2.jpg",
    "/assets/images/gallery/sustainable/cover3.jpg",
    "/assets/images/gallery/sustainable/cover4.jpg",
    "/assets/images/gallery/sustainable/cover5.jpg",
    "/assets/images/gallery/sustainable/cover6.jpg",
    "/assets/images/gallery/sustainable/cover7.jpg",
    "/assets/images/gallery/sustainable/cover8.jpg",
  ];

  const environmentTitles = [
    t.sustainable.enviroment.tabTitle1,
    t.sustainable.enviroment.tabTitle2,
    t.sustainable.enviroment.tabTitle3,
    t.sustainable.enviroment.tabTitle4,
    t.sustainable.enviroment.tabTitle5,
    t.sustainable.enviroment.tabTitle6,
    t.sustainable.enviroment.newsTitle,
  ];

  return (
    <div>
      <PageBanner
        bannerImage={"/assets/images/gallery/sustainable/cover1.jpg"}
        pageName={t.menu.environment ?? "Environment"}
      />
      <section className="rs-postbox-area section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-12 col-lg-12">
              <div className="rs-postbox-details-wrapper">
                {/* <div className="rs-postbox-details-thumb">
                  <img src="/assets/images/gallery/sustainable/cover1.jpg" alt="image" />
                </div> */}
                <div className="rs-postbox-content">
                  <h3 className="rs-postbox-details-title">{t.sustainable.enviroment.newsTitle}</h3>
                </div>
                <BoldBeforeColon>
                  <div
                  className="rs-postbox-details-content"
                      dangerouslySetInnerHTML={{
                        __html: t.sustainable.enviroment.newsDescription
                          .split("\n")
                          .map((paragraph: string) => `${paragraph}`)
                          .join(""),
                      }}
                    />
                </BoldBeforeColon>

                {/* Modern Swiper Slider */}
                <ModernSlider
                  images={environmentImages}
                  titles={environmentTitles}
                  height="450px"
                  autoplay={true}
                  effect="fade"
                />
                <h3 className="rs-postbox-details-feature-title mb-20">
                  {t.sustainable.enviroment.tabMainTitle1}
                </h3>
                <div className="environment-section">
                  <div className="vertical-title">
                    <span>{t.sustainable.enviroment.tabTitle1}</span>
                  </div>
                  <div className="description-list">
                    <ul>
                      <li>{t.sustainable.enviroment.tabDescription11}</li>
                      <li>{t.sustainable.enviroment.tabDescription12}</li>
                      <li>{t.sustainable.enviroment.tabDescription13}</li>
                      <li>{t.sustainable.enviroment.tabDescription14}</li>
                    </ul>
                  </div>
                </div>

                {/* Social Section - Short Term */}
                <div className="environment-section">
                  <div className="vertical-title">
                    <span>{t.sustainable.enviroment.tabTitle2}</span>
                  </div>
                  <div className="description-list">
                    <ul>
                      <li>{t.sustainable.enviroment.tabDescription21}</li>
                      <li>{t.sustainable.enviroment.tabDescription22}</li>
                      <li>{t.sustainable.enviroment.tabDescription23}</li>
                      <li>{t.sustainable.enviroment.tabDescription24}</li>
                      <li>{t.sustainable.enviroment.tabDescription25}</li>
                      <li>{t.sustainable.enviroment.tabDescription26}</li>
                      <li>{t.sustainable.enviroment.tabDescription27}</li>
                    </ul>
                  </div>
                </div>

                {/* Governance Section - Short Term */}
                <div className="environment-section">
                  <div className="vertical-title">
                    <span>{t.sustainable.enviroment.tabTitle3}</span>
                  </div>
                  <div className="description-list">
                    <ul>
                      <li>{t.sustainable.enviroment.tabDescription31}</li>
                      <li>{t.sustainable.enviroment.tabDescription32}</li>
                      <li>{t.sustainable.enviroment.tabDescription33}</li>
                      <li>{t.sustainable.enviroment.tabDescription34}</li>
                    </ul>
                  </div>
                </div>
                <h3 className="rs-postbox-details-feature-title mb-20">
                  {t.sustainable.enviroment.tabMainTitle2}
                </h3>

                {/* Environmental Section */}
                <div className="environment-section">
                  <div className="vertical-title">
                    <span>{t.sustainable.enviroment.tabTitle4}</span>
                  </div>
                  <div className="description-list">
                    <ul>
                      <li>{t.sustainable.enviroment.tabDescription41}</li>
                      <li>{t.sustainable.enviroment.tabDescription42}</li>
                      <li>{t.sustainable.enviroment.tabDescription43}</li>
                      <li>{t.sustainable.enviroment.tabDescription44}</li>
                      <li>{t.sustainable.enviroment.tabDescription45}</li>
                      <li>{t.sustainable.enviroment.tabDescription46}</li>
                    </ul>
                  </div>
                </div>

                {/* Social Section */}
                <div className="environment-section">
                  <div className="vertical-title">
                    <span>{t.sustainable.enviroment.tabTitle5}</span>
                  </div>
                  <div className="description-list">
                    <ul>
                      <li>{t.sustainable.enviroment.tabDescription51}</li>
                      <li>{t.sustainable.enviroment.tabDescription52}</li>
                      <li>{t.sustainable.enviroment.tabDescription53}</li>
                      <li>{t.sustainable.enviroment.tabDescription54}</li>
                      <li>{t.sustainable.enviroment.tabDescription55}</li>
                      <li>{t.sustainable.enviroment.tabDescription56}</li>
                      <li>{t.sustainable.enviroment.tabDescription57}</li>
                      <li>{t.sustainable.enviroment.tabDescription58}</li>
                    </ul>
                  </div>
                </div>

                {/* Governance Section */}
                <div className="environment-section">
                  <div className="vertical-title">
                    <span>{t.sustainable.enviroment.tabTitle6}</span>
                  </div>
                  <div className="description-list">
                    <ul>
                      <li>{t.sustainable.enviroment.tabDescription61}</li>
                      <li>{t.sustainable.enviroment.tabDescription62}</li>
                      <li>{t.sustainable.enviroment.tabDescription63}</li>
                      <li>{t.sustainable.enviroment.tabDescription64}</li>
                    </ul>
                  </div>
                </div>

                {/* Modern Swiper Slider */}
                {/* <ModernSlider
                  images={environmentImages}
                  titles={environmentTitles}
                  height="450px"
                  autoplay={true}
                  effect="fade"
                /> */}
              </div>
            </div>
            {/* <div className="col-xl-4 col-lg-4">
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
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
