import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutStyles.module.css';
import aboutPhoto from '../../assets/About.jpg';
import SkillList from '../../common/SkillList';
import BackButton from '../../common/BackButton';
import checkmarkLight from '../../assets/checkmark-light.svg';
import checkmarkDark from '../../assets/checkmark-dark.svg';
import { useTheme } from '../../common/ThemeContext';

function About() {
  const { theme } = useTheme();
  const checkmarkIcon = theme === 'light' ? checkmarkLight : checkmarkDark;

  const skills = {
    support: ['Technical troubleshooting', 'User support', 'Documentation creation', 'Customer service', 'Team collaboration'],
    systems: ['Linux command-line', 'HPC environments', 'Python', 'Java', 'React.js', 'Git', 'Shell scripting'],
    tools: ['OTRS', 'ServiceNow', 'Slurm', 'Unraid', 'Arduino', 'VS Code']
  };

  const experience = [
    {
      title: "Junior Research Computing Support Analyst",
      organization: "UBC Advanced Research Computing",
      period: "05/2025 – Present",
      description: "First-point of contact for researchers using HPC clusters, troubleshooting Linux-based technical issues",
      type: "work"
    },
    {
      title: "Assistant Director of Digital Content",
      organization: "UBC Recreation",
      period: "01/2025 – 05/2025",
      description: "Created strategic marketing content, increased event registrations by 15% year-over-year",
      type: "work"
    },
    {
      title: "Media & Game Server Administrator",
      organization: "Personal Project",
      period: "2021 – Present",
      description: "Build and maintain 4TB media server providing 4K streaming to 30+ users",
      type: "work"
    },
    {
      title: "Barista",
      organization: "Starbucks",
      period: "07/2021 – 01/2025",
      description: "Provided exceptional customer service, developed Python/Arduino solution saving 30 minutes daily",
      type: "work"
    },
    {
      title: "Computer Science Student",
      organization: "University of British Columbia",
      period: "09/2023 – 04/2027",
      description: "Second-year Computer Science major with expertise in technical support and problem-solving",
      type: "education"
    }
  ];

  const interests = [
    'Snowboarding',
    'Mountain Biking', 
    'Photography',
    'Sound Engineering',
    'Cooking',
    'Gaming',
    'Electronics',
    'HPC Research'
  ];

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <BackButton />
        <h1 className={styles.pageTitle}>About Me</h1>
      </div>

      <div className={styles.content}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <img src={aboutPhoto} alt="Liam Sbarro" className={styles.heroImage} />
          </div>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>Hello, I'm Liam</h2>
            <p className={styles.heroSubtitle}>Computer Science Student & Technical Support Specialist</p>
            <p className={styles.heroDescription}>
              Second-year Computer Science student at UBC with expertise in technical support, problem-solving, 
              and customer service. Experienced in high-performance computing environments and translating 
              complex technical concepts for diverse audiences.
            </p>
            <div className={styles.quickLinks}>
              <Link to="/photography" className={styles.quickLink}>
                View Photography
              </Link>
              <Link to="/projects" className={styles.quickLink}>
                See Projects
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className={styles.aboutSection}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>My Story</h3>
            <div className={styles.storyContent}>
              <p>
                Currently pursuing Computer Science at UBC in Vancouver, BC, where I combine academic learning 
                with hands-on technical experience. My work spans from supporting researchers on high-performance 
                computing clusters to building personal projects that solve real-world problems.
              </p>
              <p>
                I specialize in translating complex technical concepts into accessible language, whether I'm 
                helping researchers troubleshoot HPC issues or creating documentation for diverse user bases. 
                My experience includes everything from Linux system administration to developing Python solutions 
                that improve operational efficiency.
              </p>
              <p>
                When I'm not coding or providing technical support, you'll find me snowboarding in the mountains, 
                taking photographs, or working on personal projects like my 4TB media server that streams content 
                to 30+ users. I'm passionate about using technology to enhance everyday experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={styles.skillsSection}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Skills & Technologies</h3>
            <div className={styles.skillsGrid}>
              <div className={styles.skillCategory}>
                <h4 className={styles.skillCategoryTitle}>Support & Communication</h4>
                <div className={styles.skillsList}>
                  {skills.support.map((skill, index) => (
                    <SkillList key={index} src={checkmarkIcon} skill={skill} />
                  ))}
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h4 className={styles.skillCategoryTitle}>Systems & Software</h4>
                <div className={styles.skillsList}>
                  {skills.systems.map((skill, index) => (
                    <SkillList key={index} src={checkmarkIcon} skill={skill} />
                  ))}
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h4 className={styles.skillCategoryTitle}>Tools & Platforms</h4>
                <div className={styles.skillsList}>
                  {skills.tools.map((skill, index) => (
                    <SkillList key={index} src={checkmarkIcon} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className={styles.experienceSection}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Experience & Education</h3>
            <div className={styles.timeline}>
              {experience.map((item, index) => (
                <div key={index} className={`${styles.timelineItem} ${styles[item.type]}`}>
                  <div className={styles.timelineMarker}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelinePeriod}>{item.period}</div>
                    <h4 className={styles.timelineTitle}>{item.title}</h4>
                    <div className={styles.timelineOrganization}>{item.organization}</div>
                    <p className={styles.timelineDescription}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className={styles.interestsSection}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Interests & Hobbies</h3>
            <div className={styles.interestsGrid}>
              {interests.map((interest, index) => (
                <div key={index} className={styles.interestItem}>
                  <span className={styles.interestName}>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;