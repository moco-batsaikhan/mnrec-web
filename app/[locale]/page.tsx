import type { Locale } from "@/lib/i18n";
import { getDictionary, locales } from "@/lib/i18n";
import Banner from "../components/banner";
import HomeAbout from "../components/home-about";
import HomeVideo from "../components/homeVideo";
import HomePartner from "../components/homePartner";
import HomeBlog from "../components/homeBlog";

export function generateStaticParams(): { locale: string }[] {
  return locales.map(locale => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary((locales as string[]).includes(locale) ? (locale as Locale) : "en");

  // Use t to avoid unused variable warning
  console.log("Locale:", t);

  return (
    <>
      <Banner />
      <HomeAbout />
      {/* <HomeVideo /> */}
      {/* <HomeBlog /> */}
      {/* <HomePartner /> */}
    </>
  );
}
