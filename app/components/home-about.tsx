import React from "react";

export default function HomeAbout() {
  return (
    <>
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
                          {/* <div className="rs-about-feature-list">
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
                          </div> */}
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
                          {/* <div className="rs-about-feature-list">
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
                          </div> */}
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
                          {/* <div className="rs-about-feature-list">
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
                          </div> */}
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
