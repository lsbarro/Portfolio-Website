import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/hero-img.png";
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import twitterLight from '../../assets/twitter-light.svg';
import twitterDark from '../../assets/twitter-dark.svg';
import githubLight from '../../assets/github-light.svg';
import githubDark from '../../assets/github-dark.svg';
import linkedinLight from '../../assets/linkedin-light.svg';
import linkedinDark from '../../assets/linkedin-dark.svg';
import CV from "../../assets/cv.pdf";
import { useTheme } from "../../common/ThemeContext";

function Hero() {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === 'light' ? sun : moon;
  const twitterIcon = theme === 'light' ? twitterLight : twitterDark;
  const githubIcon = theme === 'light' ? githubLight : githubDark;
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;

  return (
    <section className={styles.container}>
      <div className={styles.profileSection}>
        <button 
          onClick={toggleTheme}
          className={styles.colorModeContainer}
          aria-label="Toggle dark mode"
        >
          <img src={heroImg} alt="Liam Sbarro" className={styles.hero} />
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.nameTitle}>
          <h1 className={styles.name}>Liam Sbarro</h1>
          <h2 className={styles.title}>Software Developer</h2>
        </div>
        
        <p className={styles.description}>
          I'm a passionate software developer focused on creating intuitive and responsive web applications. With expertise in modern JavaScript frameworks and a keen eye for design, I build solutions that deliver exceptional user experiences.
        </p>
        
        <div className={styles.actions}>
          <div className={styles.socialLinks}>
            <a href="https://twitter.com/liamsbarro" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="https://github.com/liamsbarro" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="https://linkedin.com/in/liamsbarro" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
          
          <a href={CV} download className={styles.resumeLink}>
            <button className={styles.resumeButton}>Resume</button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;