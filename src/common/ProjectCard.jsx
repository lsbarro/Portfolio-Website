import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectCardStyles.module.css';

const ProjectCard = ({ title, description, image, link, isExternal = true }) => {
  const renderCardContent = () => (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.overlay}>
          <span className={styles.viewProject}>
            {isExternal ? 'View Project' : 'View Gallery'}
          </span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
        aria-label={`View project: ${title}`}
      >
        {renderCardContent()}
      </a>
    );
  } else {
    return (
      <Link 
        to={link}
        className={styles.cardLink}
        aria-label={`View ${title}`}
      >
        {renderCardContent()}
      </Link>
    );
  }
};

export default ProjectCard;