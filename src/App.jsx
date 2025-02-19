import "./App.css";
import { ThemeProvider } from "./common/ThemeContext";
import Hero from "./sections/Hero/Hero";
import Portfolio from "./sections/Portfolio/Portfolio";

// Add this style element to your App component
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

function App() {
  return (
    <ThemeProvider>
      {/* Apply the inline style fix */}
      <div style={fixStyles.root} id="root-container">
        <div className="parallax-wrapper" style={fixStyles.parallaxWrapper}>
          <div className="parallax-bg">
            <div className="background"></div>
            <div className="background-overlay"></div>
          </div>
          <div className="content">
            <Hero />
            <Portfolio />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;