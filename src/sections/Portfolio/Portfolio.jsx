import styles from "./PortfolioStyles.module.css";
import ProjectCard from "../../common/ProjectCard";
import projectsIcon from '../../assets/projectsicon.jpeg';
import aboutIcon from '../../assets/About.jpg';

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "About me",
      description: "My name, interests. ",
      image: aboutIcon,
      link: "/about",
      isExternal: false
    },
    {
      id: 3,
      title: "Projects",
      description: "Ranging from business ideas to chemical art.",
      image: projectsIcon,
      link: "/projects",
      isExternal: false
    },
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Portfolio</h2>
      
      <div className={styles.portfolioContainer}>
        {projects.map(project => (
          <ProjectCard 
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
            isExternal={project.isExternal}
          />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;