"use client";

import { useState } from "react";

interface SidebarItem {
  id: string;
  title: string;
  content: string;
  image: string;
}

interface ClientKbProjectProps {
  sidebarItems: SidebarItem[];
  translations: Record<string, any>;
}

export default function ClientSustainabilityProject({
  sidebarItems,
  translations,
}: ClientKbProjectProps) {
  const [activeTab, setActiveTab] = useState(sidebarItems[0]?.id || "");

  const handleTabClick = (itemId: string) => {
    setActiveTab(itemId);
  };

  const renderTabContent = (item: SidebarItem) => {
    if (item.id === "3") {
      const t = translations.sustainability;
      return (
        <div className="tab-content-grid">
          <div className="grid-container">
            <div className="grid-item">
              <div className="grid-text">
                <div className="grid-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t.tabDesc3
                        .split("\n")
                        .map((paragraph: string) => `<p>${paragraph}</p>`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid-item">
              <div className="grid-image">
                <img src="/assets/company-photos/image2.jpg" alt="Praseodymium" />
              </div>
              <div className="grid-text">
                <h4>{t.tabSubTitle1}</h4>
                <div className="grid-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t.tabSubDesc1
                        .split("\n")
                        .map((paragraph: string) => `<p>${paragraph}</p>`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-image">
                <img src="/assets/company-photos/image8.jpg" alt="Praseodymium" />
              </div>
              <div className="grid-text">
                <h4>{t.tabSubTitle2}</h4>
                <div className="grid-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t.tabSubDesc2
                        .split("\n")
                        .map((paragraph: string) => `<p>${paragraph}</p>`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-image">
                <img src="/assets/company-photos/image9.png" alt="Praseodymium" />
              </div>
              <div className="grid-text">
                <h4>{t.tabSubTitle3}</h4>
                <div className="grid-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t.tabSubDesc3
                        .split("\n")
                        .map((paragraph: string) => `<p>${paragraph}</p>`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-image">
                <img src="/assets/company-photos/image10.png" alt="Praseodymium" />
              </div>
              <div className="grid-text">
                <h4>{t.tabSubTitle4}</h4>
                <div className="grid-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t.tabSubDesc4
                        .split("\n")
                        .map((paragraph: string) => `<p>${paragraph}</p>`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-image">
                <img src="/assets/company-photos/image11.png" alt="Praseodymium" />
              </div>
              <div className="grid-text">
                <h4>{t.tabSubTitle5}</h4>
                <div className="grid-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t.tabSubDesc5
                        .split("\n")
                        .map((paragraph: string) => `<p>${paragraph}</p>`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="tab-content-with-image">
          <div
            dangerouslySetInnerHTML={{
              __html: item.content
                .split("\n")
                .map((paragraph: string) => `<p>${paragraph}</p>`)
                .join(""),
            }}
          />
          <div className="content-image single-image">
            <img src={item.image} alt="Location" />
          </div>
        </div>
      );
    }
  };

  return (
    <section className="kb-project-section section-space">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <div className="kb-sidebar">
              <div className="sidebar-menu">
                {sidebarItems.map(item => (
                  <div
                    key={item.id}
                    className={`sidebar-item ${activeTab === item.id ? "active" : ""}`}
                    onClick={() => handleTabClick(item.id)}
                  >
                    <h5>{item.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="kb-content-area">
              {sidebarItems.map(item => (
                <div
                  key={item.id}
                  id={item.id}
                  className={`content-section ${activeTab === item.id ? "active" : ""}`}
                >
                  <div className="content-wrapper">
                    <h2 className="content-title">{item.title}</h2>
                    <div className="content-body">{renderTabContent(item)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
