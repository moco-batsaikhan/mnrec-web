import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function AboutTeamDetail1(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  return (
    <div>
      <PageBanner pageName={t.about.team} />
      <section className="rs-team-details-area section-space-top rs-team-details mb-100">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-6 col-lg-6">
              <div className="rs-team-details-thumb">
                <img src="/assets/images/team/details/team-details-thumb-01.png" alt="image" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="rs-team-details-content">
                {/* <span className="rs-team-details-subtitle">Hello i'm</span> */}
                <h2 className="rs-team-details-title">{t.about.manager2}</h2>
                <span className="rs-team-details-desig">{t.about.jobPosition2}</span>
                {/* <div className="rs-team-details-info-wrapper">
                  <div className="rs-team-details-info-item">
                    <span className="rs-team-details-info-title">Department:</span>
                    <span className="rs-team-details-info-content">Engineer</span>
                  </div>
                  <div className="rs-team-details-info-item">
                    <span className="rs-team-details-info-title">Experience:</span>
                    <span className="rs-team-details-info-content">10 Years</span>
                  </div>
                  <div className="rs-team-details-info-item">
                    <span className="rs-team-details-info-title">Email:</span>
                    <span className="rs-team-details-info-content">john.maxwell@gmail.com</span>
                  </div>
                  <div className="rs-team-details-info-item">
                    <span className="rs-team-details-info-title">Phone:</span>
                    <span className="rs-team-details-info-content">+855 (2669) 1234</span>
                  </div>
                </div> */}
                {/* <div className="rs-team-details-social">
                  <div className="rs-theme-social has-theme-orange">
                    <a href="#">
                      <i className="ri-twitter-x-line"></i>
                    </a>
                    <a href="#">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="#">
                      <i className="ri-linkedin-fill"></i>
                    </a>
                    <a href="#">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </div>
                </div> */}
                <div className="rs-team-details-bio">
                  {/* <h3>Biography</h3> */}
                  <p>{t.about.managerDesc2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
