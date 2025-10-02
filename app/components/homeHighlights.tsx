import React from "react";

interface HomeHighlightsProps {
  translations: any;
}

export default function HomeHighlights({ translations }: HomeHighlightsProps) {
  const t = translations;
  return (
    <div>
      <section className="rs-elements-brand-area section-space rs-brand-two">
        <div className="container">
          <div className="row  g-5 section-title-space">
            <div className="col-12">
              <div className="rs-brand-wrapper">
                <div className="rs-section-title-wrapper">
                  <h2 className="rs-section-title">Our clients and partners</h2>
                </div>

                <div className="rs-brand-item-wrapper">
                  <div
                    className="rs-brand-item wow fadeIn"
                    data-wow-delay=".6s"
                    data-wow-duration="1s"
                  >
                    <div className="rs-brand-thumb">
                      <img src="assets/images/brand/brand-thumb-11.png" alt="image" />
                    </div>
                  </div>
                  <div
                    className="rs-brand-item wow fadeIn"
                    data-wow-delay=".7s"
                    data-wow-duration="1s"
                  >
                    <div className="rs-brand-thumb">
                      <img src="assets/images/brand/brand-thumb-12.png" alt="image" />
                    </div>
                  </div>
                  <div
                    className="rs-brand-item wow fadeIn"
                    data-wow-delay=".8s"
                    data-wow-duration="1s"
                  >
                    <div className="rs-brand-thumb">
                      <img src="assets/images/brand/brand-thumb-13.png" alt="image" />
                    </div>
                  </div>
                  <div
                    className="rs-brand-item wow fadeIn"
                    data-wow-delay=".9s"
                    data-wow-duration="1s"
                  >
                    <div className="rs-brand-thumb">
                      <img src="assets/images/brand/brand-thumb-14.png" alt="image" />
                    </div>
                  </div>
                  <div
                    className="rs-brand-item wow fadeIn"
                    data-wow-delay="1s"
                    data-wow-duration="1s"
                  >
                    <div className="rs-brand-thumb">
                      <img src="assets/images/brand/brand-thumb-15.png" alt="image" />
                    </div>
                  </div>
                  <div
                    className="rs-brand-item wow fadeIn"
                    data-wow-delay="1s"
                    data-wow-duration="1s"
                  >
                    <div className="rs-brand-thumb">
                      <img src="assets/images/brand/brand-thumb-15.png" alt="image" />
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
