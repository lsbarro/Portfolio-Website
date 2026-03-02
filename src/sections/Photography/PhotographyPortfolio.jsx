import { useState, useEffect, useCallback } from "react";
import styles from "./PhotographyPortfolioStyles.module.css";
import ShellBar from "../../common/ShellBar";
import { useTheme } from "../../common/ThemeContext";

import adaptiveSports1 from "./PhotoAssets/AdaptiveSports1.jpeg";
import AdaptiveSports2 from "./PhotoAssets/AdaptiveSports2.jpeg";
import AdaptiveSports3 from "./PhotoAssets/AdaptiveSports3.jpeg";
import AdaptiveSports4 from "./PhotoAssets/AdaptiveSports4.jpeg";
import AlexReflection from "./PhotoAssets/AlexReflection.jpg";
import AuroraAndMoon from "./PhotoAssets/AuroraAndMoon.jpg";
import CargoShip from "./PhotoAssets/CargoShip.jpg";
import DronePath from "./PhotoAssets/DronePath.jpg";
import GlowingLight from "./PhotoAssets/GlowingLight.jpg";
import MatthewSideSpeaker from "./PhotoAssets/MatthewSideSpeaker.jpg";
import MatthreFrontSPeaker from "./PhotoAssets/MatthreFrontSPeaker.jpg";
import MiraIo_SF_15 from "./PhotoAssets/MiraIo_SF-15.jpg";
import MiraIo_SF_20 from "./PhotoAssets/MiraIo_SF-20.jpg";
import MiraIo_SF_42 from "./PhotoAssets/MiraIo_SF-42.jpg";
import MiraIo_SF_62 from "./PhotoAssets/MiraIo_SF-62.jpg";
import MoonOverMountainSunsert from "./PhotoAssets/MoonOverMountainSunsert.jpg";
import MountainsDay from "./PhotoAssets/MountainsDay.jpg";
import NightSnowLight from "./PhotoAssets/NightSnowLight.jpg";
import Onrock from "./PhotoAssets/Onrock.jpg";
import PersonWithBlueGlowingSIgn from "./PhotoAssets/PersonWithBlueGlowingSIgn.jpg";
import SnowyTrees from "./PhotoAssets/SnowyTrees.jpg";
import SunOverRocks from "./PhotoAssets/SunOverRocks.jpg";
import SunsetBackground from "./PhotoAssets/SunsetBackground.jpg";
import Swing from "./PhotoAssets/Swing.jpg";

function PhotographyPortfolio() {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const photos = [
    { id: 1, alt: "Adaptive sports", src: adaptiveSports1 },
    { id: 2, alt: "Adaptive sports", src: AdaptiveSports2 },
    { id: 3, alt: "Adaptive sports", src: AdaptiveSports3 },
    { id: 4, alt: "Adaptive sports", src: AdaptiveSports4 },
    { id: 5, alt: "Glowing light", src: GlowingLight },
    { id: 6, alt: "Sunset background", src: SunsetBackground },
    { id: 7, alt: "Moon over snowy mountains", src: MoonOverMountainSunsert },
    { id: 8, alt: "On rock", src: Onrock },
    { id: 9, alt: "Portrait 1", src: MiraIo_SF_15 },
    { id: 10, alt: "Portrait 2", src: MiraIo_SF_20 },
    { id: 11, alt: "Portrait 3", src: MiraIo_SF_42 },
    { id: 12, alt: "Portrait 4", src: MiraIo_SF_62 },
    { id: 13, alt: "Speaker front", src: MatthreFrontSPeaker },
    { id: 14, alt: "Speaker side", src: MatthewSideSpeaker },
    { id: 15, alt: "Swing", src: Swing },
    { id: 16, alt: "Blue glowing sign", src: PersonWithBlueGlowingSIgn },
    { id: 17, alt: "Snowy trees", src: SnowyTrees },
    { id: 18, alt: "Night snow light", src: NightSnowLight },
    { id: 19, alt: "Drone path", src: DronePath },
    { id: 20, alt: "Reflection", src: AlexReflection },
    { id: 21, alt: "Aurora and moon", src: AuroraAndMoon },
    { id: 22, alt: "Cargo ship", src: CargoShip },
    { id: 23, alt: "Mountains day", src: MountainsDay },
    { id: 24, alt: "Sun over rocks", src: SunOverRocks },
  ];

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : prev));
  }, [photos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, goNext, goPrev]);

  return (
    <div className={`${styles.page} ${visible ? styles.visible : ""}`}>
      {/* Shell Bar */}
      <ShellBar className={styles.shellBar} />

      {/* Gallery */}
      <main className={styles.galleryWrap}>
        <div className={styles.gallery}>
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={styles.photoFrame}
              onClick={() => openModal(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className={styles.photo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>{photos.length} photos</span>
        <span>&copy; 2026 Liam Sbarro</span>
        <span className={styles.themeToggle} onClick={toggleTheme}>
          [{theme === 'dark' ? 'light' : 'dark'}]
        </span>
      </footer>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTopBar}>
              <span className={styles.modalCounter}>
                {selectedIndex + 1} / {photos.length}
              </span>
              <button className={styles.closeBtn} onClick={closeModal}>
                [X]
              </button>
            </div>
            <div className={styles.modalImageWrap}>
              <img
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                className={styles.modalImage}
              />
            </div>
            <div className={styles.modalNav}>
              <button
                className={styles.navBtn}
                onClick={goPrev}
                disabled={selectedIndex === 0}
              >
                &larr; Prev
              </button>
              <button
                className={styles.navBtn}
                onClick={goNext}
                disabled={selectedIndex === photos.length - 1}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotographyPortfolio;
