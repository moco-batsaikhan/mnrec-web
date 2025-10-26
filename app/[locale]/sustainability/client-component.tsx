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

  const [selectedItem, setSelectedItem] = useState<{ title: string; description: string } | null>(null);

  const gridItems = [
    { title: translations.sustainability.tabSubTitle1, description: translations.sustainability.tabSubDesc1, image: "/assets/company-photos/image2.jpg" },
    { title: translations.sustainability.tabSubTitle2, description: translations.sustainability.tabSubDesc2, image: "/assets/company-photos/image8.jpg" },
    { title: translations.sustainability.tabSubTitle3, description: translations.sustainability.tabSubDesc3, image: "/assets/company-photos/image9.png" },
    { title: translations.sustainability.tabSubTitle4, description: translations.sustainability.tabSubDesc4, image: "/assets/company-photos/image10.png" },
    { title: translations.sustainability.tabSubTitle5, description: translations.sustainability.tabSubDesc5, image: "/assets/company-photos/image11.png" },
  ];

  const renderTabContent = (item: SidebarItem) => {
    if (item.id === "3") {
      const t = translations.sustainability;
      return (
        <div className="tab-content-grid">
          <div className="grid-intro-text">
            <div
              dangerouslySetInnerHTML={{
                __html: t.tabDesc3
                  .split("\n")
                  .map((paragraph: string) => `${paragraph}`)
                  .join(""),
              }}
            />
          </div>

          <div className="grid-container-two-column">
            {gridItems.map((gridItem, index) => (
              <div key={index} className="grid-card">
                <div className="grid-card-image">
                  <img src={gridItem.image} alt={gridItem.title} />
                </div>
                <div className="grid-card-content">
                  <button
                    className="grid-card-button"
                    onClick={() => setSelectedItem({ title: gridItem.title, description: gridItem.description })}
                  >
                    {gridItem.title}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Popup Modal */}
          {selectedItem && (
            <div className="sustainability-modal-overlay" onClick={() => setSelectedItem(null)}>
              <div className="sustainability-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="sustainability-modal-close" onClick={() => setSelectedItem(null)}>
                  ×
                </button>
                <div className="highlights-header col-12">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <h2 className="rs-section-title sustainability-modal-title" style={{ margin: 0, whiteSpace: 'nowrap' }}>{selectedItem.title || "Project Highlights"}</h2>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#45D3B1' }}></div>
            </div>
          </div>
                <div className="sustainability-modal-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedItem.description
                        .split("\n")
                        .map((paragraph: string) => `${paragraph}`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
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
