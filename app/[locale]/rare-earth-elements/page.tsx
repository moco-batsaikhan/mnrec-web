import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import ClientReeProject from "./client-component";
import "./style.css";

export default async function RareEarthElementsPage(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  const sidebarItems = [
    {
      id: "1",
      title: t.ree.tabTitle1,
      content: t.ree.tabDesc1,
      image: "/assets/images/gallery/ree.png",
    },
    {
      id: "2",
      title: t.ree.tabTitle2,
      content: t.ree.tabDesc2,
      image: "/assets/images/gallery/element-eng.png",
    },
    {
      id: "3",
      title: t.ree.tabTitle3,
      content: "",
      image: "",
    },
  ];

  return (
    <div>
      <PageBanner
        bannerImage={"/assets/images/bg/ree.jpg"}
        pageName={t.ree.pageTitle ?? "Rare Earth Elements"}
      />

      <ClientReeProject sidebarItems={sidebarItems} translations={t} />
    </div>
  );
}
