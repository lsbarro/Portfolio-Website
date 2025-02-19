import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PhotographyPortfolioStyles.module.css";
import { useTheme } from "../../common/ThemeContext";
// Import your photos
import adaptiveSports1 from "./PhotoAssets/AdaptiveSports1.jpeg";
import AdaptiveSports3 from "./PhotoAssets/AdaptiveSports3.jpeg";
import AdaptiveSports2 from "./PhotoAssets/AdaptiveSports2.jpeg";
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
  const { theme } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Use imported photos
  const photos = [
    {
      id: 1,
      alt: "adaptive sports",
      src: adaptiveSports1,
    },
    {
      id: 2,
      alt: "adaptive sports",
      src: AdaptiveSports2,
    },
    {
      id: 3,
      alt: "adaptive sports",
      src: AdaptiveSports3,
    },
    {
      id: 4,
      alt: "adaptive sports",
      src: AdaptiveSports4,
    },
    {
      id: 5,
      alt: "camilo 1",
      src: GlowingLight,
    },
    {
      id: 6,
      alt: "camilo 2",
      src: SunsetBackground,
    },
    {
      id: 7,
      alt: "Moon over snowy mountains",
      src: MoonOverMountainSunsert,
    },
    {
      id: 8,
      alt: "Camilo on Rock",
      src: Onrock,
    },
    {
      id: 9,
      alt: "Mira 1",
      src: MiraIo_SF_15,
    },
    {
      id: 10,
      alt: "Mira 2",
      src: MiraIo_SF_20,
    },
    {
      id: 11,
      alt: "Mira 3",
      src: MiraIo_SF_42,
    },
    {
      id: 12,
      alt: "Mira 4",
      src: MiraIo_SF_62,
    },
    {
      id: 13,
      alt: "Matthew 1",
      src: MatthreFrontSPeaker,
    },
    {
      id: 14,
      alt: "Matthew 2",
      src: MatthewSideSpeaker,
    },
    {
      id: 15,
      alt: "Matthew 3",
      src: Swing,
    },
    {
      id: 16,
      alt: "Matthew 4",
      src: PersonWithBlueGlowingSIgn,
    },
    {
      id: 17,
      alt: "Landscape 1",
      src: SnowyTrees,
    },
    {
      id: 18,
      alt: "Landscape 2",
      src: NightSnowLight,
    },
    {
      id: 19,
      alt: "Landscape 3",
      src: DronePath,
    },
    {
      id: 20,
      alt: "Landscape 4",
      src: AlexReflection,
    },
    {
      id: 21,
      alt: "Landscape 5",
      src: AuroraAndMoon,
    },
    {
      id: 22,
      alt: "Landscape 6",
      src: CargoShip,
    },
    {
      id: 23,
      alt: "Landscape 7",
      src: MountainsDay,
    },
    {
      id: 24,
      alt: "Landscape 8",
      src: SunOverRocks,
    },
  ];

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!selectedPhoto) return;

    // Close modal on Escape key
    if (e.key === "Escape") {
      setSelectedPhoto(null);
      return;
    }

    // Find current photo index
    const currentIndex = photos.findIndex(
      (photo) => photo.id === selectedPhoto.id
    );

    // Navigate with arrow keys
    if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
      setSelectedPhoto(photos[currentIndex + 1]);
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      setSelectedPhoto(photos[currentIndex - 1]);
    }
  };

  // Add event listener for keyboard navigation
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Lock body scroll when modal is open
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedPhoto]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Home</span>
        </Link>
        <h2 className={styles.sectionTitle}>Photography Portfolio</h2>
      </div>

      <div className={styles.galleryContainer}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={styles.photoItem}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className={styles.image}
              loading="lazy"
              // Placeholder for demo purposes
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x400?text=Photo";
              }}
            />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className={styles.enlargedImageContainer}>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className={styles.enlargedImage}
              />
            </div>

            {selectedPhoto.title && (
              <h4 className={styles.photoTitle}>{selectedPhoto.title}</h4>
            )}

            <div className={styles.navigationControls}>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photos.findIndex(
                    (photo) => photo.id === selectedPhoto.id
                  );
                  if (currentIndex > 0) {
                    setSelectedPhoto(photos[currentIndex - 1]);
                  }
                }}
                disabled={
                  photos.findIndex((photo) => photo.id === selectedPhoto.id) ===
                  0
                }
                aria-label="Previous photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photos.findIndex(
                    (photo) => photo.id === selectedPhoto.id
                  );
                  if (currentIndex < photos.length - 1) {
                    setSelectedPhoto(photos[currentIndex + 1]);
                  }
                }}
                disabled={
                  photos.findIndex((photo) => photo.id === selectedPhoto.id) ===
                  photos.length - 1
                }
                aria-label="Next photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PhotographyPortfolio;
