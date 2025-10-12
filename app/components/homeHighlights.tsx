import React from "react";
import Image from "next/image";

interface HomeHighlightsProps {
  translations: any;
}

export default function HomeHighlights({ translations }: HomeHighlightsProps) {
  const t = translations.t;
  
  const highlights = [
    { icon: "/assets/images/highlight-icons/icon-4.png", text: t.highlights?.desc1 || "Project highlight 1" },
    { icon: "/assets/images/highlight-icons/icon-2.png", text: t.highlights?.desc2 || "Project highlight 2" },
    { icon: "/assets/images/highlight-icons/icon-3.png", text: t.highlights?.desc3 || "Project highlight 3" },
    { icon: "/assets/images/highlight-icons/icon-1.png", text: t.highlights?.desc4 || "Project highlight 4" },
    { icon: "/assets/images/highlight-icons/icon-6.png", text: t.highlights?.desc5 || "Project highlight 5" },
    { icon: "/assets/images/highlight-icons/icon-5.png", text: t.highlights?.desc6 || "Project highlight 6" }
  ];

  return (
    <section className="rs-elements-brand-area highlight-section-space rs-brand-two">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 order-1 order-lg-1">
            <div className="rs-section-title-wrapper">
              <h2 className="rs-section-title">{t.highlights?.pageTitle || "Project Highlights"}</h2>
            </div>
          </div>
          
          <div className="col-lg-8 order-2 order-lg-2">
            <div className="highlights-grid">
              {highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <div className="highlight-icon-wrapper">
                    <Image 
                      src={highlight.icon}
                      alt={`Highlight ${index + 1}`}
                      width={90}
                      height={80}
                      className="highlight-icon"
                    />
                  </div>
                  <div className="highlight-text">
                    <p>{highlight.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
