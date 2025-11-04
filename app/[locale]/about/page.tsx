import PageBanner from "@/app/components/pageBanner";
import HomeAbout from "@/app/components/homeAbout";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import "./style.css";
import TeamSection from "../../components/TeamSection";

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
      image: "/assets/images/leader-team/Munkhjargal.png",
    },
    {
      id: 2,
      name: t.about.manager2,
      position: t.about.jobPosition2,
      description: t.about.managerDesc2,
      image: "/assets/images/leader-team/Odgerel.png",
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
        <HomeAbout
          translations={{ about: t.about }}
          image={{ src: "/assets/images/about/about-us.png" }}
          heading={t.about.heading}
          introduction={t.homeAbout.desc}
        />
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
                      {(() => {
                        const words = (t.about.visionText || "").split(/\s+/);
                        const mid = Math.ceil(words.length / 2);
                        const line1 = words.slice(0, mid).join(" ");
                        const line2 = words.slice(mid).join(" ");
                        return (
                          <>
                            <p className="mb-0 box-size">{line1}</p>
                            {line2 && <p className="mb-0 box-size">{line2}</p>}
                          </>
                        );
                      })()}
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
              <div className="highlights-header col-12">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <h2 className="rs-section-title2" style={{ margin: 0, whiteSpace: 'nowrap' }}>{t.menu.about_team || "Project Highlights"}</h2>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#45D3B1' }}></div>
            </div>
          </div>
            </div>
            <div className="row g-5">
              <TeamSection lang={lang}/>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
