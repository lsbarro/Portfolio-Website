import styles from "./PortfolioStyles.module.css";
import code from "../../assets/code.png";
import ProjectCard from "../../common/ProjectCard";
import photographyIcon from '../../assets/photographyicon.jpg';
import projectsIcon from '../../assets/projectsicon.jpeg';

function Portfolio() {
  return (
    <section id="portfolio" className={styles.container}>
      <h1 className="sectionTitle">Portfolio</h1>
      <div className={styles.portfolioContainer}>
        <ProjectCard
          src={code}
          link="https://google.com/"
          title="Software Development"
          desc=""
        />
        <ProjectCard
          src={photographyIcon}
          link="https://google.com/"
          title="Photography"
          desc=""
        />
        <ProjectCard
          src={projectsIcon}
          link="https://google.com/"
          title="Projects"
          desc=""
        />
      </div>
    </section>
  );
}

export default Portfolio;
