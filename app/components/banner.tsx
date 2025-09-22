"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Banner({ t }: { t: any }) {
  return (
    <section
      className="rs-banner-area rs-banner-two p-relative"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <video
        src="/assets/mp4/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div className="rs-video-overlay"></div>
      <div className="rs-banner-bg-thumb" style={{ position: "relative", zIndex: 1 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row">
          <div className="col-xxl-8 col-xl-9 col-lg-9">
            <div className="rs-banner-wrapper">
              <div className="rs-banner-content">
                <h1
                  className="rs-banner-title wow fadeInUp"
                  data-wow-delay=".3s"
                  data-wow-duration=".7s"
                >
                  {t.home?.keyWord}
                </h1>
                <div
                  className="rs-banner-descrip wow fadeInUp"
                  data-wow-delay=".5s"
                  data-wow-duration=".9s"
                >
                  <p>{t.home?.keyNote} </p>
                </div>
                {/* <div
                  className="rs-banner-btn wow fadeInUp"
                  data-wow-delay=".7s"
                  data-wow-duration="1.1s"
                >
                  <a className="rs-btn has-theme-red has-icon" href="contact.html">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
