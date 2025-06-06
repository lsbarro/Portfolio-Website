import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./common/ThemeContext";
import ErrorBoundary from "./common/ErrorBoundary";
import Hero from "./sections/Hero/Hero";
import Portfolio from "./sections/Portfolio/Portfolio";
import PhotographyPortfolio from "./sections/Photography/PhotographyPortfolio";
import Projects from "./sections/Projects/Projects";
import About from "./sections/About/About";

// Improved parallax content component with optimized performance
const ParallaxContent = () => {
  const location = useLocation();
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Set up resize observer for responsive handling
  useEffect(() => {
    // Initialize viewport dimensions and device detection
    const updateViewportDimensions = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial call
    updateViewportDimensions();

    // Set up resize observer for more efficient handling
    const resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        updateViewportDimensions();
      });
    });

    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Handle scroll effects
  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    
    // Optimized scroll handler using requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (wrapper) {
            const scrollTop = wrapper.scrollTop;
            const scrollHeight = wrapper.scrollHeight;
            const clientHeight = wrapper.clientHeight;
            const maxScroll = scrollHeight - clientHeight;
            const progress = maxScroll <= 0 ? 0 : scrollTop / maxScroll;
            
            setScrollProgress(progress);
            
            // Apply parallax effect directly to background
            const background = backgroundRef.current || document.querySelector('.parallax-bg');
            if (background) {
              backgroundRef.current = background;
              // Different parallax rate based on route
              const parallaxRate = location.pathname === '/projects' ? 0.4 : 0.5;
              const translateY = scrollTop * parallaxRate;
              
              background.style.transform = `translate3d(0, ${-translateY}px, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    wrapper.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Custom styling for different routes
  useEffect(() => {
    // Apply route-specific background adjustments
    const applyRouteSpecificStyles = () => {
      const background = backgroundRef.current || document.querySelector('.background');
      const overlay = overlayRef.current || document.querySelector('.background-overlay');
      
      if (!background || !overlay) return;
      
      // Cache refs for future use
      if (!backgroundRef.current) backgroundRef.current = background;
      if (!overlayRef.current) overlayRef.current = overlay;
      
      // Common properties
      background.style.transition = 'opacity 0.5s ease';
      background.style.willChange = 'transform';
      
      if (location.pathname === '/projects') {
        // Projects page gets slightly darker overlay
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        background.style.opacity = '0.9';
      } else if (location.pathname === '/photography') {
        // Photography page gets clearer view
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        background.style.opacity = '1';
      } else {
        // Home page default
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        background.style.opacity = '0.95';
      }
    };
    
    applyRouteSpecificStyles();
    
  }, [location.pathname]);

  // Apply theme-specific adjustments
  useEffect(() => {
    const handleThemeChange = () => {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      const overlay = overlayRef.current || document.querySelector('.background-overlay');
      
      if (overlay) {
        overlayRef.current = overlay;
        overlay.style.backgroundColor = isDarkMode 
          ? 'rgba(0, 0, 0, 0.65)' 
          : 'rgba(0, 0, 0, 0.35)';
        
        overlay.style.transition = 'background-color 0.5s ease';
      }
    };
    
    // Set up mutation observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          handleThemeChange();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Initial call
    handleThemeChange();
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Create custom scrollbar
  useEffect(() => {
    let fadeTimeoutRef = null;
    
    const createScrollbar = () => {
      const existingScrollbar = document.querySelector('.custom-scrollbar');
      if (existingScrollbar) {
        return existingScrollbar;
      }
      
      const scrollbar = document.createElement('div');
      scrollbar.className = 'custom-scrollbar';
      
      const track = document.createElement('div');
      track.className = 'scrollbar-track';
      scrollbar.appendChild(track);
      
      const thumb = document.createElement('div');
      thumb.className = 'scrollbar-thumb';
      track.appendChild(thumb);
      
      document.body.appendChild(scrollbar);
      return scrollbar;
    };
    
    const scrollbar = createScrollbar();
    const thumb = scrollbar.querySelector('.scrollbar-thumb');
    
    // Update scrollbar position based on scroll progress
    const updateScrollbarPosition = () => {
      if (!thumb) return;
      
      const height = Math.max(40, (1 - scrollProgress) * viewportHeight * 0.3);
      const position = scrollProgress * (viewportHeight - height - 40);
      
      thumb.style.height = `${height}px`;
      thumb.style.top = `${position}px`;
      thumb.style.opacity = '0.6';
      
      if (fadeTimeoutRef) clearTimeout(fadeTimeoutRef);
      fadeTimeoutRef = setTimeout(() => {
        if (thumb) thumb.style.opacity = '0';
      }, 1500);
    };
    
    // Update on scroll progress change
    updateScrollbarPosition();
    
    // Mouse movement shows scrollbar
    const handleMouseMove = () => {
      if (thumb) {
        thumb.style.opacity = '0.6';
        
        if (fadeTimeoutRef) clearTimeout(fadeTimeoutRef);
        fadeTimeoutRef = setTimeout(() => {
          if (thumb) thumb.style.opacity = '0';
        }, 1500);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (fadeTimeoutRef) {
        clearTimeout(fadeTimeoutRef);
        fadeTimeoutRef = null;
      }
    };
  }, [scrollProgress, viewportHeight]);

  // Ensure interactive elements remain visible
  useEffect(() => {
    const ensureInteractivesAreVisible = () => {
      document.querySelectorAll(
        '.project-card, .gallery-item, .photo-item, .portfolio-item, a[href*="project"], button, .hover, [role="button"], .clickable'
      ).forEach(item => {
        if (item) {
          item.style.opacity = '1';
          item.style.visibility = 'visible';
          item.style.pointerEvents = 'auto';
          item.style.position = 'relative';
          item.style.zIndex = '10';
        }
      });
    };
    
    // Run after content renders
    requestAnimationFrame(() => {
      ensureInteractivesAreVisible();
    });
    
    // Also run on route changes
    return () => ensureInteractivesAreVisible();
  }, [location.pathname]);

  return (
    <div className="parallax-wrapper" ref={wrapperRef}>
      <div className="content-container">
        <div className="content" ref={contentRef}>
          <ErrorBoundary>
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
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </ErrorBoundary>
        </div>
        <div className="scroll-limiter"></div>
      </div>
    </div>
  );
};

/**
 * Main application component with improved performance
 */
function App() {
  // Set up iOS detection for better compatibility
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check for iOS
    const checkIOSDevice = () => {
      const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      
      setIsIOS(isAppleDevice);
      
      if (isAppleDevice) {
        document.documentElement.classList.add('ios-device');
      }
    };
    
    checkIOSDevice();

    // Initialize background with optimized loading
    const setupBackground = () => {
      const background = document.querySelector('.background');
      
      if (!background) return;
      
      // Set fallback color during load
      background.style.backgroundColor = 'var(--bg-fallback-color)';
      
      // Preload image for smooth transition
      const img = new Image();
      const imgSrc = "../src/assets/SUNSETBACK.jpg";
      let transformTimeoutRef = null;
      
      img.onload = () => {
        requestAnimationFrame(() => {
          background.style.backgroundImage = `url(${imgSrc})`;
          background.style.opacity = '1';
          
          // Force reflow to ensure background properly displays
          transformTimeoutRef = setTimeout(() => {
            if (background) background.style.transform = 'translateZ(0)';
          }, 100);
        });
      };
      
      img.onerror = () => {
        console.warn("Background image failed to load, using fallback color");
        background.style.opacity = '1';
      };
      
      img.src = imgSrc;
      
      // Return cleanup function
      return () => {
        if (transformTimeoutRef) {
          clearTimeout(transformTimeoutRef);
          transformTimeoutRef = null;
        }
      };
    };
    
    const backgroundCleanup = setupBackground();
    
    // Create consistent height for mobile devices and apply iOS fixes
    let setupMobileHeight = () => {
      // Fix vh units on mobile
      const setTrueHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setTrueHeight();
      window.addEventListener('resize', setTrueHeight);
      
      // Special iOS fixes
      if (isIOS) {
        document.documentElement.style.setProperty('--ios-safe-bottom', '0px');
        
        // Apply iOS-specific styles (more in CSS)
        const background = document.querySelector('.background');
        const overlay = document.querySelector('.background-overlay');
        
        if (background && overlay) {
          background.classList.add('ios-background');
          overlay.classList.add('ios-overlay');
        }
        
        // Handle orientation changes specially for iOS
        let orientationTimeoutRef = null;
        const handleOrientationChange = () => {
          if (orientationTimeoutRef) clearTimeout(orientationTimeoutRef);
          orientationTimeoutRef = setTimeout(setTrueHeight, 200);
        };
        
        window.addEventListener('orientationchange', handleOrientationChange);
        
        // Add cleanup for orientation listener
        const originalCleanup = setupMobileHeight;
        setupMobileHeight = () => {
          window.removeEventListener('resize', setTrueHeight);
          window.removeEventListener('orientationchange', handleOrientationChange);
          if (orientationTimeoutRef) {
            clearTimeout(orientationTimeoutRef);
            orientationTimeoutRef = null;
          }
        };
      }
      
      return () => {
        window.removeEventListener('resize', setTrueHeight);
      };
    };
    
    const mobileCleanup = setupMobileHeight();
    
    // Return combined cleanup function
    return () => {
      if (backgroundCleanup) backgroundCleanup();
      if (mobileCleanup) mobileCleanup();
      if (setupMobileHeight) setupMobileHeight();
    };
    
  }, [isIOS]);

  return (
    <ThemeProvider>
      <Router>
        <div id="root-container">
          <div className="parallax-bg">
            <div className="background"></div>
            <div className="background-overlay"></div>
          </div>
          <ParallaxContent />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;