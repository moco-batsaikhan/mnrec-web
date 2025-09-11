import React from "react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Footer({ locale, alt }: { locale: string; alt: string }) {
  const lang = (locales as string[]).includes(locale) ? (locale as Locale) : "en";
  const t = await getDictionary(lang);

  return (
    <div className="rs-footer-bg-thumb-wrapper has-theme-teal">
      <div
        className="rs-footer-bg-thumb"
        // style={{ backgroundImage: "url('/assets/images/bg/footer-bg-02.png')" }}
      ></div>

      <div className="rs-subscribe-area rs-subscribe-one has-theme-orange">
        <div className="container">
          <div className="rs-subscribe-wrapper">
            <div className="row g-5 align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="rs-subscribe-logo">
                  <img src={`/assets/images/logo/logo.png`} alt="logo" />
                </div>
              </div>
              <div className="col-xl-9 col-lg-9">
                <div className="rs-subscribe-content">
                  <div className="rs-subscribe-text">
                    <p>Subscribe for the latest news. Stay updated on the latest trends.</p>
                  </div>
                  <div className="rs-subscribe-input">
                    <input name="name" type="text" placeholder="Enter Your Email" />
                    <button type="submit" className="rs-btn has-theme-orange">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="footer-bottom-wrap pad-tb-20 typo-white">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <ul className="footer-bottom-items float-left">
                  <li className="nav-item">
                    <div className="nav-item-inner">
                      © {new Date().getFullYear()} {t.footer.copyRight}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
