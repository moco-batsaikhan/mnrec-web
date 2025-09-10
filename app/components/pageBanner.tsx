import React from "react";

export default function PageBanner({ pageName }: { pageName: string }) {
  return (
    <section className="rs-breadcrumb-area rs-breadcrumb-one p-relative">
      <div
        className="rs-breadcrumb-bg"
        style={{ backgroundImage: "url('/assets/images/bg/page-banner.jpg')" }}
      ></div>
      <div
        className="rs-breadcrumb-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
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
