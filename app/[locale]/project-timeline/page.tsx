import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import "./style.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectTimeline(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

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
      <PageBanner pageName={t.history.pageTitle} />

      <section className="timeline-section section-space">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center mb-60">
                <h2>{t.history.pageTitle}</h2>
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
    </>
  );
}
