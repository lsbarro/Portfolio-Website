import { useState, useEffect, useMemo } from "react";
import styles from "./ProjectsStyles.module.css";
import ShellBar from "../../common/ShellBar";

import eInk1 from "./Project Photos/E-ink 1.jpg";
import eInk2 from "./Project Photos/E-ink 2.jpg";
import plotter1 from "./Project Photos/PenPlotter1.jpg";
import plotter2 from "./Project Photos/PenPlotter2.jpg";

function Projects() {
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-ink Dynamic Pricetag",
      category: "Business",
      description:
        "Developed a business plan and demo for a monetized way to solve food waste in grocery stores using e-ink dynamic pricing.",
      details: [
        "Automated dynamic pricing through e-ink technology that adjusts based on produce freshness",
        "Transforms potential waste into revenue by intelligently pricing items before they spoil",
        "Data-driven insights for store managers to optimize inventory",
      ],
      technologies: ["Python", "Raspberry Pi", "E-ink display"],
      images: [
        { src: eInk1, alt: "E-ink demo" },
        { src: eInk2, alt: "E-ink demo" },
      ],
      links: [
        {
          text: "View Pitch",
          url: "https://www.dropbox.com/scl/fi/whyyy2c0nsfbc8zq2cvxm/Comm-280-Final-Presentation.pdf?rlkey=ct992c3aveu0hnbuowr6hisk1&st=f2qsxo9a&dl=0",
        },
      ],
    },
    {
      id: 2,
      title: "Energy Monitoring System",
      category: "Computer Science",
      description:
        "Followed principles of systematic program design to develop a solution to energy bill monitoring.",
      details: [
        "Add arbitrary number of rooms and devices, each with energy consumption tracking",
        "Forecasts energy usage and cost for periods based on input energy cost",
        "Save and load configurations using JSON",
      ],
      technologies: ["Java"],
      links: [
        { text: "GitHub", url: "https://github.com/lsbarro/Energy-Monitor" },
      ],
    },
    {
      id: 3,
      title: "Python Pen-Plotter Art",
      category: "Art",
      description:
        "Custom generative Python code that exports into SVG. Includes 52,000 individual dots.",
      technologies: ["Python"],
      images: [
        { src: plotter1, alt: "Pen plotter art" },
        { src: plotter2, alt: "Pen plotter art" },
      ],
    },
  ];

  const categories = useMemo(() => {
    return ["all", ...new Set(projects.map((p) => p.category))];
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className={`${styles.page} ${visible ? styles.visible : ""}`}>
      {/* Shell Bar */}
      <ShellBar className={styles.shellBar} />

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterActive : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Projects */}
      <main className={styles.content}>
        {filtered.map((project) => (
          <section key={project.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <span className={styles.categoryTag}>{project.category}</span>
            </div>

            <p className={styles.projectDesc}>{project.description}</p>

            {project.details && (
              <ul className={styles.detailList}>
                {project.details.map((d, i) => (
                  <li key={i} className={styles.detailItem}>{d}</li>
                ))}
              </ul>
            )}

            {project.technologies && (
              <div className={styles.techRow}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            )}

            {project.images && (
              <div className={styles.gallery}>
                {project.images.map((img, i) => (
                  <div
                    key={i}
                    className={styles.imageFrame}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            {project.links && (
              <div className={styles.linkRow}>
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                  >
                    {link.text} &rarr;
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>&copy; 2026 Liam Sbarro</span>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              [X]
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
