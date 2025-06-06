import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BackButtonStyles.module.css';

function BackButton({ to = "/" }) {
  return (
    <Link to={to} className={styles.backButton} aria-label="Go back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.backIcon}
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </Link>
  );
}

export default BackButton;