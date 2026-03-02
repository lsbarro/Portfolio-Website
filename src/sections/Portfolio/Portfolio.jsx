import { Link } from "react-router-dom";
import styles from "./PortfolioStyles.module.css";
import aboutIcon from "../../assets/About.jpg";

function Portfolio() {
  const items = [
    {
      id: 1,
      title: "About Me",
      description: "Who I am, what I do.",
      image: aboutIcon,
      link: "/about",
    },
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Directory</h2>

      <div className={styles.grid}>
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={styles.card}
            aria-label={`Navigate to ${item.title}`}
          >
            <div className={styles.cardImageWrap}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
            <div className={styles.cardArrow}>&rarr;</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
