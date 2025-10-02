import React from "react";

interface HomeTextProps {
  translations: any;
}

export default function HomeText({ translations }: HomeTextProps) {
  const t = translations;
  return (
    <section className="rs-cta-area rs-cta-four">
      {/* <div className="rs-cta-bg-thumb"></div> */}
      <div className="container">
        <div className="rs-cta-wrapper">
          <div className="rs-section-title-wrapper apostrophe-text quote-layout">
            <div className="quote-icon-wrapper">
              <img src="assets/images/icon/quote.png" alt="icon-quote" className="quote-icon-img" />
            </div>
            <p className="rs-split-text-enable split-in-fade quote-text">
              High potential project for Mongolia's first rare earth project development and a
              significant opportunity for Khovd province
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
