import PageBanner from "@/app/components/pageBanner";
import React from "react";

export default function Videos() {
  return (
    <div>
      <PageBanner />

      <section className="rs-elements-portfolio-area section-space rs-portfolio-six">
        <div className="container">
          <div className="row  g-5 justify-content-center section-title-space align-items-center">
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
                    <path d="M3.14286 10L0 15L8.78104e-07 0L3.14286 5V10Z" fill="#EA5501"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.28571 10L3.14286 15L3.14286 10L4.71428 7.5L3.14286 5L3.14286 0L6.28571 5L6.28571 10ZM6.28571 10L7.85714 7.5L6.28571 5V0L11 7.5L6.28571 15V10Z"
                      fill="#EA5501"
                    ></path>
                  </svg>
                  Video
                </span>
                <h2 className="rs-section-title rs-split-text-enable split-in-fade">Videos</h2>
              </div>
            </div>
          </div>
          <div className="row g-5 process-counts">
            <div className="col-xl-6 col-lg-6">
              <div
                className="rs-portfolio-item wow fadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div
                  className="rs-portfolio-thumb relative"
                  style={{
                    backgroundImage: "url('/assets/images/portfolio/portfolio-thumb-26.png')",
                  }}
                >
                  {/* Gold Video Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-110">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* <div className="rs-portfolio-content">
                  <div className="rs-portfolio-number"></div>
                  <h5 className="rs-portfolio-title underline has-black">
                    <a href="portfolio-details.html">Oil &amp; Gas Industry</a>
                  </h5>
                  <div className="rs-portfolio-tag">
                    <a href="portfolio-details.html">Midstream</a>
                  </div>
                  <div className="rs-services-btn-wrapper">
                    <div className="rs-portfolio-text-btn underline has-black">
                      <a className="rs-text-btn" href="services-details.html">
                        View Details
                      </a>
                    </div>
                    <a
                      className="rs-square-btn has-icon has-light-bg has-black"
                      href="services-details.html"
                    >
                      <span className="icon-box">
                        <svg
                          className="icon-first"
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 5C0 4.60551 0.319797 4.28571 0.714286 4.28571L8.98985 4.28571L5.92349 1.21936C5.64455 0.940417 5.64455 0.488155 5.92349 0.209209C6.20244 -0.0697365 6.6547 -0.0697365 6.93365 0.209209L11.2194 4.49492C11.4983 4.77387 11.4983 5.22613 11.2194 5.50508L6.93365 9.79079C6.6547 10.0697 6.20244 10.0697 5.92349 9.79079C5.64455 9.51184 5.64455 9.05958 5.92349 8.78064L8.98985 5.71429L0.714286 5.71429C0.319797 5.71429 0 5.39449 0 5Z"
                            fill="#616161"
                          ></path>
                        </svg>
                        <svg
                          className="icon-second"
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 5C0 4.60551 0.319797 4.28571 0.714286 4.28571L8.98985 4.28571L5.92349 1.21936C5.64455 0.940417 5.64455 0.488155 5.92349 0.209209C6.20244 -0.0697365 6.6547 -0.0697365 6.93365 0.209209L11.2194 4.49492C11.4983 4.77387 11.4983 5.22613 11.2194 5.50508L6.93365 9.79079C6.6547 10.0697 6.20244 10.0697 5.92349 9.79079C5.64455 9.51184 5.64455 9.05958 5.92349 8.78064L8.98985 5.71429L0.714286 5.71429C0.319797 5.71429 0 5.39449 0 5Z"
                            fill="#616161"
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div
                className="rs-portfolio-item wow fadeInUp"
                data-wow-delay=".5s"
                data-wow-duration="1s"
              >
                <div
                  className="rs-portfolio-thumb relative"
                  style={{
                    backgroundImage: "url('/assets/images/portfolio/portfolio-thumb-27.png')",
                  }}
                >
                  {/* Gold Video Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-110">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* <div className="rs-portfolio-content">
                  <div className="rs-portfolio-number"></div>
                  <h5 className="rs-portfolio-title underline has-black">
                    <a href="portfolio-details.html">Metal Industry</a>
                  </h5>
                  <div className="rs-portfolio-tag">
                    <a href="portfolio-details.html">Innovative</a>
                  </div>
                  <div className="rs-services-btn-wrapper">
                    <div className="rs-portfolio-text-btn underline has-black">
                      <a className="rs-text-btn" href="services-details.html">
                        View Details
                      </a>
                    </div>
                    <a
                      className="rs-square-btn has-icon has-light-bg has-black"
                      href="services-details.html"
                    >
                      <span className="icon-box">
                        <svg
                          className="icon-first"
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 5C0 4.60551 0.319797 4.28571 0.714286 4.28571L8.98985 4.28571L5.92349 1.21936C5.64455 0.940417 5.64455 0.488155 5.92349 0.209209C6.20244 -0.0697365 6.6547 -0.0697365 6.93365 0.209209L11.2194 4.49492C11.4983 4.77387 11.4983 5.22613 11.2194 5.50508L6.93365 9.79079C6.6547 10.0697 6.20244 10.0697 5.92349 9.79079C5.64455 9.51184 5.64455 9.05958 5.92349 8.78064L8.98985 5.71429L0.714286 5.71429C0.319797 5.71429 0 5.39449 0 5Z"
                            fill="#616161"
                          ></path>
                        </svg>
                        <svg
                          className="icon-second"
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 5C0 4.60551 0.319797 4.28571 0.714286 4.28571L8.98985 4.28571L5.92349 1.21936C5.64455 0.940417 5.64455 0.488155 5.92349 0.209209C6.20244 -0.0697365 6.6547 -0.0697365 6.93365 0.209209L11.2194 4.49492C11.4983 4.77387 11.4983 5.22613 11.2194 5.50508L6.93365 9.79079C6.6547 10.0697 6.20244 10.0697 5.92349 9.79079C5.64455 9.51184 5.64455 9.05958 5.92349 8.78064L8.98985 5.71429L0.714286 5.71429C0.319797 5.71429 0 5.39449 0 5Z"
                            fill="#616161"
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
