import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDictionary, locales } from "@/lib/i18n";
import Banner from "../components/banner";
import HomeAbout from "../components/home-about";
import HomeVideo from "../components/homeVideo";
import HomePartner from "../components/homePartner";
import HomeBlog from "../components/homeBlog";
import HomePortfolio from "../components/homePortfolio";
import HomeFeature from "../components/homeFeature";

export function generateStaticParams(): { locale: string }[] {
  return locales.map(locale => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary((locales as string[]).includes(locale) ? (locale as Locale) : "en");

  return (
    <>
      <Banner />
      <HomeAbout />
      {/* <HomePortfolio /> */}
      <HomeVideo />
      <HomeBlog />
      <HomePartner />
    </>
  );
}
