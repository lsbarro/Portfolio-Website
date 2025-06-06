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
        <div className={styles.profileImageContainer}>
          <img src={heroImg} alt="Liam Sbarro" className={styles.hero} />
        </div>
        <button 
          onClick={toggleTheme}
          className={styles.colorModeContainer}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <img src={themeIcon} alt="Theme toggle" className={styles.themeIcon} />
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.nameTitle}>
          <h1 className={styles.name}>Liam Sbarro</h1>
        </div>
        
        <p className={styles.description}>
        I'm a second-year prospective Mathematics student at UBC, with a passion for Technology and Finance. I'm particularly interested in developing solutions that enhance and optimize everyday life.
        </p>
        
        <div className={styles.actions}>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/li.am2005/" target="_blank" rel="noopener noreferrer" aria-label="Visit Liam's Instagram profile">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://github.com/lsbarro" target="_blank" rel="noopener noreferrer" aria-label="Visit Liam's GitHub profile">
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/liam-sbarro-8a2b19211/?originalSubdomain=ca" target="_blank" rel="noopener noreferrer" aria-label="Visit Liam's LinkedIn profile">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}



export default Hero;