import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./common/ThemeContext";
import Hero from "./sections/Hero/Hero";
import Portfolio from "./sections/Portfolio/Portfolio";
import PhotographyPortfolio from "./sections/Photography/PhotographyPortfolio";

// Style constants
const STYLE_CONSTANTS = {
  mobile: {
    breakpoint: 768,
    extraSmall: 375,
    small: 576,
    bottomPadding: 60,
  },
  desktop: {
    bottomPadding: 100,
  },
  rootStyles: {
    display: "block",
    overflow: "hidden",
    width: "100vw",
    maxWidth: "100vw",
  },
  wrapperStyles: {
    width: "100vw",
    maxWidth: "100vw",
    margin: 0,
    padding: 0,
    flex: "none",
    overflowX: "hidden",
    left: 0,
    right: 0,
    position: "relative",
  }
};

/**
 * Ensures all project links and interactive elements are visible
 */
const makeSureInteractivesAreVisible = () => {
  const interactiveElements = document.querySelectorAll(
    '.project-card, .gallery-item, .photo-item, .portfolio-item, a[href*="project"], button, .hover, [role="button"], .clickable'
  );
  
  interactiveElements.forEach(item => {
    if (item) {
      item.style.opacity = '1';
      item.style.visibility = 'visible';
      item.style.pointerEvents = 'auto';
      item.style.position = 'relative';
      item.style.zIndex = '10';
    }
  });
};

/**
 * Manages parallax scrolling content with dynamic sizing
 * @returns {JSX.Element} The parallax content component
 */
const ParallaxContent = () => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Handle device detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= STYLE_CONSTANTS.mobile.breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Create custom scrollbar
  useEffect(() => {
    const createCustomScrollbar = () => {
      // Remove any existing scrollbar to prevent duplicates
      const existingScrollbar = document.querySelector('.custom-scrollbar');
      if (existingScrollbar) {
        existingScrollbar.remove();
      }
      
      // Create scrollbar container
      const scrollbarContainer = document.createElement('div');
      scrollbarContainer.className = 'custom-scrollbar';
      document.body.appendChild(scrollbarContainer);
      
      // Create track
      const track = document.createElement('div');
      track.className = 'scrollbar-track';
      scrollbarContainer.appendChild(track);
      
      // Create thumb
      const thumb = document.createElement('div');
      thumb.className = 'scrollbar-thumb';
      track.appendChild(thumb);
      
      return { container: scrollbarContainer, track, thumb };
    };
    
    const { thumb } = createCustomScrollbar();
    
    // Update scrollbar position
    const updateScrollbarPosition = () => {
      const wrapper = document.querySelector('.parallax-wrapper');
      if (!wrapper || !thumb) return;
      
      const scrollPercent = wrapper.scrollTop / (wrapper.scrollHeight - wrapper.clientHeight || 1);
      const thumbHeight = Math.max(40, (wrapper.clientHeight / wrapper.scrollHeight) * wrapper.clientHeight * 0.96);
      
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.top = `${scrollPercent * (wrapper.clientHeight * 0.96 - thumbHeight)}px`;
      
      // Show scrollbar when scrolling
      thumb.style.opacity = '0.6';
      
      clearTimeout(thumb.fadeTimeout);
      thumb.fadeTimeout = setTimeout(() => {
        thumb.style.opacity = '0';
      }, 1500);
    };
    
    // Add scroll event listener
    const wrapper = document.querySelector('.parallax-wrapper');
    if (wrapper) {
      wrapper.addEventListener('scroll', updateScrollbarPosition);
      updateScrollbarPosition();
    }
    
    // Show scrollbar on mouse move
    const handleMouseMove = () => {
      if (thumb) {
        thumb.style.opacity = '0.6';
        
        clearTimeout(thumb.fadeTimeout);
        thumb.fadeTimeout = setTimeout(() => {
          thumb.style.opacity = '0';
        }, 1500);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (wrapper) {
        wrapper.removeEventListener('scroll', updateScrollbarPosition);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      if (thumb) clearTimeout(thumb.fadeTimeout);
    };
  }, []);

  // Theme change detection
  useEffect(() => {
    const handleThemeChange = () => {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      const overlay = document.querySelector(".background-overlay");
      
      if (overlay && isDarkMode) {
        // Ensure dark mode overlay extends fully
        overlay.style.opacity = "1";
        overlay.style.height = "600vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      }
    };
    
    // Initial check
    handleThemeChange();
    
    // Setup mutation observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          handleThemeChange();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // Handle parallax scaling and content visibility
  useEffect(() => {
    /**
     * Creates a gradient mask for content fade-out
     */
    const createContentMask = () => {
      let mask = document.querySelector('.content-mask');
      if (!mask) {
        mask = document.createElement('div');
        mask.className = 'content-mask';
        document.body.appendChild(mask);
      }
      
      // Style the mask to blend with background
      mask.style.position = 'fixed';
      mask.style.bottom = '0';
      mask.style.left = '0';
      mask.style.width = '100%';
      mask.style.height = '40px'; 
      mask.style.background = 'linear-gradient(to bottom, transparent 0%, var(--background-color) 100%)';
      mask.style.pointerEvents = 'none';
      mask.style.zIndex = '5';
      mask.style.opacity = '0.8';
    };

    /**
     * Special handling for photo galleries
     * @param {number} bottomPadding - Base padding amount
     */
    const handlePhotoGallery = (bottomPadding) => {
      // Find gallery container
      const galleryContainer = document.querySelector('.photo-gallery-container, .photography-portfolio');
      if (galleryContainer) {
        // Add extra space for last row of photos
        const additionalSpace = 150;
        
        // Adjust content padding
        if (contentRef.current) {
          contentRef.current.style.paddingBottom = `${bottomPadding + additionalSpace}px`;
        }
        
        // Update mask for photo galleries - make it minimal
        const mask = document.querySelector('.content-mask');
        if (mask) {
          mask.style.height = '30px';
          mask.style.opacity = '0.6';
          mask.style.background = 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--background-color) 100%)';
        }
        
        // Ensure all photos are visible
        const photoItems = galleryContainer.querySelectorAll('.photo-item, .gallery-item');
        if (photoItems && photoItems.length > 0) {
          photoItems.forEach(item => {
            if (item) item.style.opacity = '1';
          });
        }
      }
    };

    /**
     * Configures background for mobile devices
     * @param {HTMLElement} bgElement - The background element
     * @param {number} width - The viewport width
     */
    const configureForMobile = (bgElement, width) => {
      let scale, bgSize;
      
      if (width <= STYLE_CONSTANTS.mobile.extraSmall) {
        scale = 1.3;
        bgSize = '300% auto';
      } else if (width <= STYLE_CONSTANTS.mobile.small) {
        scale = 1.4;
        bgSize = '250% auto';
      } else {
        scale = 1.5;
        bgSize = '200% auto';
      }
      
      bgElement.style.backgroundRepeat = 'repeat';
      bgElement.style.transform = `translateZ(-1px) scale(${scale})`;
      bgElement.style.willChange = 'transform';
      bgElement.style.backgroundSize = bgSize;
      bgElement.style.backfaceVisibility = 'hidden';
    };

    /**
     * Configures background for desktop devices
     * @param {HTMLElement} bgElement - The background element
     * @param {number} contentHeight - The content height
     * @param {number} viewportHeight - The viewport height
     */
    const configureForDesktop = (bgElement, contentHeight, viewportHeight) => {
      const scaleFactor = Math.max(2, 1 + (contentHeight / viewportHeight) * 0.3);
      bgElement.style.transform = `translateZ(-2px) scale(${scaleFactor})`;
      bgElement.style.willChange = 'transform';
      bgElement.style.backgroundSize = 'cover';
      bgElement.style.backgroundRepeat = 'repeat-y';
      bgElement.style.backfaceVisibility = 'hidden';
    };

    /**
     * Updates background scaling and limits scrolling based on content height
     */
    const updateParallaxScale = () => {
      if (!contentRef.current) return;

      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      
      // Get required elements
      const elements = {
        bg: document.querySelector('.background'),
        overlay: document.querySelector('.background-overlay'),
        wrapper: document.querySelector('.parallax-wrapper'),
      };
      
      if (!elements.bg || !elements.overlay || !elements.wrapper) return;
      
      const viewport = {
        height: window.innerHeight,
        width: window.innerWidth,
      };
      const isMobileView = viewport.width <= STYLE_CONSTANTS.mobile.breakpoint;
      
      // Configure dimensions
      const bottomPadding = isMobileView 
        ? STYLE_CONSTANTS.mobile.bottomPadding 
        : STYLE_CONSTANTS.desktop.bottomPadding;
        
      // Calculate visible content height to prevent cutoff
      const visibleContentHeight = Math.max(
        height, 
        viewport.height * 1.2
      );
      const maxScrollHeight = visibleContentHeight + bottomPadding;
      
      // Ensure background extends well beyond content
      const backgroundExtension = viewport.height * 2;
      const totalBackgroundHeight = Math.max(maxScrollHeight + backgroundExtension, viewport.height * 4);
      
      // Apply dimensions with extra safety margin
      elements.bg.style.height = `${totalBackgroundHeight}px`;
      elements.overlay.style.height = `${totalBackgroundHeight}px`;
      
      // Ensure overlay extends fully in dark mode
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        elements.overlay.style.opacity = '1';
        elements.overlay.style.height = `${totalBackgroundHeight * 1.5}px`;
      }
      
      // Make sure wrapper can scroll properly
      elements.wrapper.style.overscrollBehavior = 'none';
      elements.wrapper.style.willChange = 'scroll-position';
      
      // Setup content container
      const contentContainer = document.querySelector('.content-container');
      if (contentContainer) {
        contentContainer.style.overflow = 'visible';
        contentContainer.style.height = 'auto';
        contentContainer.style.minHeight = '100vh';
        contentContainer.style.maxHeight = 'none';
        contentContainer.style.willChange = 'contents';
      }
      
      // Configure background display based on device
      if (isMobileView) {
        configureForMobile(elements.bg, viewport.width);
      } else {
        configureForDesktop(elements.bg, visibleContentHeight, viewport.height);
      }
      
      // Update CSS custom property
      document.documentElement.style.setProperty(
        '--content-bottom-space', 
        `${bottomPadding}px`
      );
      
      // Handle special case for photo galleries
      if (location.pathname.includes('/photography')) {
        handlePhotoGallery(bottomPadding);
      }
      
      // Create gradient mask for content fade-out
      createContentMask();

      // Make sure all interactive elements are visible
      makeSureInteractivesAreVisible();
    };

    /**
     * Forces background to align to top of viewport
     */
    const forceTopAlignment = () => {
      const elements = {
        bg: document.querySelector(".background"),
        overlay: document.querySelector(".background-overlay")
      };

      if (elements.bg && elements.overlay) {
        elements.bg.style.top = "0";
        elements.overlay.style.top = "0";
        
        // Ensure dark mode overlay extends fully
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
          elements.overlay.style.opacity = "1";
          elements.overlay.style.height = "600vh";
        }
        
        requestAnimationFrame(updateParallaxScale);
      }
    };

    // Setup events and initial state
    updateParallaxScale();
    forceTopAlignment();
    
    // Debounced resize handler for better performance
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateParallaxScale();
        forceTopAlignment();
      }, 100);
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [location.pathname, contentHeight, isMobile]);

  return (
    <div className="content-container">
      <div className="content" ref={contentRef} style={{ paddingTop: 0, marginTop: 0 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Portfolio />
              </>
            }
          />
          <Route path="/photography" element={<PhotographyPortfolio />} />
        </Routes>
      </div>
    </div>
  );
};

/**
 * Main application component
 * @returns {JSX.Element} The App component
 */
function App() {
  useEffect(() => {
    /**
     * Forces browser reflow to fix initial rendering issues
     */
    const forceReflow = () => {
      const elements = {
        bg: document.querySelector(".background"),
        overlay: document.querySelector(".background-overlay")
      };

      if (!elements.bg || !elements.overlay) return;

      // Use requestAnimationFrame for more efficient reflow
      requestAnimationFrame(() => {
        // Toggle display to force reflow
        ['bg', 'overlay'].forEach(el => {
          elements[el].style.display = "none";
          void elements[el].offsetHeight; // Force reflow
          elements[el].style.display = "block";
        });
      });
    };

    /**
     * Applies iOS-specific fixes
     */
    const applyIOSFixes = () => {
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      if (!isIOS) return;

      document.documentElement.style.setProperty("--ios-bg-height", "600vh");

      const elements = {
        bg: document.querySelector(".background"),
        overlay: document.querySelector(".background-overlay")
      };

      if (!elements.bg || !elements.overlay) return;

      // Apply iOS-specific optimizations
      Object.values(elements).forEach(el => {
        el.style.position = "fixed";
        el.style.top = "0";
        el.style.height = "600vh";
        el.style.transform = `translateZ(0)`;
        el.style.webkitOverflowScrolling = "touch";
      });

      // Fix iOS background attachment issues
      elements.bg.style.backgroundAttachment = "fixed";
      elements.bg.style.webkitBackfaceVisibility = "hidden";
      
      // Extra height for dark mode on iOS
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        elements.overlay.style.height = "800vh";
        elements.overlay.style.opacity = "1";
        elements.overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      }
    };

    /**
     * Ensures background displays properly
     */
    const optimizeBackgroundDisplay = () => {
      const bg = document.querySelector(".background");
      if (!bg) return;
      
      // Set background color during image load
      bg.style.backgroundColor = "var(--bg-fallback-color)";
      
      // Preload image with improved error handling
      const img = new Image();
      img.onload = () => {
        requestAnimationFrame(() => {
          bg.style.backgroundImage = `url("${img.src}")`;
          bg.style.opacity = "1";
        });
      };
      img.onerror = () => {
        console.warn("Background image failed to load, using fallback color");
        bg.style.opacity = "1";
      };
      img.src = "../src/assets/SUNSETBACK.jpg";
      
      // Apply performance optimizations
      bg.style.willChange = "transform";
      bg.style.backfaceVisibility = "hidden";
    };

    // Execute initialization in optimal sequence
    requestAnimationFrame(() => {
      optimizeBackgroundDisplay();
      setTimeout(() => {
        applyIOSFixes();
        forceReflow();
      }, 50);
    });
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div style={STYLE_CONSTANTS.rootStyles} id="root-container">
          <div className="parallax-wrapper" style={STYLE_CONSTANTS.wrapperStyles}>
            <div className="parallax-bg">
              <div className="background"></div>
              <div className="background-overlay"></div>
            </div>
            <ParallaxContent />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;