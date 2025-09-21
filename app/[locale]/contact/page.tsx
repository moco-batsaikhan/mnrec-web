import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import "./style.css";

export default async function Contact(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);
  return (
    <>
      <PageBanner bannerImage={"/assets/images/bg/contact.jpg"} pageName={t.contact.contactUs} />

      {/* Contact Form Section */}
      <section className="contact-section section-space">
        <div className="container">
          <div className="row">
            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="contact-info-area">
                <div className="contact-info-wrapper">
                  <div className="contact-info-list">
                    <div className="contact-info-item">
                      <div className="contact-content">
                        <div className="contact-icon-text">📍</div>
                        <h5>{t.contact.address}</h5>
                        <p>{t.contact.fullAddress}</p>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <div className="contact-content">
                        <div className="contact-icon-text">✉️</div>
                        <h5>{t.contact.email}</h5>
                        <p>info@mnrec.mn</p>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <div className="contact-content">
                        <div className="contact-icon-text">📞</div>
                        <h5>{t.contact.phone}</h5>
                        <p>+976 11 123456</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="contact-form-area">
                <div className="contact-form-wrapper">
                  <form className="contact-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder={t.contact.yourEmail}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Phone Number"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t.contact.subject}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            rows={6}
                            placeholder={t.contact.message}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <button type="submit" className="btn btn-primary contact-btn">
                            {t.contact.submit}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section>
        <div className="rs-map-area rs-map-one">
          <div className="rs-google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85563.58474013081!2d106.80547254565823!3d47.91970714391298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693cb8b951709%3A0xa96efc83b2bfe8d7!2sTrade%20and%20Development%20Bank!5e0!3m2!1smn!2smn!4v1758380694946!5m2!1smn!2smn"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
