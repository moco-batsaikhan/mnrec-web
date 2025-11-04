import type { Locale } from "@/lib/i18n";
import { getDictionary, locales } from "@/lib/i18n";
import Banner from "../components/banner";
import HomeAbout from "../components/homeAbout";
import HomeHighlights from "../components/homeHighlights";
import HomeText from "../components/homeText";
// import HomeVideo from "../components/homeVideo";
// import HomePartner from "../components/homePartner";
// import HomeBlog from "../components/homeBlog";

export function generateStaticParams(): { locale: string }[] {
  return locales.map(locale => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary((locales as string[]).includes(locale) ? (locale as Locale) : "en");

  return (
    <>
      <Banner locale={locale} />
      <HomeAbout
        translations={{ about: t.about }}
        image={{ src: "/assets/images/about/about-us.png" }}
        heading={t.homeAbout.heading}
        introduction={t.homeAbout.desc}
      />
      <HomeText locale={locale} />
      <HomeHighlights translations={{ t }} />
    </>
  );
}
