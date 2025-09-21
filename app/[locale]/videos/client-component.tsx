"use client";

import { useState } from "react";
import ModernVideoPlayer from "../../components/ModernVideoPlayer";

interface VideoData {
  id: string;
  title: string;
  url: string;
}

interface ClientVideosProps {
  videoData: VideoData[];
  translations: any;
}

export default function ClientVideos({ videoData, translations }: ClientVideosProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const downloadImage = (imageNumber: number) => {
    const link = document.createElement("a");
    link.href = `/assets/images/company-photos/image${imageNumber}.jpg`;
    link.download = `company-image-${imageNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderGallery = () => {
    const images = [];
    for (let i = 1; i <= 8; i++) {
      images.push(
        <div key={i} className="col-lg-4 col-md-6 col-sm-12">
          <div className="gallery-item">
            <div className="gallery-image">
              <img
                src={`/assets/company-photos/image${i}.jpg`}
                alt={`Company Photo ${i}`}
                className="img-fluid"
              />
              <div className="gallery-overlay">
                <button
                  className="download-btn"
                  onClick={() => downloadImage(i)}
                  title="Download Image"
                >
                  <i className="fas fa-download"></i>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>,
      );
    }
    return <div className="row">{images}</div>;
  };

  return (
    <section className="videos-gallery-section section-space">
      <div className="container">
        <div className="row">
          {/* Tab Navigation - Left Side */}
          <div className="col-lg-3 col-md-4">
            <div className="tab-navigation-sidebar">
              <div className="nav nav-tabs-vertical" role="tablist">
                <button
                  className={`nav-link ${activeTab === 0 ? "active" : ""}`}
                  onClick={() => handleTabClick(0)}
                  type="button"
                >
                  <i className="fas fa-images"></i>
                  {translations.videos.banner.breadcrumb2}
                </button>
                <button
                  className={`nav-link ${activeTab === 1 ? "active" : ""}`}
                  onClick={() => handleTabClick(1)}
                  type="button"
                >
                  <i className="fas fa-video"></i>
                  {translations.videos.banner.breadcrumb1}
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8">
            <div className="tab-content">
              <div className={`tab-pane ${activeTab === 0 ? "active" : ""}`}>
                {activeTab === 0 && renderGallery()}
              </div>

              <div className={`tab-pane ${activeTab === 1 ? "active" : ""}`}>
                {activeTab === 1 && <ModernVideoPlayer videos={videoData} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
