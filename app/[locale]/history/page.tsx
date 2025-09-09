import PageBanner from "@/app/components/pageBanner";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import TimelineClient from "./TimelineClient";

const timeline = [
  {
    year: "1990",
    desc: "Our company was established with the vision to provide world-class services.",
  },
  {
    year: "2005",
    desc: "We expanded into international markets and grew our global presence.",
  },
  {
    year: "2015",
    desc: "Introduced new technologies and solutions that transformed the industry.",
  },
  {
    year: "2020",
    desc: "Continuing to innovate and lead in our industry with cutting-edge solutions.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function HistoryPage(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);
  return (
    <>
      <PageBanner pageName={t.history.title} />

      {/* <section className="rs-team-area section-space rs-team-two primary-bg">
        <div className="container">
          <div className="text-gray-800 min-h-screen py-16 px-6 md:px-20">
            <div className="relative max-w-full mx-auto">
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 border-l-2 border-[#00b0b0] z-0 pointer-events-none"></div>
              <TimelineClient timeline={timeline} />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
