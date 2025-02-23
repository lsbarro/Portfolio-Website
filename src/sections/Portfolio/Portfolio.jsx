import styles from "./PortfolioStyles.module.css";
import ProjectCard from "../../common/ProjectCard";
import photographyIcon from '../../assets/photographyicon.jpg';
import projectsIcon from '../../assets/projectsicon.jpeg';

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "About me",
      description: "My name, interests. ",
      image: projectsIcon,
      link: "/about",
      isExternal: false
    },
    {
      id: 2,
      title: "Photography Portfolio",
      description: "A collection of photos I'm proud of.",
      image: photographyIcon,
      link: "/photography",
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