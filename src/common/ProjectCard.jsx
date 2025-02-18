import React from 'react';
import styles from './ProjectCardStyles.module.css';

const ProjectCard = ({ title, description, image, link }) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.cardLink}
      aria-label={`View project: ${title}`}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
          <div className={styles.overlay}>
            <span className={styles.viewProject}>View Project</span>
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;