import PageBanner from "@/app/components/pageBanner";
import React from "react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import ContactForm from "./contact-form";
import "./style.css";

export default async function Contact(props: { params: Promise<{ locale: string }> }) {
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
                        <p
                          dangerouslySetInnerHTML={{
                            __html: t.contact.fullAddress
                              .split("\n")
                              .map((paragraph: string) => `<p>${paragraph}</p>`)
                              .join(""),
                          }}
                        />
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
                        <p>+976-7505-1801</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <ContactForm
                translations={{
                  firstName: t.contact.firstName,
                  lastName: t.contact.lastName,
                  phoneNumber: t.contact.phoneNumber,
                  yourEmail: t.contact.yourEmail,
                  subject: t.contact.subject,
                  message: t.contact.message,
                  submit: t.contact.submit,
                }}
              />
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
