import PageBanner from "@/app/components/pageBanner";
import React from "react";

export default function AboutTeam() {
  return (
    <div>
      <PageBanner />
      <section className="rs-team-area section-space rs-team-two primary-bg">
        <div className="container">
          <div className="row  g-5 justify-content-center section-title-space align-items-center">
            <div className="col-xxl-8 col-xl-10 col-lg-10">
              <div className="rs-section-title-wrapper text-center">
                <span className="rs-section-subtitle has-stroke">Our Team Member</span>
                <h2 className="rs-section-title rs-split-text-enable split-in-fade">
                  <span className="rs-theme-orange">expert team</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div
                className="rs-team-item wow fadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div className="rs-team-thumb">
                  <img src="/assets/images/team/team-thumb-05.png" alt="image" />
                </div>
                <div className="rs-team-content">
                  <div className="rs-team-inner">
                    <h5 className="rs-team-title">
                      <a href="team-details.html">Peter Hase</a>
                    </h5>
                    <span className="rs-team-designation">Co of Industrie</span>
                    <div className="rs-theme-social has-transparent has-orange">
                      <a href="#">
                        <i className="ri-twitter-x-line"></i>
                      </a>
                      <a href="#">
                        <i className="ri-facebook-fill"></i>
                      </a>
                      <a href="#">
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div
                className="rs-team-item wow fadeInUp"
                data-wow-delay=".5s"
                data-wow-duration="1s"
              >
                <div className="rs-team-thumb">
                  <img src="/assets/images/team/team-thumb-06.png" alt="image" />
                </div>
                <div className="rs-team-content">
                  <div className="rs-team-inner">
                    <h5 className="rs-team-title">
                      <a href="team-details.html">Lawrence Peter</a>
                    </h5>
                    <span className="rs-team-designation">Head of Production</span>
                    <div className="rs-theme-social has-transparent has-orange">
                      <a href="#">
                        <i className="ri-twitter-x-line"></i>
                      </a>
                      <a href="#">
                        <i className="ri-facebook-fill"></i>
                      </a>
                      <a href="#">
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div
                className="rs-team-item wow fadeInUp"
                data-wow-delay=".7s"
                data-wow-duration="1s"
              >
                <div className="rs-team-thumb">
                  <img src="/assets/images/team/team-thumb-07.png" alt="image" />
                </div>
                <div className="rs-team-content">
                  <div className="rs-team-inner">
                    <h5 className="rs-team-title">
                      <a href="team-details.html">Bradley Roy</a>
                    </h5>
                    <span className="rs-team-designation">Team Manager</span>
                    <div className="rs-theme-social has-transparent has-orange">
                      <a href="#">
                        <i className="ri-twitter-x-line"></i>
                      </a>
                      <a href="#">
                        <i className="ri-facebook-fill"></i>
                      </a>
                      <a href="#">
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div
                className="rs-team-item wow fadeInUp"
                data-wow-delay=".7s"
                data-wow-duration="1s"
              >
                <div className="rs-team-thumb">
                  <img src="/assets/images/team/team-thumb-08.png" alt="image" />
                </div>
                <div className="rs-team-content">
                  <div className="rs-team-inner">
                    <h5 className="rs-team-title">
                      <a href="team-details.html">Penelopa Miller</a>
                    </h5>
                    <span className="rs-team-designation">Sr. engineer</span>
                    <div className="rs-theme-social has-transparent has-orange">
                      <a href="#">
                        <i className="ri-twitter-x-line"></i>
                      </a>
                      <a href="#">
                        <i className="ri-facebook-fill"></i>
                      </a>
                      <a href="#">
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
