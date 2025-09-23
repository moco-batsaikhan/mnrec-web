import React from "react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

export default async function Footer({ locale, alt }: { locale: string; alt: string }) {
  const lang = (locales as string[]).includes(locale) ? (locale as Locale) : "en";
  const t = await getDictionary(lang);

  return (
    <div className="rs-footer-bg-thumb-wrapper">
      <div
        className="rs-footer-bg-thumb"
        style={{
          backgroundImage: "url('/assets/images/bg/footer-bg.png')",
          backgroundColor: "transparent",
        }}
      ></div>

      <div className="rs-subscribe-area rs-subscribe-one has-theme-orange">
        <div className="container">
          <div className="rs-subscribe-wrapper">
            <div className="row g-5 align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="rs-subscribe-logo mb-30">
                  <img src={`/assets/images/logo/logo.png`} alt="logo" />
                </div>

                <div className="footer-contact-info mb-30">
                  <div className="contact-item mb-5">
                    <div className="contact-text">
                      <p className="contact-label">{t.contact.email}:</p>

                      <a href="mailto:info@mnrec.mn" className="footer-contact-link">
                        info@mnrec.mn
                      </a>
                    </div>
                  </div>

                  <div className="contact-item mb-15">
                    <div className="contact-text">
                      <p className="contact-label">{t.contact.address}:</p>
                      <span
                        className="footer-contact-link contact-address"
                        dangerouslySetInnerHTML={{
                          __html: t.contact.fullAddress
                            .split("\n")
                            .map((paragraph: string) => `<p>${paragraph}</p>`)
                            .join(""),
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="offcanvas-social mt-30">
                  <ul>
                    <li>
                      <a href="#" aria-label="Facebook">
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
                          <use href="/assets/fonts/remixicon.symbol.svg#ri-facebook-fill" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="Twitter">
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
                          <use href="/assets/fonts/remixicon.symbol.svg#ri-twitter-fill" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/@kbrareearth" aria-label="YouTube">
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
                          <use href="/assets/fonts/remixicon.symbol.svg#ri-youtube-fill" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="LinkedIn">
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
                          <use href="/assets/fonts/remixicon.symbol.svg#ri-linkedin-fill" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="rs-subscribe-text mb-10">
                  <h4>{t.footer.connectWithUs}</h4>
                </div>
                <div className="rs-subscribe-input">
                  <input name="name" type="text" placeholder={t.footer.enterEmail} />
                  <button type="submit" className="rs-btn blue-bg">
                    {t.footer.sendMessage}
                  </button>
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
