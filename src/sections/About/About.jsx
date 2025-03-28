// About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutStyles.module.css';
import aboutPhoto from '../../assets/About.jpg';
import photographyIcon from '../../assets/photographyicon.jpg';
import ProjectCard from "../../common/ProjectCard";

function About() {
    const projects = [
        {
          id: 2,
          title: "Photography Portfolio",
          description: "A collection of photos I'm proud of.",
          image: photographyIcon,
          link: "/photography",
          isExternal: false
        },
      ];

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Home</span>
        </Link>
        <h2 className={styles.sectionTitle}>About Me</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.photoContainer}>
          <div className={styles.photoWrapper}>
            <img src={aboutPhoto} alt="Liam Sbarro" className={styles.photo} />
          </div>
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
        </div>
        
        <div className={styles.textContent}>
          <div className={styles.textWrapper}>
            <h3 className={styles.welcomeText}>Hello, I'm Liam</h3>
            <p className={styles.description}>

I'm a student at UBC, where I am a Computer Science major. I currently live in Vancouver, BC, where I love to take advantage of the mountains and snowboard/mountain bike, or work on random projects and take photos in my free time! 
            </p>
            <p className={styles.description}>
            I love learning new things, am a sound engineering/audio enthusiast, and enjoy cooking, playing video games, and building electronics.
I graduated from Roosevelt High School in Portland, Oregon, and I'm continuing my education at UBC. In addition to University, I work part-time as Assistant Director of Digital Content for UBC Recreation, where I get to meet interesting people and build my design, and project management skills.

              
            </p>
            <p className={styles.description}>
            In the future, I would like to work and research with new forms of AI, and explore how to implement them into our everyday life. I'm excited to build skills in this area, combining my passion for technology with my love for learning and problem-solving to make a positive impact!
              
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;