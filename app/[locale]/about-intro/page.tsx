import PageBanner from "@/app/components/pageBanner";
import React from "react";

export default function AboutIntro() {
  return (
    <div>
      <PageBanner />

      <section className="rs-about-area section-space rs-about-twelve">
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
          </div>
          <div className="row g-5">
            <div className="col-xl-6 col-lg-6">
              <div className="rs-about-wrapper">
                <div className="rs-about-shape">
                  <img src="/assets/images/shape/about-shape-06.png" alt="image" />
                </div>
                <div className="rs-about-thumb">
                  <img src="/assets/images/about/about-thumb-18.png" alt="image" />
                </div>
                <div className="rs-about-content">
                  <h6 className="rs-about-title">Our Mission</h6>
                  <p>
                    Welcome to Industrie, a leading industry innovator with a rich history of
                    excellence. With a passion for precision.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="rs-about-wrapper">
                <div className="rs-about-shape">
                  <img src="/assets/images/shape/about-shape-07.png" alt="image" />
                </div>
                <div className="rs-about-thumb">
                  <img src="/assets/images/about/about-thumb-19.png" alt="image" />
                </div>
                <div className="rs-about-content">
                  <h6 className="rs-about-title">Our Vision</h6>
                  <p>
                    We have been empowering industries and driving progress for over 30 years. Our
                    diverse team of experts brings together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rs-about-area section-space-bottom rs-about-one">
        <div className="container">
          <div className="row  g-5">
            <div className="col-xl-7 col-lg-7">
              <div className="rs-section-title-wrapper">
                <span className="rs-section-subtitle has-theme-orange justify-content-start">
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
                  About Us
                </span>
                <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                  We work for you <span className="rs-theme-orange">since 1989.</span>
                  Industrial around the world
                </h2>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5">
              <div className="rs-about-content">
                <div className="rs-about-description">
                  <p className="descrip-1">
                    Welcome to Industrie, a leading industry innovator with a rich history of
                    excellence.
                  </p>
                  <p className="descrip-2">
                    At the heart of the global landscape, the industry stands as a multidimensional
                    force of progress, driving economies.{" "}
                  </p>
                </div>
                <div className="rs-about-btn">
                  <a className="rs-btn has-theme-orange has-icon has-bg" href="about.html">
                    Discover
                    {/* <span className="icon-box">
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
                    </span> */}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div
                className="rs-about-thumb wow fadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div
                  className="rs-about-bg-thumb"
                  style={{ backgroundImage: "url('/assets/images/about/about-thumb-01.png')" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rs-history-area section-space rs-history-one">
        <div
          className="rs-history-bg-thumb"
          style={{ backgroundImage: "url('/assets/images/bg/history.jpg')" }}
        ></div>
        <div className="container">
          <div className="row  g-5 justify-content-center section-title-space align-items-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6">
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
                  Our History
                </span>
                <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                  Company Journey
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-9 col-xl-10">
              <div className="rs-history-tab-wrapper">
                <div className="rs-history-tab">
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-item-one-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-item-one"
                        type="button"
                        role="tab"
                        aria-controls="pills-item-one"
                        aria-selected="true"
                      >
                        In 1990
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-item-two-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-item-two"
                        type="button"
                        role="tab"
                        aria-controls="pills-item-two"
                        aria-selected="false"
                      >
                        {" "}
                        In 2000
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-item-three-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-item-three"
                        type="button"
                        role="tab"
                        aria-controls="pills-item-three"
                        aria-selected="false"
                      >
                        In 2007
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-item-four-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-item-four"
                        type="button"
                        role="tab"
                        aria-controls="pills-item-three"
                        aria-selected="false"
                      >
                        In 2018
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-item-five-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-item-five"
                        type="button"
                        role="tab"
                        aria-controls="pills-item-three"
                        aria-selected="false"
                      >
                        In 2024
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="rs-history-tab-content-wrapper">
                  <div className="tab-content rs-history-tab-anim" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-item-one"
                      role="tabpanel"
                      aria-labelledby="pills-item-one-tab"
                    >
                      <div className="rs-history-tab-item">
                        <div className="rs-history-tab-thumb">
                          <img src="/assets/images/history/history-thumb-01.png" alt="image" />
                        </div>
                        <div className="rs-history-tab-content">
                          <h5 className="rs-history-tab-title">Journey Was Started</h5>
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence. With a passion for precision and a commitment to quality,
                            we have been empowering industries and driving progress.{" "}
                          </p>
                          <div className="rs-history-tab-list">
                            <div className="rs-list-item">
                              <ul>
                                <li>Quality Control System</li>
                                <li>Building Quality Industrial</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-item-two"
                      role="tabpanel"
                      aria-labelledby="pills-item-two-tab"
                    >
                      <div className="rs-history-tab-item">
                        <div className="rs-history-tab-thumb">
                          <img src="/assets/images/history/history-thumb-02.png" alt="image" />
                        </div>
                        <div className="rs-history-tab-content">
                          <h5 className="rs-history-tab-title">Journey Was Started</h5>
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence. With a passion for precision and a commitment to quality,
                            we have been empowering industries and driving progress.{" "}
                          </p>
                          <div className="rs-history-tab-list">
                            <div className="rs-list-item">
                              <ul>
                                <li>Quality Control System</li>
                                <li>Building Quality Industrial</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-item-three"
                      role="tabpanel"
                      aria-labelledby="pills-item-three-tab"
                    >
                      <div className="rs-history-tab-item">
                        <div className="rs-history-tab-thumb">
                          <img src="/assets/images/history/history-thumb-03.png" alt="image" />
                        </div>
                        <div className="rs-history-tab-content">
                          <h5 className="rs-history-tab-title">Journey Was Started</h5>
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence. With a passion for precision and a commitment to quality,
                            we have been empowering industries and driving progress.{" "}
                          </p>
                          <div className="rs-history-tab-list">
                            <div className="rs-list-item">
                              <ul>
                                <li>Quality Control System</li>
                                <li>Building Quality Industrial</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-item-four"
                      role="tabpanel"
                      aria-labelledby="pills-item-four-tab"
                    >
                      <div className="rs-history-tab-item">
                        <div className="rs-history-tab-thumb">
                          <img src="/assets/images/history/history-thumb-04.png" alt="image" />
                        </div>
                        <div className="rs-history-tab-content">
                          <h5 className="rs-history-tab-title">Journey Was Started</h5>
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence. With a passion for precision and a commitment to quality,
                            we have been empowering industries and driving progress.{" "}
                          </p>
                          <div className="rs-history-tab-list">
                            <div className="rs-list-item">
                              <ul>
                                <li>Quality Control System</li>
                                <li>Building Quality Industrial</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-item-five"
                      role="tabpanel"
                      aria-labelledby="pills-item-five-tab"
                    >
                      <div className="rs-history-tab-item">
                        <div className="rs-history-tab-thumb">
                          <img src="/assets/images/history/history-thumb-05.png" alt="image" />
                        </div>
                        <div className="rs-history-tab-content">
                          <h5 className="rs-history-tab-title">Journey Was Started</h5>
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence. With a passion for precision and a commitment to quality,
                            we have been empowering industries and driving progress.{" "}
                          </p>
                          <div className="rs-history-tab-list">
                            <div className="rs-list-item">
                              <ul>
                                <li>Quality Control System</li>
                                <li>Building Quality Industrial</li>
                              </ul>
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
        </div>
      </section>
      {/* <div className="rs-video-area rs-video-one has-theme-orange">
        <div className="container">
          <div className="rs-video-wrapper jarallax">
            <div
              className="rs-video-bg-thumb jarallax-img"
              style={{ backgroundImage: "url('/assets/images/bg/video-bg-08.png')" }}
            ></div>
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
      </div> */}
      <div className="rs-counter-area rs-counter-one section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="rs-counter-item">
                <div className="rs-counter-inner">
                  <div className="rs-counter-number-wrapper">
                    <span className="rs-counter-number odometer" data-count="50">
                      00
                    </span>
                    <span className="prefix">+</span>
                  </div>
                  <span className="rs-counter-title">Drilling Fields</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="rs-counter-item">
                <div className="rs-counter-inner">
                  <div className="rs-counter-number-wrapper">
                    <span className="rs-counter-number odometer" data-count="49">
                      00
                    </span>
                    <span className="prefix">%</span>
                  </div>
                  <span className="rs-counter-title">Crane Equipment</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="rs-counter-item">
                <div className="rs-counter-inner">
                  <div className="rs-counter-number-wrapper">
                    <span className="rs-counter-number odometer" data-count="20">
                      00
                    </span>
                    <span className="prefix">m</span>
                  </div>
                  <span className="rs-counter-title">Metal Factory</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="rs-counter-item">
                <div className="rs-counter-inner">
                  <div className="rs-counter-number-wrapper">
                    <span className="rs-counter-number odometer" data-count="25">
                      00
                    </span>
                    <span className="prefix">k</span>
                  </div>
                  <span className="rs-counter-title">Drilling Fields</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
