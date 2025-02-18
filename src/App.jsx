import "./App.css";
import { ThemeProvider } from "./common/ThemeContext";
import Hero from "./sections/Hero/Hero";
import Portfolio from "./sections/Portfolio/Portfolio";

function App() {
  return (
    <ThemeProvider>
      <div className="parallax-wrapper">
        <div className="parallax-bg">
          <div className="background"></div>
          <div className="background-overlay"></div>
        </div>
        <div className="content">
          <Hero />
          <Portfolio />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;