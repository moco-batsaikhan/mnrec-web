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
}

export default function HomeAbout({ translations, image }: HomeAboutProps) {
  const t = translations.about;

  return (
    <section id="homeabout" className="rs-about-area section-space-ab rs-about-eight">
      <div className="container">
        <div className="row g-5">
          <div className="col-xl-6 col-lg-6">
            <div className="rs-about-wrapper">
              <div className="rs-about-content-wrapper">
                <div className="rs-section-title-wrapper">
                  {/* <span className="rs-section-subtitle has-theme-yellow justify-content-start">
                        {t.aboutUs}
                      </span> */}
                  <h2 className="rs-section-title ">{t.heading}</h2>
                  <p className="descrip">{t.introduction}</p>
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
