"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./header";
import { getDictionary, type Locale } from "@/lib/i18n";

interface HeaderWrapperProps {
  locale: string;
  alt: string;
}

export default function HeaderWrapper({ locale, alt }: HeaderWrapperProps) {
  const pathname = usePathname();
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const t = await getDictionary(locale as Locale);
      setTranslations(t);
    };
    loadTranslations();
  }, [locale]);

  if (!translations) {
    return null; // or a loading spinner
  }

  return <Header locale={locale} alt={alt} currentPath={pathname} translations={translations} />;
}
