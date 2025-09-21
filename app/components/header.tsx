import React from "react";
import Link from "next/link";
import Sidebar from "./sidebar";
import HamburgerButton from "./hamburger-button";
import { locales, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "./language-switcher";

interface HeaderProps {
  locale: string;
  alt: string;
  currentPath?: string;
  translations: Record<string, any>;
}

export default function Header({ locale, alt, currentPath, translations }: HeaderProps) {
  const lang = (locales as string[]).includes(locale) ? (locale as Locale) : "mn";

  // Helper function to check if menu item is active
  const isActive = (path: string) => {
    if (!currentPath) return false;
    return currentPath.includes(path);
  };

  return (
    <header>
      <div
        className="rs-header-area rs-header-two header-transparent has-theme-red has-border"
        id="header-sticky"
      >
        <div className="container-fluid">
          <div className="rs-header-inner">
            <div className="rs-header-left">
              <div className="rs-header-logo">
                <Link href={`/${lang}`}>
                  <img src="/assets/images/logo/logo.png" alt="logo" />
                </Link>
              </div>
            </div>
            <div className="rs-header-menu">
              <nav id="mobile-menu" className="main-menu">
                <ul className="multipage-menu">
                  <li className={`menu-item-has-children ${isActive("/about") ? "active" : ""}`}>
                    <a href={`/${lang}/about`}>{translations.menu.about}</a>
                  </li>
                  <li
                    className={`menu-item-has-children ${isActive("/kb-project") ? "active" : ""}`}
                  >
                    <a href={`/${lang}/kb-project`}>{translations.menu.kb_project}</a>
                  </li>
                  <li
                    className={`menu-item-has-children ${
                      isActive("/rare-earth-elements") ? "active" : ""
                    }`}
                  >
                    <a href={`/${lang}/rare-earth-elements`}>{translations.menu.rare_earth}</a>
                  </li>
                  <li
                    className={`menu-item-has-children ${
                      isActive("/local") || isActive("/enviroment") || isActive("/fund")
                        ? "active"
                        : ""
                    }`}
                  >
                    <a href="#">{translations.menu.sustainability}</a>
                    <ul className="submenu last-children">
                      <li>
                        <Link href={`/${lang}/local`}>{translations.menu.community}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/enviroment`}>{translations.menu.environment}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/fund`}>{translations.menu.development_fund}</Link>
                      </li>
                    </ul>
                  </li>
                  {/* News & Media */}
                  <li
                    className={`menu-item-has-children ${
                      isActive("/news") || isActive("/videos") ? "active" : ""
                    }`}
                  >
                    <a href="#">{translations.menu.news_media}</a>
                    <ul className="submenu last-children">
                      <li>
                        <Link href={`/${lang}/news`}>{translations.menu.latest_news}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/videos`}>{translations.menu.video}</Link>
                      </li>
                    </ul>
                  </li>
                  {/* Contact */}
                  <li className={`menu-item-has-children ${isActive("/contact") ? "active" : ""}`}>
                    <Link href={`/${lang}/contact`}>{translations.menu.contact}</Link>
                    {/* <ul className="submenu last-children">
                      <li>
                        <a href="#address">{t.menu.address}</a>
                      </li>
                      <li>
                        <a href="#email-phone">{t.menu.email_phone}</a>
                      </li>
                      <li>
                        <a href="#feedback">{t.menu.feedback}</a>
                      </li>
                    </ul> */}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="rs-header-right">
              <div className="rs-header-call">
                <div className="row-start-1 flex gap-2 items-center justify-end w-full max-w-2xl">
                  <div className="flex items-center gap-2 ml-4">
                    <LanguageSwitcher alt={alt} />
                  </div>
                </div>
              </div>
              <HamburgerButton />
            </div>
          </div>
        </div>
      </div>
      <div className="fix">
        <Sidebar locale={locale} alt={alt} translations={translations} />
      </div>
      <div className="offcanvas-overlay"></div>
      <div className="offcanvas-overlay-white"></div>
    </header>
  );
}
