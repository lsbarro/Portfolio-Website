import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./common/ThemeContext";
import Hero from "./sections/Hero/Hero";
import Portfolio from "./sections/Portfolio/Portfolio";
import PhotographyPortfolio from "./sections/Photography/PhotographyPortfolio";

// Style fixes
const fixStyles = {
  root: {
    display: 'block',
    overflow: 'hidden',
    width: '100vw',
    maxWidth: '100vw'
  },
  parallaxWrapper: {
    width: '100vw',
    maxWidth: '100vw',
    margin: 0,
    padding: 0,
    flex: 'none',
    overflowX: 'hidden',
    left: 0,
    right: 0,
    position: 'relative'
  }
};

// Create a ParallaxContent component to use useLocation hook
const ParallaxContent = () => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Update background scale based on content height
    const updateParallaxScale = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
        
        // Get the background element and dynamically set its height and transform
        const bgElement = document.querySelector('.background');
        if (bgElement) {
          // Calculate scale factor based on content height
          // More content = slower parallax effect
          const viewportHeight = window.innerHeight;
          const scaleFactor = Math.max(2, 1 + (height / viewportHeight) * 0.5);
          const heightFactor = Math.max(3, 1 + (height / viewportHeight));
          
          bgElement.style.height = `${heightFactor * 100}vh`;
          bgElement.style.transform = `translateZ(-2px) scale(${scaleFactor})`;
        }
      }
    };

    // Update when content changes or on resize
    updateParallaxScale();
    window.addEventListener('resize', updateParallaxScale);
    
    return () => {
      window.removeEventListener('resize', updateParallaxScale);
    };
  }, [location.pathname, contentHeight]); // Re-run when route changes

  return (
    <div className="content" ref={contentRef}>
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
        <Route
          path="/photography"
          element={<PhotographyPortfolio />}
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div style={fixStyles.root} id="root-container">
          <div className="parallax-wrapper" style={fixStyles.parallaxWrapper}>
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