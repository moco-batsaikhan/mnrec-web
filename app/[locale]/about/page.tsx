import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import "./style.css";

export default async function ProjectTimeline(props: { params: Promise<{ locale: string }> }) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  const teamData = [
    {
      id: 3,
      name: t.about.manager3,
      position: t.about.jobPosition3,
      description: t.about.managerDesc3,
      image: "/assets/images/leader-team/Tsolmon.png",
    },
    {
      id: 1,
      name: t.about.manager1,
      position: t.about.jobPosition1,
      description: t.about.managerDesc1,
      image: "/assets/images/leader-team/Munkhjargal.avif",
    },
    {
      id: 2,
      name: t.about.manager2,
      position: t.about.jobPosition2,
      description: t.about.managerDesc2,
      image: "/assets/images/leader-team/Odgerel.avif",
    },
    {
      id: 4,
      name: t.about.manager4,
      position: t.about.jobPosition4,
      description: t.about.managerDesc4,
      image: "/assets/images/leader-team/Daagii.png",
    },
  ];

  const timelineData = [
    {
      year: `${t.history.title1}`,
      description: `${t.history.description1}`,
      side: "left",
    },
    {
      year: `${t.history.title2}`,
      description: `${t.history.description2}`,
      side: "right",
    },
    {
      year: `${t.history.title3}`,
      description: `${t.history.description3}`,
      side: "left",
    },
    {
      year: `${t.history.title4}`,
      description: `${t.history.description4}`,
      side: "right",
    },
    {
      year: `${t.history.title5}`,
      description: `${t.history.description5}`,
      side: "left",
    },
    {
      year: `${t.history.title6}`,
      description: `${t.history.description6}`,
      side: "right",
    },
    {
      year: `${t.history.title7}`,
      description: `${t.history.description7}`,
      side: "left",
    },
    {
      year: `${t.history.title8}`,
      description: `${t.history.description8}`,
      side: "right",
    },
    {
      year: `${t.history.title9}`,
      description: `${t.history.description9}`,
      side: "left",
    },
    {
      year: `${t.history.title10}`,
      description: `${t.history.description10}`,
      side: "right",
    },
  ];

  return (
    <>
      <PageBanner bannerImage={"/assets/images/bg/aboutBanner.jpg"} pageName={t.about.aboutUs} />
      <div className="main-content">
        <section id="homeabout" className="rs-about-area section-space-ab rs-about-eight">
          <div className="container">
            <div className="row g-5">
              <div className="col-xl-6 col-lg-6">
                <div className="rs-about-wrapper">
                  <div className="rs-about-content-wrapper">
                    <div className="rs-section-title-wrapper">
                      <span className="rs-section-subtitle has-theme-yellow justify-content-start">
                        {t.about.aboutUs}
                      </span>
                      <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                        {t.about.heading}
                      </h2>
                      <p className="descrip">{t.about.introduction}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="rs-about-thumb-wrapper">
                  <div className="rs-about-thumb img-one">
                    <img src="/assets/images/about/aboutUs.jpg" alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="feature-section" className="feature-section pad-top-50 mt-40">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="feature-box-wrap about-box relative">
                  <div className="feature-box-details">
                    <div className="row  g-5 justify-content-center section-title-space align-items-center">
                      <div className="col-xxl-8 col-xl-10 col-lg-10">
                        <div className="rs-section-title-wrapper text-center">
                          <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                            <span className="rs-theme-orange">{t.about.visionTitle}</span>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="feature-content">
                      <p className="mb-0 box-size">{t.about.visionText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="timeline-section section-space">
          <div className="container">
            <div className="row  g-5 justify-content-center section-title-space align-items-center">
              <div className="col-xxl-8 col-xl-10 col-lg-10">
                <div className="rs-section-title-wrapper text-center">
                  <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                    <span className="rs-theme-orange">{t.history.pageTitle}</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="timeline-wrapper">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item ${item.side} ${
                    index % 2 === 0 ? "timeline-left" : "timeline-right"
                  }`}
                >
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-info">
                      <p className="timeline-description">{item.description}</p>
                    </div>
                  </div>
                  <div className="timeline-dot"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rs-team-details-area section-space-top rs-team-details team-section mb-50">
          <div className="container">
            <div className="row  g-5 justify-content-center section-title-space align-items-center">
              <div className="col-xl-10 col-lg-10">
                <div className="rs-section-title-wrapper text-center">
                  <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                    <span className="rs-theme-orange">{t.history.pageTitle}</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row g-5">
              {teamData.map((member, index) => (
                <React.Fragment key={member.id}>
                  <div className={`col-xl-4 col-lg-4`}>
                    <div className="rs-team-details-thumb">
                      <img src={member.image} alt={member.name} />
                    </div>
                  </div>
                  <div className={`col-xl-8 col-lg-8`}>
                    <div className="rs-team-details-content">
                      <h2 className="rs-team-details-title">{member.name}</h2>
                      <span className="rs-team-details-desig">{member.position}</span>
                      <div className="rs-team-details-bio">
                        <p>{member.description}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
