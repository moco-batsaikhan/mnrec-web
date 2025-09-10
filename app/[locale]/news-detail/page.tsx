import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function NewsDetailPage(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  return (
    <div>
      <PageBanner pageName={t.menu.latest_news ?? "News"} />
      <section className="rs-postbox-area section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-8">
              <div className="rs-postbox-details-wrapper">
                <div className="rs-postbox-details-thumb">
                  <img src="/assets/images/blog/details/blog-details-01.png" alt="image" />
                </div>
                <div className="rs-postbox-content">
                  <div className="rs-postbox-meta-list">
                    <div className="rs-postbox-meta-item">
                      <span className="rs-meta-text">
                        By
                        <a className="meta-author" href="blog-details.html">
                          Industrie
                        </a>
                      </span>
                    </div>
                    <div className="rs-postbox-meta-item">
                      <span className="rs-postbox-meta-text">February 8, 2025</span>
                    </div>
                  </div>
                  <h3 className="rs-postbox-details-title">
                    Construction of a new high tech plant in washingtons
                  </h3>
                </div>
                <div className="rs-postbox-details-content">
                  <p>
                    Industry’s standard dummy text ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type specimen book et iusto
                    odio dignissimos ducimus.
                  </p>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                    excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                    officia deserunt mollitia animi, id est laborum et dolorum fuga harum quidem
                    rerum facilis est et expedita distinctio.
                  </p>
                  <div className="rs-postbox-quote quote-two">
                    <blockquote>
                      <p>
                        “We can easily manage if we will only take, each day, the burden appointed
                        to it. But the load will be too heavy for us if we carry yesterday’s burden
                        over again today, and then add the burden of the morrow before we are
                        required to bear it factorial non.”
                      </p>
                      <cite>Robert Calibo</cite>
                    </blockquote>
                  </div>
                  <h3 className="rs-postbox-details-feature-title mb-20">
                    Growth and meaning of mechanical technology
                  </h3>
                  <p>
                    Industry’s standard dummy text ever since the when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It was popularised
                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages.
                  </p>
                  <div className="rs-postbox-details-thumb-wrapper mb-30">
                    <div className="row g-5">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <div className="rs-postbox-details-thumb">
                          <img src="/assets/images/blog/details/blog-details-02.png" alt="image" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <div className="rs-postbox-details-thumb">
                          <img src="/assets/images/blog/details/blog-details-03.png" alt="image" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="rs-postbox-details-feature-title mb-20">
                    Engineering and mechanics money for a better future.
                  </h3>
                  <p>
                    Industry’s standard dummy text ever since the when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It was popularised
                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages.
                  </p>
                  <div className="rs-postbox-details-feature">
                    <ul>
                      <li>Prepare Documentation </li>
                      <li>Industry Standard Dummy </li>
                      <li>Brand Consistency </li>
                    </ul>
                  </div>
                  <div className="rs-postbox-details-video">
                    <div
                      className="rs-postbox-details-bg-thumb"
                      data-background="/assets/images/bg/video-bg-07.png"
                    >
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-xl-7 col-lg-8 col-md-10">
                            <div className="rs-video-content text-center">
                              <div className="rs-video-play-btn">
                                <a
                                  href="https://www.youtube.com/watch?v=go7QYaQR494"
                                  className="rs-play-btn popup-video has-theme-orange"
                                >
                                  <i className="fa-duotone fa-play"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                    excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                    officia deserunt mollitia animi.{" "}
                  </p>
                </div>
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
                  <h5 className="sidebar-widget-title">Recent Posts</h5>
                  <div className="sidebar-widget-content">
                    <div className="sidebar-blog-item-wrapper">
                      <div className="sidebar-blog-item">
                        <div className="sidebar-blog-thumb">
                          <a href="blog-details.html">
                            <img src="/assets/images/blog/sidebar/blog-sm-01.png" alt="image" />
                          </a>
                        </div>
                        <div className="sidebar-blog-content">
                          <h6 className="sidebar-blog-title">
                            <a href="blog-details.html"> Construction of a new high tech plant</a>
                          </h6>
                          <div className="sidebar-blog-meta">
                            <i className="ri-calendar-line"></i>
                            <span>May 20, 2024</span>
                          </div>
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
                          <div className="sidebar-blog-meta">
                            <i className="ri-calendar-line"></i>
                            <span>May 20, 2024</span>
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-blog-item">
                        <div className="sidebar-blog-thumb">
                          <a href="blog-details.html">
                            <img src="/assets/images/blog/sidebar/blog-sm-03.png" alt="image" />
                          </a>
                        </div>
                        <div className="sidebar-blog-content">
                          <h6 className="sidebar-blog-title">
                            <a href="blog-details.html">
                              Factories technologies in interactive and plants{" "}
                            </a>
                          </h6>
                          <div className="sidebar-blog-meta">
                            <i className="ri-calendar-line"></i>
                            <span>May 20, 2024</span>
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-blog-item">
                        <div className="sidebar-blog-thumb">
                          <a href="blog-details.html">
                            <img src="/assets/images/blog/sidebar/blog-sm-01.png" alt="image" />
                          </a>
                        </div>
                        <div className="sidebar-blog-content">
                          <h6 className="sidebar-blog-title">
                            <a href="blog-details.html">
                              Building resilient supply for industries and factorie{" "}
                            </a>
                          </h6>
                          <div className="sidebar-blog-meta">
                            <i className="ri-calendar-line"></i>
                            <span>May 20, 2024</span>
                          </div>
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
