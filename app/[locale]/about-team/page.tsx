import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function AboutTeam(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  return (
    <div>
      <PageBanner pageName={t.about.team} />
      <section className="rs-team-area section-space rs-team-two primary-bg">
        <div className="container">
          <div className="row  g-5 justify-content-center section-title-space align-items-center">
            <div className="col-xxl-8 col-xl-10 col-lg-10">
              <div className="rs-section-title-wrapper text-center">
                {/* <span className="rs-section-subtitle has-stroke">{t.about.team}</span> */}
                <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                  <span className="rs-theme-orange">{t.about.team}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-5 justify-content-center">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div
                className="rs-team-item wow fadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div className="rs-team-thumb">
                  <img src="/assets/images/team/munkhjargal.avif" alt="image" />
                </div>
                <div className="rs-team-content">
                  <div className="rs-team-inner">
                    <h5 className="rs-team-title">
                      <Link href={`/${lang}/about-team-detail`}>{t.about.manager1}</Link>
                    </h5>
                    <span className="rs-team-designation">{t.about.jobPosition1}</span>
                    <div className="rs-theme-social has-transparent has-orange">
                      <Link href="#">
                        <i className="ri-twitter-x-line"></i>
                      </Link>
                      <Link href="#">
                        <i className="ri-facebook-fill"></i>
                      </Link>
                      <Link href="#">
                        <i className="ri-linkedin-fill"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div
                className="rs-team-item wow fadeInUp"
                data-wow-delay=".5s"
                data-wow-duration="1s"
              >
                <div className="rs-team-thumb">
                  <img src="/assets/images/team/odgerel.avif" alt="image" />
                </div>
                <div className="rs-team-content">
                  <div className="rs-team-inner">
                    <h5 className="rs-team-title">
                      <Link href={`/${lang}/about-team-detail1`}>{t.about.manager2}</Link>
                    </h5>
                    <span className="rs-team-designation">{t.about.jobPosition2}</span>
                    <div className="rs-theme-social has-transparent has-orange">
                      <Link href="#">
                        <i className="ri-twitter-x-line"></i>
                      </Link>
                      <Link href="#">
                        <i className="ri-facebook-fill"></i>
                      </Link>
                      <Link href="#">
                        <i className="ri-linkedin-fill"></i>
                      </Link>
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
