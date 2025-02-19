import styles from "./PortfolioStyles.module.css";
import ProjectCard from "../../common/ProjectCard";
import photographyIcon from '../../assets/photographyicon.jpg';
import projectsIcon from '../../assets/projectsicon.jpeg';

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack React & Node.js application with payment processing",
      image: projectsIcon,
      link: "https://github.com/liamsbarro/ecommerce-platform",
      isExternal: true
    },
    {
      id: 2,
      title: "Photography Portfolio",
      description: "Responsive gallery site with dynamic image loading",
      image: photographyIcon,
      link: "/photography",
      isExternal: false
    },
    {
      id: 3,
      title: "Task Management App",
      description: "React Native mobile application with offline capabilities",
      image: projectsIcon,
      link: "https://github.com/liamsbarro/task-manager",
      isExternal: true
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