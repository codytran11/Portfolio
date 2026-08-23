import { useState } from "react";
import "./ProjectCard.css";

function ProjectCard({
  number,
  title,
  category,
  images,
  description,
  technologies,
  github,
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  return (
    <article className={`project-showcase ${isExpanded ? "expanded" : ""}`}>
      {!isExpanded ? (
        <button
          className="project-launcher"
          onClick={() => setIsExpanded(true)}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();

            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            setMousePosition({ x, y });
          }}
          style={{
            "--mouse-x": `${mousePosition.x}%`,
            "--mouse-y": `${mousePosition.y}%`,
          }}
        >
          <div className="project-launcher-icon">{number}</div>

          <div className="project-launcher-info">
            <h2>{title}</h2>
            <p>{category}</p>
          </div>

          <span className="project-launcher-arrow">↗</span>
        </button>
      ) : (
        <>
          <div className="project-visual">
            <img
              key={currentImage}
              className="project-image"
              src={images[currentImage]}
              alt={`${title} screenshot ${currentImage + 1}`}
            />

            {images.length > 1 && (
              <div className="gallery-controls">
                <button
                  onClick={() =>
                    setCurrentImage(
                      (currentImage - 1 + images.length) % images.length,
                    )
                  }
                  aria-label="Previous screenshot"
                >
                  ←
                </button>

                <button
                  onClick={() =>
                    setCurrentImage((currentImage + 1) % images.length)
                  }
                  aria-label="Next screenshot"
                >
                  →
                </button>
              </div>
            )}

            <div className="gallery-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={index === currentImage ? "active" : ""}
                  onClick={() => setCurrentImage(index)}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="project-details">
            <div className="project-topline">
              <p className="project-number">{number}</p>

              <button
                className="project-close"
                onClick={() => setIsExpanded(false)}
                aria-label="Close project"
              >
                ×
              </button>
            </div>

            <h2>{title}</h2>

            <p className="project-category">{category}</p>

            <p className="project-description">{description}</p>

            <div className="project-tech">
              {technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <a href={github} target="_blank" rel="noreferrer">
              View project ↗
            </a>
          </div>
        </>
      )}
    </article>
  );
}

export default ProjectCard;
