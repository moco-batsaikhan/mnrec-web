import React from "react";

export default function HomeBlog() {
  return (
    <div>
      <section id="homeblog" className="rs-blog-area section-space rs-blog-one">
        <div className="container">
          <div className="row  g-5 section-title-space align-items-center">
            <div className="col-xl-7 col-lg-7">
              <div className="rs-section-title-wrapper">
                <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                  Articles & blog posts with useful information
                </h2>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5">
              <div className="rs-blog-btn">
                <a className="rs-btn has-theme-orange has-icon has-bg" href="blog.html">
                  View All Post
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
            </div>
          </div>
          <div className="row g-5">
            <div className="col-xl-6 col-lg-6">
              <div
                className="rs-blog-item has-thumb-height wow fadeInLeft"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div
                  className="has-bg rs-blog-bg-thumb"
                  style={{ backgroundImage: "url('/assets/images/blog/blog-thumb-01.png')" }}
                ></div>
                <div className="rs-blog-content has-position">
                  <div className="rs-blog-meta">
                    <div className="rs-blog-meta-item has-white">
                      <span>
                        By
                        <a className="rs-blog-meta-author" href="#">
                          {" "}
                          Nayeem
                        </a>
                      </span>
                    </div>
                    <div className="rs-blog-meta-item has-white">
                      <span>Feb 8, 2024</span>
                    </div>
                  </div>
                  <h3 className="rs-blog-title has-white has-big underline">
                    {" "}
                    <a href="blog-details.html">
                      Construction of a new high tech plant in washingtons
                    </a>
                  </h3>
                  <p className="rs-blog-description has-white">
                    Industry&apos;s standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and...
                  </p>
                  <div className="rs-blog-tag has-white">
                    <a href="blog-details.html">Company</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="row g-5 wow fadeInRight" data-wow-delay=".3s" data-wow-duration="1s">
                <div className="col-12">
                  <div className="rs-blog-item has-grid">
                    <div className="rs-blog-content has-padding order-1 order-sm-0">
                      <div className="rs-blog-meta">
                        <div className="rs-blog-meta-item">
                          <span>
                            By
                            <a className="rs-blog-meta-author" href="#">
                              {" "}
                              Nayeem
                            </a>
                          </span>
                        </div>
                        <div className="rs-blog-meta-item">
                          <span>Feb 8, 2024</span>
                        </div>
                      </div>
                      <h5 className="rs-blog-title underline has-black">
                        {" "}
                        <a href="blog-details.html">Building resilient supply chains for</a>
                      </h5>
                      <p className="rs-blog-description">
                        Industry&apos;s standard dummy text ever....
                      </p>
                      <div className="rs-blog-tag">
                        <a href="blog-details.html">Oil Factory</a>
                      </div>
                    </div>
                    <div className="rs-blog-thumb order-0 order-sm-1">
                      <a href="blog-details.html">
                        <img src="/assets/images/blog/blog-thumb-02.png" alt="image" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="rs-blog-item has-grid">
                    <div className="rs-blog-content has-padding order-1 order-sm-0">
                      <div className="rs-blog-meta">
                        <div className="rs-blog-meta-item">
                          <span>
                            By
                            <a className="rs-blog-meta-author" href="#">
                              {" "}
                              Nayeem
                            </a>
                          </span>
                        </div>
                        <div className="rs-blog-meta-item">
                          <span>Feb 8, 2024</span>
                        </div>
                      </div>
                      <h5 className="rs-blog-title underline has-black">
                        {" "}
                        <a href="blog-details.html">Factories technologies in interactive and</a>
                      </h5>
                      <p className="rs-blog-description">
                        Industry&apos;s standard dummy text ever....
                      </p>
                      <div className="rs-blog-tag">
                        <a href="blog-details.html">Manufacture</a>
                      </div>
                    </div>
                    <div className="rs-blog-thumb order-0 order-sm-1">
                      <a href="blog-details.html">
                        <img src="/assets/images/blog/blog-thumb-03.png" alt="image" />
                      </a>
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
