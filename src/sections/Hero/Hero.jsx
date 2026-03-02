import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/hero-img.png";
import ShellBar from "../../common/ShellBar";

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${styles.container} ${visible ? styles.visible : ""}`}>
      {/* Shell Bar */}
      <ShellBar className={styles.shellBar} />

      {/* Main Card */}
      <div className={styles.mainCard}>
        {/* Profile Row */}
        <div className={styles.profileRow}>
          <div className={styles.photoFrame}>
            <img src={heroImg} alt="Liam Sbarro" className={styles.photo} />
          </div>

          <div className={styles.identity}>
            <h1 className={styles.name}>Liam Sbarro</h1>
            <div className={styles.tagline}>
              Mathematics &mdash; UBC
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className={styles.bio}>
          Third year Mathematics student at UBC, with a
          passion for Technology and Finance. Building solutions that
          enhance and optimize everyday life.
        </p>

        {/* Navigation */}
        <nav className={styles.navRow}>
          <Link to="/about" className={styles.navButton}>
            About Me
          </Link>
          <Link to="/projects" className={styles.navButton}>
            Projects
          </Link>
          <Link to="/photography" className={styles.navButton}>
            Photos
          </Link>
        </nav>

        {/* Separator + Social */}
        <div className={styles.bottomRow}>
          <div className={styles.socialRow}>
            <a
              href="https://www.instagram.com/li.am2005/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              Instagram
            </a>
            <span className={styles.dot}>&middot;</span>
            <a
              href="https://github.com/lsbarro"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              Github
            </a>
            <span className={styles.dot}>&middot;</span>
            <a
              href="https://www.linkedin.com/in/liam-sbarro-8a2b19211/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>&copy; 2026 Liam Sbarro</span>
      </footer>
    </section>
  );
}

export default Hero;
