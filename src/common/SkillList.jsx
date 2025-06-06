import React from "react";
import styles from "./SkillListStyles.module.css";

function SkillList({ src, skill }) {
  return (
    <div className={styles.skillItem}>
      <img src={src} alt="Checkmark icon" className={styles.icon} />
      <span className={styles.skillText}>{skill}</span>
    </div>
  );
}

export default SkillList;
