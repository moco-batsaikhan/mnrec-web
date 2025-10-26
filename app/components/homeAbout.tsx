import React from "react";

interface HomeAboutProps {
  translations: {
    about: {
      aboutUs: string;
      heading: string;
      introduction: string;
    };
  };
  image?: { src: string };
  heading?: string;
  introduction?: string;
}

export default function HomeAbout({ translations, image, heading, introduction }: HomeAboutProps) {
  const t = translations.about;

  return (
    <section id="homeabout" className="rs-about-area section-space-ab rs-about-eight">
      <div className="container">
        <div className="row g-5">
          <div className="col-xl-6 col-lg-6">
            <div className="rs-about-wrapper">
              <div className="rs-about-content-wrapper">
                <div className="rs-section-title-wrapper">
                  <h2 className="rs-section-title ">{heading}</h2>
                  {/* {section === "ABOUT" ? 
                    <p className="descrip">{introduction}</p> : 
                    <div
                      className="home-about-text"
                      dangerouslySetInnerHTML={{
                        __html: introduction || ''
                      }}
                    />
                  } */}
                  <div
                      className="home-about-text"
                      dangerouslySetInnerHTML={{
                        __html: introduction || ''
                      }}
                    />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="rs-about-thumb-wrapper">
              <div className="rs-about-thumb img-one">
                <img src={image?.src} alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
