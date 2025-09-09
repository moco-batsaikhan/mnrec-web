import React from "react";

export default function PageBanner({ pageName }: { pageName: string }) {
  return (
    <section className="rs-breadcrumb-area rs-breadcrumb-one p-relative">
      <div
        className="rs-breadcrumb-bg"
        style={{ backgroundImage: "url('/assets/images/bg/page-banner.jpg')" }}
      ></div>
      <div className="rs-video-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-xxl-6 col-xl-8 col-lg-8">
            <div className="rs-breadcrumb-content-wrapper">
              <div className="rs-breadcrumb-title-wrapper">
                <h1 className="rs-breadcrumb-title">{pageName}</h1>
              </div>
              {/* <div className="rs-breadcrumb-menu">
                  <nav>
                    <ul>
                      <li>
                        <span>
                          <a href="index.html">Industrie</a>
                        </span>
                      </li>
                      <li>
                        <span>About Us</span>
                      </li>
                    </ul>
                  </nav>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
