import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectsStyles.module.css";
import { useTheme } from "../../common/ThemeContext";

// Import placeholder project images
// Replace these with your actual project images when available
import projectImage1 from "../../assets/projectsicon.jpeg";
import projectImage2 from "../../assets/photographyicon.jpg";
// Import additional project images as needed

// ProjectSection component for individual project display
const ProjectSection = ({ project, viewMode = 'grid' }) => {
  const { title, description, images, details, technologies, links, category } = project;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle image click to show in modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  // Close image modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  
  // Toggle expanded view for list mode
  const toggleExpanded = () => {
    if (viewMode === 'list') {
      setIsExpanded(!isExpanded);
    }
  };
  
  // Intersection Observer for animation
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      className={`${styles.projectSection} ${viewMode === 'list' ? styles.listView : ''} ${isExpanded ? styles.expanded : ''}`}
      id={`project-${project.id}`}
      ref={sectionRef}
    >
      <div className={styles.projectHeader} onClick={viewMode === 'list' ? toggleExpanded : undefined}>
        {viewMode === 'list' && (
          <button className={styles.expandButton} aria-label={isExpanded ? "Collapse" : "Expand"}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`${styles.expandIcon} ${isExpanded ? styles.rotated : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
        
        <h3 className={styles.projectTitle}>{title}</h3>
        
        {category && viewMode === 'list' && (
          <span className={styles.categoryBadge}>{category}</span>
        )}
      </div>
      
      {viewMode === 'grid' || isExpanded ? (
        <>
          {category && viewMode === 'grid' && (
            <span className={styles.categoryBadge}>{category}</span>
          )}
          
          <div className={`${styles.projectContent} ${viewMode === 'list' ? styles.listContent : ''}`}>
            <div className={styles.projectInfo}>
              <p className={styles.projectDescription}>{description}</p>
              
              {details && details.length > 0 && (
                <div className={styles.projectDetails}>
                  {details.map((detail, index) => (
                    <p key={index} className={styles.detailItem}>{detail}</p>
                  ))}
                </div>
              )}
              
              {technologies && technologies.length > 0 && (
                <div className={styles.technologies}>
                  <h4 className={styles.technologiesTitle}>Technologies Used</h4>
                  <div className={styles.technologiesList}>
                    {technologies.map((tech, index) => (
                      <span key={index} className={styles.technologyTag}>{tech}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {links && links.length > 0 && (
                <div className={styles.projectLinks}>
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            {images && images.length > 0 && (
              <div className={styles.projectGallery}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={styles.projectImageContainer}
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || `${title} image ${index + 1}`}
                      className={styles.projectImage}
                      loading="lazy"
                    />
                    {image.caption && viewMode === 'list' && (
                      <span className={styles.thumbnailCaption}>{image.caption}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.collapsedPreview}>
          <p>{description.substring(0, 120)}...</p>
          <div className={styles.previewTags}>
            {technologies && technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className={styles.previewTag}>{tech}</span>
            ))}
            {technologies && technologies.length > 3 && (
              <span className={styles.moreTags}>+{technologies.length - 3}</span>
            )}
          </div>
        </div>
      )}
      
      {selectedImage && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={handleCloseModal}
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
                src={selectedImage.src}
                alt={selectedImage.alt || "Enlarged project image"}
                className={styles.enlargedImage}
              />
              {selectedImage.caption && (
                <p className={styles.imageCaption}>{selectedImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Projects() {
  const { theme } = useTheme();
  const scrollYRef = useRef(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get all unique categories and technologies
  const getProjectCategories = () => {
    const categories = projects.map(project => project.category);
    return ['all', ...new Set(categories)];
  };
  
  const getAllTechnologies = () => {
    const techLists = projects.map(project => project.technologies);
    const allTechs = [].concat(...techLists);
    return [...new Set(allTechs)];
  };
  
  // Filter projects based on active filter
  useEffect(() => {
    const filterProjects = () => {
      if (activeFilter === 'all') {
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter(project => 
          project.category === activeFilter || 
          project.technologies.includes(activeFilter)
        );
        setFilteredProjects(filtered);
      }
    };
    
    filterProjects();
    
    // Add animation class after filter change
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Scroll to projects container when filter changes
      if (activeFilter !== 'all') {
        const projectsContainer = document.querySelector(`.${styles.projectsContainer}`);
        if (projectsContainer) {
          setTimeout(() => {
            projectsContainer.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }, 100);
        }
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeFilter]);
  
  // Sample projects data
  // Replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Algorithmic Trading Platform",
      description: "Developed a quantitative trading system that analyzes market data to identify profitable trading opportunities.",
      category: "Finance",
      images: [
        { 
          src: projectImage1,
          alt: "Trading algorithm dashboard", 
          caption: "Main dashboard showing performance metrics"
        },
        { 
          src: projectImage2,
          alt: "Trading algorithm architecture",
          caption: "System architecture diagram" 
        },
      ],
      details: [
        "Created mathematical models to predict market movements",
        "Implemented real-time data processing pipeline",
        "Backtested strategies against 10 years of historical data",
        "Achieved 12% annual return over a 3-year simulation period"
      ],
      technologies: ["Python", "TensorFlow", "AWS", "MongoDB", "Pandas"],
      links: [
        { text: "View Code", url: "https://github.com/username/project" },
        { text: "Research Paper", url: "https://example.com/paper" }
      ]
    },
    {
      id: 2,
      title: "Chemical Art Installation",
      description: "An interactive art installation showcasing chemical reactions through a controlled environment, creating visual patterns based on audience interaction.",
      category: "Art",
      images: [
        { 
          src: projectImage2,
          alt: "Chemical art installation", 
          caption: "Complete installation at the Science Museum"
        },
        { 
          src: projectImage1,
          alt: "Chemical reaction closeup",
          caption: "Detailed view of the primary reaction chamber" 
        },
      ],
      details: [
        "Designed a safe, controlled environment for demonstrating acid-base reactions",
        "Created custom illumination system to highlight color changes",
        "Developed motion sensors that trigger different chemical combinations",
        "Collaborated with chemistry department on sustainable materials"
      ],
      technologies: ["Arduino", "Chemistry", "LED Systems", "Motion Sensors", "Glass Fabrication"],
      links: [
        { text: "Gallery", url: "https://example.com/chemical-art" },
        { text: "Process Documentation", url: "https://example.com/process" }
      ]
    },
    {
      id: 3,
      title: "Financial Analysis Tool",
      description: "A comprehensive financial analysis tool that helps users understand their spending patterns and optimize their budgets.",
      category: "Finance",
      images: [
        { 
          src: projectImage1,
          alt: "Financial dashboard", 
          caption: "Main analytics dashboard"
        }
      ],
      details: [
        "Built data visualization components for expense tracking",
        "Implemented predictive algorithms for future spending forecasts",
        "Created custom budget optimization suggestions",
        "Integrated with major banking APIs for automatic transaction imports"
      ],
      technologies: ["React", "D3.js", "Node.js", "Firebase", "Plaid API"],
      links: [
        { text: "Live Demo", url: "https://finance-tool.example.com" }
      ]
    },
    {
      id: 4,
      title: "Smart Home Energy Optimizer",
      description: "An IoT system that monitors and optimizes home energy usage, reducing electricity costs while maintaining comfort.",
      category: "IoT",
      images: [
        { 
          src: projectImage2,
          alt: "Smart home dashboard", 
          caption: "Energy monitoring interface"
        }
      ],
      details: [
        "Designed custom PCB for power monitoring",
        "Implemented machine learning algorithms to predict optimal settings",
        "Created mobile app for remote monitoring and control",
        "Reduced average household energy consumption by 22%"
      ],
      technologies: ["Raspberry Pi", "TensorFlow", "React Native", "MQTT", "C++"],
      links: [
        { text: "Project Overview", url: "https://example.com/smart-home" }
      ]
    }
  ];

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
        <h2 className={styles.sectionTitle}>My Projects</h2>
      </div>
      
      <div className={styles.controlsContainer}>
        <div className={styles.filterControls}>
          <div className={styles.categoryFilters}>
            {getProjectCategories().map(category => (
              <button
                key={category}
                className={`${styles.filterButton} ${activeFilter === category ? styles.activeFilter : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className={styles.noProjectsFound}>
          <p>No projects found matching the selected filter.</p>
          <button 
            className={styles.resetFilterButton}
            onClick={() => setActiveFilter('all')}
          >
            Show all projects
          </button>
        </div>
      ) : (
        <div className={`${styles.projectsContainer} ${isLoaded ? styles.loaded : ''}`}>
          {filteredProjects.map(project => (
            <ProjectSection 
              key={project.id} 
              project={project} 
            />
          ))}
        </div>
      )}
      
      {filteredProjects.length > 0 && (
        <div className={styles.techFilterContainer}>
          <h3 className={styles.techFilterTitle}>Filter by Technology</h3>
          <div className={styles.techFilters}>
            {getAllTechnologies().map(tech => (
              <button
                key={tech}
                className={`${styles.techFilterButton} ${activeFilter === tech ? styles.activeTechFilter : ''}`}
                onClick={() => setActiveFilter(tech === activeFilter ? 'all' : tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;