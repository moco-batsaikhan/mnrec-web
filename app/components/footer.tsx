import React from "react";

export default function Footer() {
  return (
    <div className="rs-footer-bg-thumb-wrapper has-theme-orange">
      <div
        className="rs-footer-bg-thumb"
        style={{ backgroundImage: "url('/assets/images/bg/footer-bg-02.png')" }}
      ></div>

      <div className="rs-subscribe-area rs-subscribe-one has-theme-orange">
        <div className="container">
          <div className="rs-subscribe-wrapper">
            <div className="row g-5 align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="rs-subscribe-logo">
                  <img src="/assets/images/logo/logo-green.png" alt="image" />
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
                      {/* {footer.copyRight.replace(
                        "yyyy",
                        new Date().getFullYear()
                      )} */}
                      2025 .
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer>
        <div className="rs-footer-area rs-footer-two has-theme-orange">
          <div className="container">
            <div className="rs-footer-top">
              <div className="row g-5">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
                  <div className="rs-footer-widget footer-2-col-1">
                    <h5 className="rs-footer-widget-title">About Company</h5>
                    <div className="rs-footer-widget-content">
                      <p className="rs-footer-widget-description">
                        It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsums.
                      </p>
                      <div className="rs-footer-widget-stroke-text">
                        <h3 className="rs-footer-stroke-text has-theme-orange">Since 2007</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
                  <div className="rs-footer-widget footer-2-col-2">
                    <h5 className="rs-footer-widget-title">Useful Links</h5>
                    <div className="rs-footer-widget-content">
                      <div className="rs-footer-widget-links has-theme-orange">
                        <ul>
                          <li>
                            {" "}
                            <a href="#">About Us</a>{" "}
                          </li>
                          <li>
                            <a href="#">Projects</a>
                          </li>
                          <li>
                            <a href="#">Careers</a>
                          </li>
                          <li>
                            <a href="#">Blog</a>
                          </li>
                          <li>
                            <a href="#">Privacy Policy</a>
                          </li>
                          <li>
                            <a href="#">Services</a>
                          </li>
                          <li>
                            <a href="#">Pricing</a>
                          </li>
                          <li>
                            <a href="#">Team</a>
                          </li>
                          <li>
                            <a href="#">Contact</a>
                          </li>
                          <li>
                            <a href="#">Terms of use</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
                  <div className="rs-footer-widget footer-2-col-3">
                    <h5 className="rs-footer-widget-title">Office Address</h5>
                    <div className="rs-footer-widget-content">
                      <div className="rs-footer-widget-meta">
                        <div className="rs-footer-widget-address">
                          <a target="_blank" href="https://www.google.com/maps">
                            42 Mamnoun Street, Saba Carpet and Antiques Store, UK
                          </a>
                        </div>
                        <h5 className="rs-footer-widget-title">Email Address</h5>
                        <p> Interested in working with us?</p>
                        <div className="rs-footer-widget-email">
                          <a href="mailto:industrie@gmail.com">industrie@gmail.com</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
                  <div className="rs-footer-widget footer-2-col-4">
                    <h5 className="rs-footer-widget-title">Phone Number</h5>
                    <div className="rs-footer-widget-content">
                      <div className="rs-footer-widget-contact-info">
                        <div className="rs-footer-widget-number">
                          <span>
                            <a href="tel:971551579261">+971 551 579 261</a>
                          </span>
                          <span>
                            <a href="tel:971551579261">+97 155 596 1659</a>
                          </span>
                        </div>
                      </div>
                      <h5 className="rs-footer-widget-title">Follow Us</h5>
                      <div className="rs-footer-widget-social">
                        <div className="rs-theme-social has-theme-orange">
                          <a href="#">
                            <i className="ri-twitter-x-line"></i>
                          </a>
                          <a href="#">
                            <i className="ri-facebook-fill"></i>
                          </a>
                          <a href="#">
                            <i className="ri-linkedin-fill"></i>
                          </a>
                          <a href="#">
                            <i className="ri-instagram-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rs-footer-copyright-area rs-copyright-one">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-12">
                  <div className="rs-footer-copyright has-theme-orange text-center">
                    <p className="underline">
                      © <span id="year">2025</span> Industrie. Designed by{" "}
                      <a href="https://rstheme.com">RSTheme</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
