import React from "react";
import Link from "next/link";
import Sidebar from "./sidebar";
import HamburgerButton from "./hamburger-button";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

export default async function Header({ locale, alt }: { locale: string; alt: string }) {
  const lang = (locales as string[]).includes(locale) ? (locale as Locale) : "en";
  const t = await getDictionary(lang);

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
                  <img src="/assets/images/logo/logo-mn.png" alt="logo" />
                </Link>
              </div>
            </div>
            <div className="rs-header-menu">
              <nav id="mobile-menu" className="main-menu">
                <ul className="multipage-menu">
                  <li className="menu-item-has-children">
                    <a href="#">{t.menu.about}</a>
                    <ul className="submenu last-children">
                      <li>
                        <Link href={`/${lang}/about-intro`}>{t.menu.about_intro}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/about-team`}>{t.menu.about_team}</Link>
                      </li>
                    </ul>
                  </li>
                  {/* KB Project */}
                  <li className="menu-item-has-children">
                    <a href="#">{t.menu.kb_project}</a>
                    <ul className="submenu last-children">
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.kb_overview}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.kb_history}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.kb_highlight}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.kb_geology}</Link>
                      </li>
                      <li>
                        <a href="#kb-achievements">{t.menu.kb_achievements}</a>
                      </li>
                    </ul>
                  </li>
                  {/* Rare Earth */}
                  <li className="menu-item-has-children">
                    <a href="#">{t.menu.rare_earth}</a>
                    <ul className="submenu last-children">
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.ree_what}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.ree_uses}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.ree_market}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.ree_mongolia}</Link>
                      </li>
                    </ul>
                  </li>
                  {/* Sustainability */}
                  <li className="menu-item-has-children">
                    <a href="#">{t.menu.sustainability}</a>
                    <ul className="submenu last-children">
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.community}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.environment}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.social}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news-detail`}>{t.menu.development_fund}</Link>
                      </li>
                    </ul>
                  </li>
                  {/* News & Media */}
                  <li className="menu-item-has-children">
                    <a href="#">{t.menu.news_media}</a>
                    <ul className="submenu last-children">
                      <li>
                        <Link href={`/${lang}/news`}>{t.menu.latest_news}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/videos`}>{t.menu.video}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/videos`}>{t.menu.gallery}</Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/news`}>{t.menu.report}</Link>
                      </li>
                    </ul>
                  </li>
                  {/* Contact */}
                  <li className="menu-item-has-children">
                    <Link href={`/${lang}/contact`}>{t.menu.contact}</Link>
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
                    <Link
                      href={`/${alt}`}
                      className="text-white px-4 py-1.5 text-[16px] border border-gray-200 "
                    >
                      {alt.toUpperCase()}
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="rs-header-search-wrapper">
                <div className="rs-header-search-icon has-theme-red">
                  <i className="ri-close-fill has-close"></i>
                  <i className="ri-search-line has-search"></i>
                </div>
                <form
                  className="rs-header-search-inner rs-stickys-form"
                  action="assets/mailer.php"
                  method="POST"
                >
                  <div className="rs-header-search">
                    <input type="text" placeholder="Searching..." />
                    <button type="submit">
                      <i className="ri-search-line"></i>
                    </button>
                  </div>
                </form>
              </div> */}
              <HamburgerButton />
            </div>
          </div>
        </div>
      </div>
      <div className="fix">
        <Sidebar locale={locale} alt={alt} />
      </div>
      <div className="offcanvas-overlay"></div>
      <div className="offcanvas-overlay-white"></div>
    </header>
  );
}
