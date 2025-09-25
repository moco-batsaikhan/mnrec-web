"use client";

import React from "react";

export default function StickySocial() {
  return (
    <div className="sticky-social-sidebar">
      <div className="contact-info">
        <div className="contact-item">
          <a href="mailto:info@mnrec.mn" className="contact-link" title="Email">
            ✉
          </a>
        </div>
        <div className="contact-item">
          <a href="tel:+97611123456" className="contact-link" title="Phone">
            ☎
          </a>
        </div>
        <div className="contact-item">
          <a
            href="https://www.facebook.com/khalzanburegteiproject"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            title="Facebook"
          >
            f
          </a>
        </div>
      </div>
    </div>
  );
}
