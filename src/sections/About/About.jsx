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
    "Python", "Java", "React.js", "Git",
    "Linux", "HPC", "Shell Scripting",
    "Slurm", "Unraid", "Arduino",
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
                Second-year Computer Science student at UBC with expertise
                in technical support, problem-solving, and customer service.
                Experienced in high-performance computing environments and
                translating complex technical concepts for diverse audiences.
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

        {/* Story */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>My Story</h2>
          <div className={styles.storyBody}>
            <p>
              Currently pursuing Mathematics at UBC in Vancouver, BC,
              where I combine academic learning with hands-on technical
              experience. My work spans from supporting researchers on
              high-performance computing clusters to building personal
              projects that solve real-world problems.
            </p>
            <p>
              I specialize in translating complex technical concepts into
              accessible language, whether I'm helping researchers
              troubleshoot HPC issues or creating documentation for diverse
              user bases. My experience includes everything from Linux
              system administration to developing Python solutions that
              improve operational efficiency.
            </p>
            <p>
              When I'm not coding or providing technical support, you'll
              find me snowboarding in the mountains, taking photographs, or
              working on personal projects like my 4TB media server that
              streams content to 30+ users.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>&copy; 2026 Liam Sbarro</span>
      </footer>
    </div>
  );
}

export default About;
