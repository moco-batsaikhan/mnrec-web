import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import ClientKbProject from "./client-component";
import "./style.css";

export default async function KbProject(props: { params: Promise<{ locale: string }> }) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  const sidebarItems = [
    {
      id: "1",
      title: t.kbProject.tabTitle1,
      content: "",
    },
    {
      id: "2",
      title: t.kbProject.tabTitle2,
      content: t.kbProject.tabDesc2,
    },
    {
      id: "3",
      title: t.kbProject.tabTitle3,
      content: t.kbProject.tabDesc3,
    },
    {
      id: "4",
      title: t.kbProject.tabTitle4,
      content: t.kbProject.tabDesc4,
    },
  ];

  return (
    <div>
      <PageBanner
        bannerImage={"/assets/images/gallery/sustainable/cover1.jpg"}
        pageName={t.menu.kb_overview ?? "KB Project"}
      />

      <ClientKbProject sidebarItems={sidebarItems} translations={t} />
    </div>
  );
}
