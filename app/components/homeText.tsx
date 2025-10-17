import React from "react";

interface HomeTextProps {
  translations: any;
}

export default function HomeText({ translations }: HomeTextProps) {
  const t = translations.t;
  return (
    <section 
      className="rs-cta-area rs-cta-four home-quote-section"
      style={{
        backgroundImage: 'url(/assets/images/bg/home-text-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          zIndex: 1,
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="rs-cta-wrapper">
          <div className="rs-section-title-wrapper quote-layout-horizontal">
            <div className="quote-text-with-icon">
              <p className="split-in-fade">
                {t.home?.aboutProjectText || "The Khalzan Buregtei project represents a high-potential development of Mongolia's first rare earth elements initiative and presents a significant growth opportunity for Khovd province"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
