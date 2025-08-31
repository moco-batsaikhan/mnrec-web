import React from "react";

export default function HomeAbout() {
  return (
    <>
      {/* <section className="rs-about-area section-space rs-about-two">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="rs-about-wrapper">
                <div className="rs-about-content-wrapper">
                  <div className="rs-section-title-wrapper">
                    <span className="rs-section-subtitle has-theme-red justify-content-start">
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
                      About industrie
                    </span>
                    <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                      We work for you <span className="rs-theme-red">since 1989</span>. Industrial
                      around the world
                    </h2>
                    <p className="descrip">
                      Welcome to Industrie, a leading industry innovator with a rich history of
                      excellence.
                    </p>
                  </div>
                  <div className="rs-about-tab">
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
                          Our History
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
                          Our Mission
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
                          Our Vision
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="rs-aobut-tab-content-wrapper">
                    <div className="tab-content rs-about-tab-anim" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-item-one"
                        role="tabpanel"
                        aria-labelledby="pills-item-one-tab"
                      >
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for{" "}
                            <span className="fw-6">over 30 years.</span>
                          </p>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-item-two"
                        role="tabpanel"
                        aria-labelledby="pills-item-two-tab"
                      >
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for{" "}
                            <span className="fw-6">over 30 years.</span>
                          </p>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-item-three"
                        role="tabpanel"
                        aria-labelledby="pills-item-three-tab"
                      >
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for{" "}
                            <span className="fw-6">over 30 years.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rs-about-author-info">
                    <div className="rs-about-btn">
                      <a className="rs-btn has-theme-red has-icon" href="about.html">
                        Explore More
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
                      </a>
                    </div>
                    <div className="rs-about-author">
                      <div className="rs-about-author-thumb">
                        <img src="/assets/images/user/user-thumb-04.png" alt="image" />
                      </div>
                      <div className="rs-about-author-sign-thumb">
                        <img src="/assets/images/shape/sign-shape.png" alt="image" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rs-about-thumb rs-image scroll_reveal reveal_left reveal-active">
                  <img decoding="async" src="/assets/images/about/about-thumb-02.png" alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section id="homeabout" className="rs-about-area section-space rs-about-four">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-6 col-lg-6">
              <div className="rs-about-thumb-wrapper">
                <div className="rs-about-thumb-left-part">
                  <div className="rs-about-thumb">
                    <img src="assets/images/about/about-thumb-04.png" alt="image" />
                  </div>
                  <div className="rs-about-video-btn">
                    <div className="rs-rotate-btn">
                      <a
                        href="https://www.youtube.com/watch?v=Yue48fUXuqI"
                        className="rs-play-btn popup-video has-theme-red"
                      >
                        <i className="ri-play-fill"></i>
                      </a>
                      <div className="rs-circle-title gsap-rotate rs-text-circle-wrapper">
                        <div className="rs-text-circle" data-rotate-degree="13.33">
                          Watch Video - Watch Video -
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rs-about-thumb-right-part">
                  <div className="rs-about-counter">
                    <div className="rs-counter-inner">
                      <div className="rs-counter-number-wrapper">
                        <span className="rs-counter-number odometer" data-count="52">
                          00
                        </span>
                        <span className="prefix">+</span>
                      </div>
                      <span className="rs-counter-title">Years of Experience</span>
                    </div>
                  </div>
                  <div className="rs-about-thumb has-large-thumb rs-image scroll_reveal reveal_left reveal-active">
                    <img
                      decoding="async"
                      src="assets/images/about/about-thumb-05.png"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="rs-about-wrapper">
                <div className="rs-about-content-wrapper">
                  <div className="rs-section-title-wrapper">
                    <span className="rs-section-subtitle  has-bg-field justify-content-start">
                      About Us
                    </span>
                    <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                      We largest independent metallurgy solutions
                    </h2>
                    <p className="descrip">
                      We solve worldwide industrial every problem, the heart of global landscape the
                      industry stands multidimensional electronic typesetting.
                    </p>
                  </div>
                  <div className="rs-about-tab">
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
                          Our History
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
                          Our Mission
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
                          Our Vision
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="rs-aobut-tab-content-wrapper">
                    <div className="tab-content rs-about-tab-anim" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-item-one"
                        role="tabpanel"
                        aria-labelledby="pills-item-one-tab"
                      >
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for
                          </p>
                          <div className="rs-about-feature-list">
                            <div className="rs-list-item has-theme-red">
                              <ul>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Quality Control System
                                </li>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Building Quality Industrial
                                </li>
                              </ul>
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
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for
                          </p>
                          <div className="rs-about-feature-list">
                            <div className="rs-list-item has-theme-red">
                              <ul>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Quality Control System
                                </li>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Building Quality Industrial
                                </li>
                              </ul>
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
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for
                          </p>
                          <div className="rs-about-feature-list">
                            <div className="rs-list-item has-theme-red">
                              <ul>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Quality Control System
                                </li>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Building Quality Industrial
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rs-about-author-info">
                    <div className="rs-about-btn">
                      <a
                        className="rs-btn has-theme-red has-icon has-bg has-skew"
                        href="about.html"
                      >
                        Explore More
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
                      </a>
                    </div>
                    <div className="rs-about-author">
                      <div className="rs-about-author-thumb">
                        <img src="assets/images/user/user-thumb-04.png" alt="image" />
                      </div>
                      <div className="rs-about-author-sign-thumb">
                        <img src="assets/images/shape/sign-shape.png" alt="image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section id="homeabout" className="rs-about-area section-space rs-about-ten">
        <div className="rs-about-shape-two">
          <img src="assets/images/shape/robo-arm-03.png" alt="image" />
        </div>
        <div className="container">
          <div className="row g-5">
            <div className="col-12">
              <div className="rs-about-wrapper">
                <div className="rs-about-thumb-wrapper">
                  <div className="rs-about-shape-one prallax-parent">
                    <img data-depth="1.3" src="assets/images/shape/dott-shape.png" alt="image" />
                  </div>
                  <div className="rs-about-thumb">
                    <img src="assets/images/about/about-thumb-13.png" alt="image" />
                  </div>
                  <div className="rs-about-counter-wrapper">
                    <div className="rs-counter-item">
                      <div className="rs-counter-content-wrapper">
                        <div className="rs-counter-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="55"
                            height="55"
                            viewBox="0 0 55 55"
                            fill="none"
                          >
                            <circle
                              opacity="0.1"
                              cx="27.5"
                              cy="27.5"
                              r="27.5"
                              fill="#1F1F1F"
                            ></circle>
                            <path
                              d="M43.543 41.25C43.543 41.25 45.8346 41.25 45.8346 38.9583C45.8346 36.6667 43.543 29.7917 34.3763 29.7917C25.2096 29.7917 22.918 36.6667 22.918 38.9583C22.918 41.25 25.2096 41.25 25.2096 41.25H43.543ZM25.2608 38.9583C25.2529 38.9574 25.2418 38.956 25.2283 38.9537C25.222 38.9527 25.2157 38.9515 25.2097 38.9504C25.213 38.3453 25.592 36.5908 26.9496 35.007C28.2194 33.5256 30.4408 32.0833 34.3763 32.0833C38.3118 32.0833 40.5332 33.5256 41.803 35.007C43.1606 36.5908 43.5396 38.3453 43.5429 38.9504C43.5369 38.9515 43.5306 38.9527 43.5243 38.9537C43.5108 38.956 43.4997 38.9574 43.4918 38.9583H25.2608Z"
                              fill="white"
                            ></path>
                            <path
                              d="M34.3763 25.2083C36.9076 25.2083 38.9596 23.1563 38.9596 20.625C38.9596 18.0937 36.9076 16.0417 34.3763 16.0417C31.845 16.0417 29.793 18.0937 29.793 20.625C29.793 23.1563 31.845 25.2083 34.3763 25.2083ZM41.2513 20.625C41.2513 24.422 38.1733 27.5 34.3763 27.5C30.5793 27.5 27.5013 24.422 27.5013 20.625C27.5013 16.828 30.5793 13.75 34.3763 13.75C38.1733 13.75 41.2513 16.828 41.2513 20.625Z"
                              fill="white"
                            ></path>
                            <path
                              d="M25.0628 30.4333C24.2199 30.1637 23.2836 29.9677 22.2449 29.8674C21.7308 29.8178 21.1916 29.7917 20.6263 29.7917C11.4596 29.7917 9.16797 36.6667 9.16797 38.9583C9.16797 40.4861 9.93186 41.25 11.4596 41.25H21.1221C20.7995 40.599 20.6263 39.8272 20.6263 38.9583C20.6263 36.6431 21.4908 34.2788 23.1238 32.3038C23.6817 31.629 24.3293 30.9997 25.0628 30.4333ZM20.4431 32.0844C19.0738 34.177 18.3346 36.5628 18.3346 38.9583H11.4596C11.4596 38.3608 11.836 36.5979 13.1996 35.007C14.4495 33.5488 16.6216 32.1284 20.4431 32.0844Z"
                              fill="white"
                            ></path>
                            <path
                              d="M12.6055 21.7708C12.6055 17.9739 15.6835 14.8958 19.4805 14.8958C23.2774 14.8958 26.3555 17.9739 26.3555 21.7708C26.3555 25.5678 23.2774 28.6458 19.4805 28.6458C15.6835 28.6458 12.6055 25.5678 12.6055 21.7708ZM19.4805 17.1875C16.9492 17.1875 14.8971 19.2395 14.8971 21.7708C14.8971 24.3021 16.9492 26.3542 19.4805 26.3542C22.0118 26.3542 24.0638 24.3021 24.0638 21.7708C24.0638 19.2395 22.0118 17.1875 19.4805 17.1875Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="rs-counter-number-item">
                          <span className="rs-counter-number odometer" data-count="460">
                            00
                          </span>
                          <span className="prefix">+</span>
                        </div>
                      </div>
                      <span className="rs-counter-title">
                        <span className="large-text">Highly</span> Specialised <br />
                        Employees
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rs-about-content-wrapper">
                  <div className="rs-section-title-wrapper">
                    <span className="rs-section-subtitle has-stroke justify-content-start">
                      About Industrie
                    </span>
                    <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                      We work for you <span className="rs-theme-orange">since 1989</span>.
                      Industrial around the world
                    </h2>
                    <p className="descrip">
                      Welcome to Industrie, a leading industry innovator with a rich history of
                      excellence.
                    </p>
                  </div>
                  <div className="rs-about-tab">
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
                          Our History
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
                          Our Mission
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
                          Our Vision
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="rs-aobut-tab-content-wrapper">
                    <div className="tab-content rs-about-tab-anim" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-item-one"
                        role="tabpanel"
                        aria-labelledby="pills-item-one-tab"
                      >
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for
                          </p>
                          <div className="rs-about-feature-list">
                            <div className="rs-list-item has-theme-orange">
                              <ul>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Quality Control System
                                </li>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Building Quality Industrial
                                </li>
                              </ul>
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
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for
                          </p>
                          <div className="rs-about-feature-list">
                            <div className="rs-list-item has-theme-orange">
                              <ul>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Quality Control System
                                </li>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Building Quality Industrial
                                </li>
                              </ul>
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
                        <div className="rs-about-tab-content">
                          <p>
                            Welcome to Industrie, a leading industry innovator with a rich history
                            of excellence with a passion make also for precision we have been
                            empowering industries and driving progress for
                          </p>
                          <div className="rs-about-feature-list">
                            <div className="rs-list-item has-theme-orange">
                              <ul>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Quality Control System
                                </li>
                                <li>
                                  <i className="fa-regular fa-check"></i>
                                  Building Quality Industrial
                                </li>
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
    </>
  );
}
