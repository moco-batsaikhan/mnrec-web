"use client";

import BannerNews from "./BannerNews";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Banner({ t, locale }: { t: any; locale: string }) {
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
                  style={{ textTransform: 'none' }}
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
                
                {/* Banner News Section */}
                <div
                  className="wow fadeInUp"
                  data-wow-delay=".7s"
                  data-wow-duration="1.1s"
                >
                  <BannerNews locale={locale} />
                </div>
                
                <div
                  className="rs-banner-btn wow fadeInUp"
                  data-wow-delay=".9s"
                  data-wow-duration="1.3s"
                  style={{ display: "flex", gap: "30px" }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
