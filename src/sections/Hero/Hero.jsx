import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/hero-img.png";
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import instagramLight from '../../assets/instagramwhite.png';
import instagramDark from '../../assets/instagramblack.png';
import githubLight from '../../assets/github-light.svg';
import githubDark from '../../assets/github-dark.svg';
import linkedinLight from '../../assets/linkedin-light.svg';
import linkedinDark from '../../assets/linkedin-dark.svg';
import CV from "../../assets/cv.pdf";
import { useTheme } from "../../common/ThemeContext";

function Hero() {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === 'light' ? sun : moon;
  const instagramIcon = theme === 'light' ? instagramLight : instagramDark;
  const githubIcon = theme === 'light' ? githubLight : githubDark;
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;

  return (
    <section className={styles.container} style={{paddingTop: 0, marginTop: 0}}>
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
        </div>
        
        <p className={styles.description}>
        I'm a second-year student at UBC interested in studying Mathematics, with a passion for Technology and Finance, particularly focused on developing solutions that enhance and optimize everyday life.
        </p>
        
        <div className={styles.actions}>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/li.am2005/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://github.com/lsbarro" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/liam-sbarro-8a2b19211/?originalSubdomain=ca" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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