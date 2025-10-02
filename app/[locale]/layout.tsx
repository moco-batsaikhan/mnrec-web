import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/css/vendor/spacing.css";
import "@styles/css/vendor/odometer.min.css";
import "@styles/css/vendor/magnific-popup.css";
import "@styles/css/main.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../globals.css";
import { locales } from "@/lib/i18n";
import HeaderWrapper from "../components/header-wrapper";
import ClientScripts from "../components/client-scripts";
import Script from "next/script";
import Footer from "../components/footer";
import StickySocial from "../components/sticky-social";

export const metadata: Metadata = {
  title: "MNREC",
  icons: {
    icon: ["/favicon.ico", "/assets/images/logo/favicon.png"],
    shortcut: "/favicon.ico",
    apple: "/assets/images/logo/favicon.png",
  },
  description:
    "Монголын Үндэсний Газрын Ховор Элемент Корпораци ХХК (МНГХЭК) - Албан ёсны вэб сайт",
};

export function generateStaticParams(): { locale: string }[] {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const alt = locale === "en" ? "mn" : "en";

  return (
    <>
      <HeaderWrapper locale={locale} alt={alt} />

      {children}

      <StickySocial />

      <Footer locale={locale} alt={alt} />

      {/* Load jQuery first via script tag to ensure it's available globally */}
      <Script src="/assets/js/vendor/jquery-3.7.1.min.js" strategy="beforeInteractive" />

      {/* Load plugins that extend jQuery */}
      <Script src="/assets/js/vendor/magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/wow.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/nice-select.min.js" strategy="afterInteractive" />

      {/* Custom scripts that aren't available via npm */}
      <Script src="/assets/js/plugins/waypoints.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/meanmenu.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/vendor/ajax-form.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/easypie.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/headding-title.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/lenis.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/rs-anim-int.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/rs-scroll-trigger.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/rs-splitText.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/jquery.lettering.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/jquery.appear.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/marquee.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/vendor/purecounter.js" strategy="afterInteractive" />

      <ClientScripts />

      {/* main.js is now loaded programmatically by ClientScripts after all dependencies are ready */}
    </>
  );
}
