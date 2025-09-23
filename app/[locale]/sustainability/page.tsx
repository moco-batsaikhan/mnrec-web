import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import ClientReeProject from "./client-component";
import "./style.css";
import "../kb-project/style.css";

export default async function SustainabilityPage(props: { params: Promise<{ locale: string }> }) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  const sidebarItems = [
    {
      id: "1",
      title: t.sustainability.tabTitle1,
      content: t.sustainability.tabDesc1,
      image: "/assets/company-photos/image7.jpg",
    },
    {
      id: "2",
      title: t.sustainability.tabTitle2,
      content: t.sustainability.tabDesc2,
      image: "/assets/company-photos/image3.jpg",
    },
    {
      id: "3",
      title: t.sustainability.tabTitle3,
      content: "",
      image: "",
    },
  ];

  return (
    <div>
      <PageBanner
        bannerImage={"/assets/company-photos/image1.jpg"}
        pageName={t.menu.sustainability ?? "Sustainability"}
      />

      <ClientReeProject sidebarItems={sidebarItems} translations={t} />
    </div>
  );
}
