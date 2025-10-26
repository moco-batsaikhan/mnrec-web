"use client";

import { useState } from "react";

interface SidebarItem {
  id: string;
  title: string;
  content: string;
}

interface ClientKbProjectProps {
  sidebarItems: SidebarItem[];
  translations: Record<string, any>;
}

export default function ClientKbProject({ sidebarItems, translations }: ClientKbProjectProps) {
  const [activeTab, setActiveTab] = useState(sidebarItems[0]?.id || "");

  const handleTabClick = (itemId: string) => {
    setActiveTab(itemId);
  };

  const renderTableContent = () => {
    const t = translations.kbProject;
    return (
      <div className="table-content">
        <div className="table-section">
          <h3 className="table-title">{t.tabDescTitle1}</h3>
          <div className="table-items">
            <div className="table-item">{t.tabDesc11}</div>
            <div className="table-item">{t.tabDesc12}</div>
            <div className="table-item">{t.tabDesc13}</div>
          </div>
        </div>

        <div className="table-section">
          <h3 className="table-title">{t.tabDescTitle2}</h3>
          <div className="table-items">
            <div className="table-item">{t.tabDesc21}</div>
            <div className="table-item">{t.tabDesc22}</div>
            <div className="table-item">{t.tabDesc23}</div>
          </div>
        </div>

        <div className="table-section">
          <h3 className="table-title">{t.tabDescTitle3}</h3>
          <div className="table-items">
            <div className="table-item">{t.tabDesc31}</div>
            <div className="table-item">{t.tabDesc32}</div>
          </div>
        </div>

        <div className="table-section">
          <h3 className="table-title">{t.tabDescTitle4}</h3>
          <div className="table-items">
            <div className="table-item">{t.tabDesc41}</div>
            <div className="table-item">{t.tabDesc42}</div>
            <div className="table-item">{t.tabDesc43}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = (item: SidebarItem) => {
    if (item.id === "1") {
      return renderTableContent();
    } else if (item.id === "2") {
      return (
        <div className="tab-content-with-image">
          <div
            dangerouslySetInnerHTML={{
              __html: item.content
                .split("\n")
                .map((paragraph: string) => `${paragraph}`)
                .join(""),
            }}
          />
          <div className="content-image single-image">
            <img src="/assets/images/gallery/khb/location.png" alt="Location" />
          </div>
        </div>
      );
    } else if (item.id === "3") {
      return (
        <div className="tab-content-with-image">
          <div
            dangerouslySetInnerHTML={{
              __html: item.content
                .split("\n")
                .map((paragraph: string) => `${paragraph}`)
                .join(""),
            }}
          />
          <div className="content-image single-image">
            <img src="/assets/images/gallery/sustainable/cover1.jpg" alt="Sustainable Cover" />
          </div>
        </div>
      );
    } else if (item.id === "4") {
      return (
        <div className="tab-content-with-image">
          <div
            dangerouslySetInnerHTML={{
              __html: item.content
                .split("\n")
                .map((paragraph: string) => `${paragraph}`)
                .join(""),
            }}
          />
          <div className="content-images grid-images">
            <img src="/assets/images/gallery/khb/drilling/image1.png" alt="Drilling 1" />
            <img src="/assets/images/gallery/khb/drilling/image2.jpg" alt="Drilling 2" />
            <img src="/assets/images/gallery/khb/drilling/image3.jpg" alt="Drilling 3" />
            <img src="/assets/images/gallery/khb/drilling/image4.jpg" alt="Drilling 4" />
          </div>
        </div>
      );
    } else {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: item.content
              .split("\n")
              .map((paragraph: string) => `<div>${paragraph}</div>`)
              .join(""),
          }}
        />
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
