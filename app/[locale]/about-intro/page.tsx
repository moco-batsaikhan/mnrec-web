import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
// import Link from "next/link";
import "./style.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function AboutIntro(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);
  return (
    <div>
      <PageBanner pageName={t.about.aboutUs} />

      <section id="homeabout" className="rs-about-area section-space-ab rs-about-eight">
        <div className="rs-about-shape-one">
          <img src="/assets/images/shape/about-shape-03.png" alt="image" />
        </div>
        <div className="rs-about-shape-two">
          <img src="/assets/images/shape/about-shape-04.png" alt="image" />
        </div>
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-5 col-lg-5">
              <div className="rs-about-thumb-wrapper">
                <div className="rs-about-thumb img-one">
                  <img src="/assets/images/about/10.png" alt="image" />
                </div>
                <div className="rs-about-thumb img-two">
                  <img src="/assets/images/about/9.png" alt="image" />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="rs-about-wrapper">
                <div className="rs-about-content-wrapper">
                  <div className="rs-section-title-wrapper">
                    <span className="rs-section-subtitle has-theme-yellow justify-content-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="15"
                        viewBox="0 0 11 15"
                        fill="none"
                      >
                        <path
                          d="M3.14286 10L0 15L8.78104e-07 0L3.14286 5V10Z"
                          fill="#EA5501"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.28571 10L3.14286 15L3.14286 10L4.71428 7.5L3.14286 5L3.14286 0L6.28571 5L6.28571 10ZM6.28571 10L7.85714 7.5L6.28571 5V0L11 7.5L6.28571 15V10Z"
                          fill="#EA5501"
                        ></path>
                      </svg>
                      {t.about.aboutUs}
                    </span>
                    <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                      {t.about.heading}
                    </h2>
                    <p className="descrip">{t.about.introduction}</p>
                  </div>
                  <p>{t.about.shortDescription}</p>
                  <div className="rs-about-feature-list">
                    <div className="rs-list-item has-theme-yellow">
                      <ul>
                        {t.about.licenses.map(lic => (
                          <li key={lic}>
                            <svg
                              className="icon-check"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                              style={{ display: "block", marginBottom: 6 }}
                            >
                              <path
                                d="M13.485 3.485a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L6 10.172l6.293-6.293a1 1 0 0 1 1.414 0z"
                                fill="#00b0b0"
                              />
                            </svg>
                            <div className="rs-list-text">{lic}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="rs-counter-area rs-counter-one counter-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="rs-counter-item">
                <div className="rs-counter-inner">
                  <div className="rs-counter-number-wrapper">
                    <span className="rs-counter-number odometer" data-count="50">
                      18
                    </span>
                    <span className="prefix">+</span>
                  </div>
                  <span className="rs-counter-title">{t.about.counter1Title}</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="rs-counter-item">
                <div className="rs-counter-inner">
                  <div className="rs-counter-number-wrapper">
                    <span className="rs-counter-number odometer" data-count="49">
                      32
                    </span>
                    <span className="prefix">%</span>
                  </div>
                  <span className="rs-counter-title">{t.about.counter2Title}</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="rs-counter-item">
                <div className="rs-counter-inner">
                  <div className="rs-counter-number-wrapper">
                    <span className="rs-counter-number odometer" data-count="20">
                      24
                    </span>
                    <span className="prefix">m</span>
                  </div>
                  <span className="rs-counter-title">{t.about.counter3Title}</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="rs-counter-item">
                <div className="rs-counter-inner">
                  <div className="rs-counter-number-wrapper">
                    <span className="rs-counter-number odometer" data-count="25">
                      17
                    </span>
                    <span className="prefix">k</span>
                  </div>
                  <span className="rs-counter-title">{t.about.counter4Title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="feature-section" className="feature-section pad-top-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="feature-box-wrap about-box relative">
                <div className="feature-box-details">
                  <div className="feature-icon mb-4">
                    <svg
                      className="ti-flag b-radius-50 d-block"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="12" fill="#FFF7E6" />
                      <path
                        d="M7 7c2-1.2 4 0 6 0s4-1 6-2v10c-2 1-4 0-6 0s-4 1-6 2V7z"
                        fill="#F6A800"
                        opacity="0.95"
                      />
                      <rect x="5" y="4" width="1" height="16" rx="0.5" fill="#8C6A00" />
                    </svg>
                  </div>
                  <div className="feature-content">
                    <div className="feature-title relative margin-bottom-10">
                      <h4>{t.about.mission}</h4>
                    </div>
                    <p className="mb-0 box-size">{t.about.visionText}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="feature-box-wrap about-box relative">
                <div className="feature-box-details">
                  <div className="feature-icon mb-4">
                    <svg
                      className="ti-flag b-radius-50 d-block"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="12" fill="#FFF7E6" />
                      <path
                        d="M7 7c2-1.2 4 0 6 0s4-1 6-2v10c-2 1-4 0-6 0s-4 1-6 2V7z"
                        fill="#F6A800"
                        opacity="0.95"
                      />
                      <rect x="5" y="4" width="1" height="16" rx="0.5" fill="#8C6A00" />
                    </svg>
                  </div>
                  <div className="feature-content">
                    <div className="feature-title relative margin-bottom-10">
                      <h4>{t.about.visionTitle}</h4>
                    </div>
                    <p className="mb-0 box-size">{t.about.visionText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rs-about-area section-space rs-about-twelve">
        <div className="container">
          {/* <div className="row  g-5 justify-content-center section-title-space align-items-center">
            <div className="col-xxl-8 col-xl-9 col-lg-9">
              <div className="rs-section-title-wrapper text-center">
                <span className="rs-section-subtitle has-theme-orange">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="15"
                    viewBox="0 0 11 15"
                    fill="none"
                  >
                    <path d="M3.14286 10L0 15L8.78104e-07 0L3.14286 5V10Z" fill="#00b0b0"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.28571 10L3.14286 15L3.14286 10L4.71428 7.5L3.14286 5L3.14286 0L6.28571 5L6.28571 10ZM6.28571 10L7.85714 7.5L6.28571 5V0L11 7.5L6.28571 15V10Z"
                      fill="#00b0b0"
                    ></path>
                  </svg>
                  About Industrie
                </span>
                <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                  Welcome to Industrie, a leading industry innovator with a rich history of
                  excellence.
                </h2>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
