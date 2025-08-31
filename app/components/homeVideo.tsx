import React from "react";

export default function HomeVideo() {
  return (
    <div className="rs-video-area rs-video-three jarallax">
      <div
        className="rs-video-bg-thumb jarallax-img"
        style={{ backgroundImage: "url('/assets/images/bg/video-bg-03.png')" }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="rs-video-content">
              <div className="rs-video-btn">
                <a
                  href="https://www.youtube.com/watch?v=Yue48fUXuqI"
                  className="rs-pulse-btn popup-video"
                >
                  <i className="ri-play-fill"></i>
                </a>
                <a className="rs-video-title" href="#">
                  See How It Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
