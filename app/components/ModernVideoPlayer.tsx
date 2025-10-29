"use client";

import { useState, useEffect } from "react";

interface Video {
  id: string;
  title: string;
  url: string;
  type: number; 
}



export default function ModernVideoPlayer({ lang }: { lang: string }) {
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [tabVideos, setTabVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Tab labels and type mapping
  const tabLabels = lang === "en"
    ? ["Vlog", "Broadcast", "Advertisement"]
    : ["Влог", "Нэвтрүүлэг", "Сурталчилгаа"];
  const typeMap = ["vlog", "broadcast", "advertisement"];

  useEffect(() => {
    setLoading(true);
    setError("");
    console.log("type", typeMap[activeTab]);
    fetch(`/api/media/active?type=${typeMap[activeTab]}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setTabVideos(data.data.map((item: any) => ({
            id: String(item.id),
            title: item.en_title || item.mn_title || "",
            url: item.url,
            type: typeof item.type === "number" ? item.type : Number(item.type),
          })));
          setActiveVideo(0);
        } else {
          setError(data.message || "Failed to load videos");
        }
      })
      .catch(() => setError("Failed to fetch videos"))
      .finally(() => setLoading(false));
  }, [activeTab]);

  const displayVideos = tabVideos;
  const currentVideo = displayVideos.length > 0 ? (displayVideos[activeVideo] || displayVideos[0]) : undefined;

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : "";
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeId(url);
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <div className="modern-video-player">
      {/* Tab Bar */}
      <div className="video-tabs">
        <div className="video-tabs-border">
          {tabLabels.map((label, idx) => (
          <button
            key={label}
            className={`video-tab${activeTab === idx ? " active" : ""}`}
            onClick={() => {
              setActiveTab(idx);
              setActiveVideo(0);
            }}
          >
            {label}
          </button>
        ))}
        </div>
      </div>
      {/* Main Video Player */}
      <div className="main-video-container">
        <div className="current-video-title">
        </div>
        <div className="video-wrapper">
          {loading ? (
            <div className="video-loading">
              <span className="spinner"></span>
              <span className="loading-text">Loading videos...</span>
            </div>
          ) : error ? (
            <div style={{textAlign: "center", color: "#e53e3e", fontSize: "18px", padding: "40px 0"}}>{error}</div>
          ) : currentVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(
                currentVideo.url,
              )}?rel=0&modestbranding=1`}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="main-video"
            ></iframe>
          ) : (
            <div style={{textAlign: "center", color: "#999", fontSize: "18px", padding: "40px 0"}}>No video available.</div>
          )}
        </div>
        {!loading && !error && currentVideo && (
          <div className="video-info">
            <h3 className="video-title">{currentVideo.title}</h3>
          </div>
        )}
      </div>

      {/* Video Playlist */}
      <div className="video-playlist">
        <h4 className="playlist-title">Video Playlist</h4>
        <div className="playlist-items">
          {loading ? (
            <div className="video-loading">
              <span className="spinner"></span>
              <span className="loading-text">Loading videos...</span>
            </div>
          ) : error ? (
            <div style={{textAlign: "center", color: "#e53e3e", fontSize: "16px", padding: "30px 0"}}>{error}</div>
          ) : displayVideos.length === 0 ? (
            <div style={{textAlign: "center", color: "#999", fontSize: "16px", padding: "30px 0"}}>No videos found.</div>
          ) : (
            displayVideos.map((video, index) => (
              <div
                key={video.id}
                className={`playlist-item ${index === activeVideo ? "active" : ""}`}
                onClick={() => setActiveVideo(index)}
              >
                <div className="playlist-thumbnail">
                  <img
                    src={getYouTubeThumbnail(video.url)}
                    alt={video.title}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/assets/images/bg/video-bg-07.png";
                    }}
                  />
                  <div className="play-overlay">
                    <i className="fa-solid fa-play"></i>
                  </div>
                </div>
                <div className="playlist-info">
                  <h5 className="playlist-item-title">{video.title}</h5>
                  <span className="playlist-item-number">Video {index + 1}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .video-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
          background: rgba(255,255,255,0.25);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(64,188,128,0.12), 0 1.5px 8px rgba(44,90,160,0.08);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(64,188,128,0.18);
          min-width: 220px;
          min-height: 140px;
        }
        .spinner {
          width: 54px;
          height: 54px;
          border: 6px solid #e0e0e0;
          border-top: 6px solid #40BC80;
          border-right: 6px solid #2c5aa0;
          border-radius: 50%;
          animation: spin 0.8s cubic-bezier(.68,-0.55,.27,1.55) infinite;
          margin-bottom: 20px;
          box-shadow: 0 2px 12px rgba(64,188,128,0.12);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-text {
          color: #40BC80;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-shadow: 0 2px 8px rgba(64,188,128,0.10);
          margin-top: 2px;
        }
        .video-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          
        }
        .video-tabs-border {
          display: inline-flex;
          gap: 10px;
          border: 2px solid #40BC80;
          border-radius: 30px;
          padding: 8px 6px;
        }
        .video-tab {
          padding: 10px 55px;
          font-size: 16px;
          font-weight: 600;
          // border: 2px solid #40BC80;
          border-radius: 30px;
          background: #fff;
          color: #000;
          cursor: pointer;
          transition: all 0.2s;
          outline: none;
        }
        .video-tab.active {
          background: #40BC80;
          color: #fff;
          border-bottom: 2px solid #fff;
          z-index: 2;
        }
        .modern-video-player {
          margin: 40px 0;
        }

        .main-video-container {
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          margin-bottom: 30px;
          position: relative;
          z-index: 100;
        }

        .current-video-title {
          background: #fff;
          padding: 40px 45px;
          color: white;
          position: relative;
          background-image: url('/assets/images/bg/player-bg.png');
          background-repeat: no-repeat;
          background-size: 450px 250px;
          background-position: right bottom -100px;
        }

        .current-video-title h2 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          text-align: center;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 42%; /* Reduced height from 56.25% to 42% */
          background: #000;
        }

        .main-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          z-index: 1;
        }

        .video-info {
          padding: 20px 25px;
          background: #fff;
          color: white;
          position: relative;
        }
        .video-info::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: -150px;
          width: 450px;
          height: 250px;
          background-image: url('/assets/images/bg/player-bg.png');
          background-repeat: no-repeat;
          background-size: 450px 250px;
          transform: scaleX(-1);
        }
        .video-info > * {
          position: relative;
        }

        .video-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }

        .video-meta {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .video-number {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .video-playlist {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          min-height: 400px; /* Added minimum height */
        }

        .playlist-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #2c5aa0;
          border-bottom: 2px solid #2c5aa0;
          padding-bottom: 10px;
        }

        .playlist-items {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .playlist-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .playlist-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: #2c5aa0;
          cursor: pointer;
        }

        .playlist-item.active {
          border-color: #2c5aa0;
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
        }

        .playlist-thumbnail {
          position: relative;
          width: 120px;
          height: 68px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          cursor: pointer;
        }

        .playlist-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }

        .play-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          transition: all 0.3s ease;
        }

        .playlist-item:hover .play-overlay {
          background: #2c5aa0;
          transform: translate(-50%, -50%) scale(1.1);
        }

        .playlist-info {
          flex: 1;
        }

        .playlist-item-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 5px 0;
          color: #333;
          line-height: 1.3;
        }

        .playlist-item-number {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .playlist-item.active .playlist-item-title {
          color: #2c5aa0;
        }

        .playlist-item.active .playlist-item-number {
          color: #2c5aa0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .current-video-title {
            padding: 15px 20px;
          }

          .current-video-title h2 {
            font-size: 22px;
          }

          .video-title {
            font-size: 20px;
          }

          .video-info {
            padding: 15px 20px;
          }

          .video-playlist {
            padding: 20px;
          }

          .playlist-title {
            font-size: 18px;
          }

          .playlist-item {
            gap: 12px;
            padding: 12px;
          }

          .playlist-thumbnail {
            width: 100px;
            height: 56px;
          }

          .playlist-item-title {
            font-size: 14px;
          }

          .play-overlay {
            width: 25px;
            height: 25px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
