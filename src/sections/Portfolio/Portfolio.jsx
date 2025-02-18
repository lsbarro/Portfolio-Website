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
      link: "https://github.com/liamsbarro/ecommerce-platform"
    },
    {
      id: 2,
      title: "Photography Portfolio",
      description: "Responsive gallery site with dynamic image loading",
      image: photographyIcon,
      link: "https://photography.liamsbarro.com"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "React Native mobile application with offline capabilities",
      image: projectsIcon,
      link: "https://github.com/liamsbarro/task-manager"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather data visualization using D3.js",
      image: photographyIcon,
      link: "https://weather.liamsbarro.com"
    },
    {
      id: 5,
      title: "Personal Finance Tracker",
      description: "Secure budgeting app with data visualization",
      image: projectsIcon,
      link: "https://finance.liamsbarro.com"
    },
    {
      id: 6,
      title: "Community Forum",
      description: "Scalable discussion platform with authentication",
      image: photographyIcon,
      link: "https://github.com/liamsbarro/community-forum"
    }
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
          />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;