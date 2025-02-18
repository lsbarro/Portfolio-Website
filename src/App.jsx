import "./App.css";
import Hero from "./sections/Hero/Hero";
import Portfolio from "./sections/Portfolio/Portfolio";
import Skills from "./sections/Skills/Skills";

function App() {
    return (
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
    );
  }

export default App;