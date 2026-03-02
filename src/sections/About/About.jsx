import { useState, useEffect } from "react";
import styles from "./AboutStyles.module.css";
import aboutPhoto from "../../assets/About.jpg";
import ShellBar from "../../common/ShellBar";

function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const experience = [
    {
      title: "Jr. Research Computing Support Analyst",
      org: "UBC Advanced Research Computing",
      period: "05/2025 – Present",
    },
    {
      title: "Asst. Director of Digital Content",
      org: "UBC Recreation",
      period: "01/2025 – 05/2025",
    },
    {
      title: "Media & Game Server Administrator",
      org: "Personal Project",
      period: "2021 – Present",
    },
    {
      title: "Barista",
      org: "Starbucks",
      period: "07/2021 – 01/2025",
    },
  ];

  const skills = [
    "Python", "C++", "Java", "Git",
    "Linux", "HPC", "Shell Scripting",
    "Slurm", "Unraid", "SQL",
  ];

  const interests = [
    "Snowboarding", "Mountain Biking", "Photography",
    "Sound Engineering", "Cooking", "Gaming",
    "Electronics", "HPC Research",
  ];

  return (
    <div className={`${styles.page} ${visible ? styles.visible : ""}`}>
      {/* Shell Bar */}
      <ShellBar className={styles.shellBar} />

      {/* Content Area */}
      <main className={styles.content}>
        {/* Intro Card */}
        <section className={styles.card}>
          <div className={styles.introRow}>
            <div className={styles.photoFrame}>
              <img src={aboutPhoto} alt="Liam Sbarro" className={styles.photo} />
            </div>
            <div className={styles.introText}>
              <h1 className={styles.heading}>Hello, I'm Liam</h1>
              <p className={styles.subtitle}>
                Computer Science Student & Technical Support Specialist
              </p>
              <p className={styles.bio}>
                I'm a third-year Mathematics student at UBC and Junior Research Computing Support Analyst with UBC's Advanced Research Computing department. Day to day, I help researchers get their work running on national HPC clusters: writing and optimizing job scripts, building software environments with tools like Slurm and Spack, and figuring out why things break under distributed load.
              </p>
              <p className={styles.bio}>
                I've been taking things apart as long as I can remember. Originally it was an occasional radio or household appliance; now I repair audio amplifiers, design and 3D print parts for things that probably don't need custom parts, and generally enjoy any problem that involves tracing a fault through a system. I also host my own server stack, running media and game hosting for a group of friends, built on HPC design principles. When I'm not at a desk, I snowboard, mountain bike, and hike around BC.
              </p>
            </div>
          </div>
        </section>

        {/* Two Column: Experience + Skills/Interests */}
        <div className={styles.columns}>
          {/* Experience */}
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.experienceList}>
              {experience.map((item, i) => (
                <div key={i} className={styles.expItem}>
                  <div className={styles.expHeader}>
                    <span className={styles.expTitle}>{item.title}</span>
                    <span className={styles.expPeriod}>{item.period}</span>
                  </div>
                  <span className={styles.expOrg}>{item.org}</span>
                </div>
              ))}
            </div>
            <div className={styles.expEducation}>
              <div className={styles.expHeader}>
                <span className={styles.expTitle}>B.A Mathematics</span>
                <span className={styles.expPeriod}>2023 – 2027</span>
              </div>
              <span className={styles.expOrg}>University of British Columbia</span>
            </div>
          </section>

          {/* Skills + Interests stacked */}
          <div className={styles.rightColumn}>
            <section className={styles.card}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className={styles.tagGrid}>
                {skills.map((skill) => (
                  <span key={skill} className={styles.tag}>{skill}</span>
                ))}
              </div>
            </section>

            <section className={styles.card}>
              <h2 className={styles.sectionTitle}>Interests</h2>
              <div className={styles.tagGrid}>
                {interests.map((interest) => (
                  <span key={interest} className={styles.tagAlt}>{interest}</span>
                ))}
              </div>
            </section>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>&copy; 2026 Liam Sbarro</span>
      </footer>
    </div>
  );
}

export default About;
