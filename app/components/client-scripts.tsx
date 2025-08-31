"use client";
import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ClientScripts() {
  useEffect(() => {
    // Only import and initialize scripts on the client side
    const initializeScripts = async () => {
      try {
        // jQuery should already be available from the script tag, but let's double-check
        let $;
        if (typeof window !== "undefined" && (window as any).$) {
          $ = (window as any).$;
          console.log("Using global jQuery");
        } else {
          // Fallback to importing jQuery if not available globally
          $ = (await import("jquery")).default;
          (window as any).$ = $;
          (window as any).jQuery = $;
          (window as any).jquery = $;
          console.log("Imported jQuery as fallback");
        }

        // Wait a bit to ensure jQuery is fully available
        await new Promise(resolve => setTimeout(resolve, 100));

        // Now load other libraries that depend on jQuery
        await import("bootstrap");

        // Skip magnific-popup and WOW since they're loaded via script tags
        // await import("magnific-popup");

        // Load libraries that don't depend on jQuery
        const Swiper = (await import("swiper")).default;
        const Isotope = (await import("isotope-layout")).default;
        const imagesLoaded = (await import("imagesloaded")).default;

        // Make Swiper globally available for main.js
        (window as any).Swiper = Swiper;

        // Make imagesLoaded globally available (it's used as jQuery plugin in main.js)
        (window as any).imagesLoaded = imagesLoaded;

        // Make Isotope globally available and set it up as jQuery plugin
        (window as any).Isotope = Isotope;

        // Set up Isotope as a jQuery plugin
        if ($ && $.fn) {
          ($ as any).fn.isotope = function (options: any) {
            return this.each(function (this: HTMLElement) {
              if (!$(this).data("isotope")) {
                const isotope = new Isotope(this, options);
                $(this).data("isotope", isotope);
              }
              return $(this).data("isotope");
            });
          };
        }

        // Load jarallax - check if available globally first, then import if needed
        let jarallax;
        if (typeof (window as any).jarallax !== "undefined") {
          jarallax = (window as any).jarallax;
          console.log("Using global jarallax");
        } else {
          // Fallback to importing jarallax if not available globally
          const jarallaxModule = await import("jarallax");
          jarallax = jarallaxModule.jarallax;

          // Make jarallax globally available
          if (typeof window !== "undefined") {
            (window as any).jarallax = jarallax;
          }
          console.log("Imported jarallax as fallback");
        }

        const gsap = (await import("gsap")).default;
        const Chart = (await import("chart.js/auto")).default;
        const noUiSlider = (await import("nouislider")).default;
        const Odometer = (await import("odometer")).default;

        // Make these libraries globally available for main.js
        (window as any).gsap = gsap;
        (window as any).Chart = Chart;
        (window as any).noUiSlider = noUiSlider;
        (window as any).Odometer = Odometer;

        // NiceSelect is now loaded via script tag as jQuery plugin

        // WOW.js is now loaded via script tag, check if it's available globally
        if (typeof (window as any).WOW !== "undefined") {
          try {
            new (window as any).WOW().init();
            console.log("WOW.js initialized successfully from global");
          } catch (error) {
            console.error("Error initializing WOW.js:", error);
          }
        } else {
          console.warn("WOW.js not available globally");
        }

        console.log("All scripts initialized successfully");

        // Add safety patches before loading main.js
        const safetyScript = document.createElement("script");
        safetyScript.textContent = `
          // Patch for getTotalLength error
          (function() {
            const originalQuerySelector = document.querySelector;
            document.querySelector = function(selector) {
              const element = originalQuerySelector.call(this, selector);
              if (selector === ".backtotop-wrap path" && !element) {
                console.warn("Back to top progress path element not found - creating placeholder");
                // Return a mock element with getTotalLength method
                return {
                  getTotalLength: function() { return 0; },
                  style: {},
                  getBoundingClientRect: function() { return {}; }
                };
              }
              return element;
            };
          })();
          
          // Patch for WOW.js to prevent double initialization
          (function() {
            // Mark that WOW.js has already been initialized
            window._wowInitialized = true;
            
            // Override wowAnimation function in main.js to prevent double initialization
            window.wowAnimation = function() {
              console.log("WOW.js already initialized, skipping main.js initialization");
            };
          })();
          
          // Patch for Swiper autoplay safety
          (function() {
            // Add safety checks for Swiper autoplay methods
            const originalSwiperConstructor = window.Swiper;
            if (originalSwiperConstructor) {
              window.Swiper = function() {
                const instance = new originalSwiperConstructor(...arguments);
                
                // Ensure autoplay object exists with safe methods
                if (instance && !instance.autoplay) {
                  instance.autoplay = {
                    stop: function() { console.warn('Swiper autoplay not enabled - stop() ignored'); },
                    start: function() { console.warn('Swiper autoplay not enabled - start() ignored'); }
                  };
                } else if (instance && instance.autoplay) {
                  // Wrap existing methods with safety checks
                  const originalStop = instance.autoplay.stop;
                  const originalStart = instance.autoplay.start;
                  
                  instance.autoplay.stop = function() {
                    try {
                      if (originalStop) originalStop.call(this);
                    } catch (e) {
                      console.warn('Swiper autoplay stop error:', e);
                    }
                  };
                  
                  instance.autoplay.start = function() {
                    try {
                      if (originalStart) originalStart.call(this);
                    } catch (e) {
                      console.warn('Swiper autoplay start error:', e);
                    }
                  };
                }
                
                return instance;
              };
              
              // Copy static properties
              Object.setPrototypeOf(window.Swiper, originalSwiperConstructor);
              Object.assign(window.Swiper, originalSwiperConstructor);
            }
          })();
        `;
        document.head.appendChild(safetyScript);

        // Now that all dependencies are loaded, we can safely load main.js
        const mainScript = document.createElement("script");
        mainScript.src = "/assets/js/main.js";
        mainScript.onload = () => {
          console.log("main.js loaded successfully after dependencies");
        };
        mainScript.onerror = () => {
          console.error("Failed to load main.js");
        };
        document.head.appendChild(mainScript);
      } catch (error) {
        console.error("Error initializing scripts:", error);
      }
    };

    initializeScripts();
  }, []);

  return null;
}
