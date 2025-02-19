import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectCardStyles.module.css';

const ProjectCard = ({ title, description, image, link, isExternal }) => {
  // Render different wrapper based on whether link is internal or external
  const renderCard = () => (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.overlay}>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );

  return isExternal ? (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.cardLink}
      aria-label={`View project: ${title}`}
    >
      {renderCard()}
    </a>
  ) : (
    <Link
      to={link}
      className={styles.cardLink}
      aria-label={`View project: ${title}`}
    >
      {renderCard()}
    </Link>
  );
};

export default ProjectCard;