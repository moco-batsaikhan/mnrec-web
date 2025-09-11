"use client";

import { useEffect } from "react";

export default function ImageSliderScript() {
  useEffect(() => {
    const dots = document.querySelectorAll('.dot');
    const sliderContainer = document.querySelector('.slider-container') as HTMLElement;
    
    if (!dots || !sliderContainer) return;

    let currentIndex = 0;
    const totalSlides = 5;
    
    // Update active dot
    const updateDots = (index: number) => {
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    // Auto-update dots based on animation
    const updateDotsOnAnimation = () => {
      const animationDuration = 15000; // 15s total animation
      const slideInterval = animationDuration / totalSlides; // 3s per slide
      
      setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateDots(currentIndex);
      }, slideInterval);
    };

    // Click handlers for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateDots(currentIndex);
        
        // Manually control the slider position
        const translateX = -index * 20; // 20% per slide
        sliderContainer.style.transform = `translateX(${translateX}%)`;
        sliderContainer.style.animation = 'none';
        
        // Resume animation after a brief pause
        setTimeout(() => {
          sliderContainer.style.animation = 'slide 15s infinite';
        }, 1000);
      });
    });

    // Start the auto-update for dots
    updateDotsOnAnimation();

    // Cleanup on unmount
    return () => {
      dots.forEach((dot) => {
        dot.removeEventListener('click', () => {});
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
