import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ErrorBoundary from "./common/ErrorBoundary";
import { ShellProvider } from "./common/ShellContext";
import Hero from "./sections/Hero/Hero";
import PhotographyPortfolio from "./sections/Photography/PhotographyPortfolio";
import Projects from "./sections/Projects/Projects";
import About from "./sections/About/About";

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    const wrapper = document.querySelector('.parallax-wrapper');
    if (wrapper) wrapper.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div className="parallax-wrapper">
      <div className="content-container">
        <div className="content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/photography" element={<PhotographyPortfolio />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <Router>
      <ShellProvider>
        <div id="root-container">
          <div className="parallax-bg" aria-hidden="true">
            <div className="background"></div>
            <div className="background-overlay"></div>
          </div>
          <AppContent />
        </div>
      </ShellProvider>
    </Router>
  );
}

export default App;
