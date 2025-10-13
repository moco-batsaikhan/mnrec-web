import React from "react";

interface HomeTextProps {
  translations: any;
}

export default function HomeText({ translations }: HomeTextProps) {
  const t = translations.t;
  return (
    <section className="rs-cta-area rs-cta-four home-quote-section">
      <div className="container">
        <div className="rs-cta-wrapper">
          <div className="rs-section-title-wrapper quote-layout-horizontal">
            <div className="quote-text-with-icon">
              
              <p className="split-in-fade">
                <img 
                src="/assets/images/icon/quote.png" 
                alt="Quote icon" 
                className="quote-icon-absolute"
              />
                {t.home?.aboutProjectText || "The Khalzan Buregtei project represents a high-potential development of Mongolia's first rare earth elements initiative and presents a significant growth opportunity for Khovd province"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
