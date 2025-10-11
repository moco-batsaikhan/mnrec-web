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

                  <div className="contact-item mb-5">
                    <div className="contact-text">
                      <p className="contact-label">{t.contact.phone}:</p>
                      <a href="tel:+976-7505-1801" className="footer-contact-link">
                        +976-7505-1801
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
                      <a
                        href="https://www.facebook.com/khalzanburegteiproject"
                        aria-label="Facebook"
                      >
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
                          <use href="/assets/fonts/remixicon.symbol.svg#ri-facebook-fill" />
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
                      <a
                        href="https://www.instagram.com/khalzanburegtei?fbclid=IwY2xjawNARRlleHRuA2FlbQIxMABicmlkETFnNUpBSExmajlsMnZwQXhsAR6_U-tPr-PaB9_Yhe3Ix9Zi17JS_v5V9geChNawKWQpTJoOv1aHLX8FJh-AqQ_aem_kz-5QeLhPAL00EBf8zI2Zg"
                        aria-label="Instagram"
                      >
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
                          <use href="/assets/fonts/remixicon.symbol.svg#ri-instagram-fill" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-0">
                <div className="rs-subscribe-text mb-20">
                  <h5>{t.footer.connectWithUs}</h5>
                </div>
                <div className="rs-subscribe-input mb-70">
                  <input
                    name="email"
                    type="email"
                    placeholder={t.footer.enterEmail}
                    className="subscribe-input"
                  />
                  <button type="submit" className="rs-btn blue-bg subscribe-btn">
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
