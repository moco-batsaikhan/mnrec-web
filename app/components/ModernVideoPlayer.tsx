"use client";

import { useState } from "react";

interface VideoPlayerProps {
  videos: {
    id: string;
    title: string;
    url: string;
  }[];
}

export default function ModernVideoPlayer({ videos }: VideoPlayerProps) {
  const [activeVideo, setActiveVideo] = useState(0);

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
      {/* Main Video Player */}
      <div className="main-video-container">
        <div className="current-video-title">
          <h2>{videos[activeVideo].title}</h2>
        </div>
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(
              videos[activeVideo].url,
            )}?rel=0&modestbranding=1`}
            title={videos[activeVideo].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="main-video"
          ></iframe>
        </div>
        <div className="video-info">
          <h3 className="video-title">{videos[activeVideo].title}</h3>
          <div className="video-meta">
            <span className="video-number">
              Video {activeVideo + 1} of {videos.length}
            </span>
          </div>
        </div>
      </div>

      {/* Video Playlist */}
      <div className="video-playlist">
        <h4 className="playlist-title">Video Playlist</h4>
        <div className="playlist-items">
          {videos.map((video, index) => (
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
          ))}
        </div>
      </div>

      <style jsx>{`
        .modern-video-player {
          margin: 40px 0;
        }

        .main-video-container {
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          margin-bottom: 30px;
        }

        .current-video-title {
          background: linear-gradient(135deg, #2c5aa0 0%, #667eea 100%);
          padding: 20px 25px;
          color: white;
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
        }

        .video-info {
          padding: 20px 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
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
