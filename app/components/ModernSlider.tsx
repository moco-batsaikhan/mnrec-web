'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SliderProps {
  images: string[];
  titles?: string[];
  height?: string;
  autoplay?: boolean;
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow';
  showTitles?: boolean;
}

export default function ModernSlider({ 
  images, 
  titles = [], 
  height = '400px', 
  autoplay = true,
  effect = 'fade',
  showTitles = true
}: SliderProps) {
  return (
    <div className="modern-slider-container" style={{ height }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={autoplay ? {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        effect={effect}
        fadeEffect={{
          crossFade: true
        }}
        loop={true}
        speed={1000}
        className="modern-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img 
                src={image} 
                alt={titles[index] || `Slide ${index + 1}`}
                className="slide-image"
              />
              {showTitles && titles[index] && (
                <div className="slide-overlay">
                  <h3 className="slide-title">{titles[index]}</h3>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
      
      <style jsx>{`
        .modern-slider-container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          margin: 40px 0;
        }

        :global(.modern-swiper) {
          width: 100%;
          height: 100%;
        }

        .slide-content {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .slide-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            transparent 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          color: white;
          padding: 40px 30px 25px;
          text-align: center;
        }

        .slide-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          letter-spacing: 1px;
        }

        /* Custom Navigation Styles */
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          color: white !important;
          background: rgba(255, 255, 255, 0.2) !important;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50% !important;
          backdrop-filter: blur(10px) !important;
          transition: all 0.3s ease !important;
        }

        :global(.swiper-button-prev:hover),
        :global(.swiper-button-next:hover) {
          background: rgba(255, 255, 255, 0.3) !important;
          transform: scale(1.1) !important;
        }

        :global(.swiper-button-prev::after),
        :global(.swiper-button-next::after) {
          font-size: 18px !important;
          font-weight: bold !important;
        }

        /* Custom Pagination Styles */
        :global(.swiper-pagination) {
          bottom: 20px !important;
        }

        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }

        :global(.swiper-pagination-bullet-active) {
          background: white !important;
          transform: scale(1.2) !important;
        }

        :global(.swiper-pagination-bullet:hover) {
          background: rgba(255, 255, 255, 0.8) !important;
          transform: scale(1.1) !important;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .slide-overlay {
            padding: 20px 15px 15px;
          }
          
          .slide-title {
            font-size: 18px;
          }

          :global(.swiper-button-prev),
          :global(.swiper-button-next) {
            width: 40px !important;
            height: 40px !important;
          }

          :global(.swiper-button-prev::after),
          :global(.swiper-button-next::after) {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
