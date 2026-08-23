import { useState } from "react";

import uscSeasons from "../assets/projects/USC Football Tracker/seasons.png";
import uscSeasonDetail from "../assets/projects/USC Football Tracker/season-detail.png";
import uscPredictor from "../assets/projects/USC Football Tracker/predictor.png";
import uscAccolades from "../assets/projects/USC Football Tracker/accolades.png";
import uscAbout from "../assets/projects/USC Football Tracker/about.png";

import worldCupPrediction from "../assets/projects/WC Predictor/final-prediction.png";

import incomingDangerGameplay from "../assets/projects/Incoming Danger/gameplay.jpg";
import incomingDangerLobby from "../assets/projects/Incoming Danger/lobby.jpg";
import incomingDangerWave from "../assets/projects/Incoming Danger/wave-survival.jpg";
import incomingDangerMainScreen from "../assets/projects/Incoming Danger/mainscreen.png";

import "./Projects.css";

function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const projects = [
    {
      id: "usc",
      title: "USC Football",
      fullTitle: "USC Football Tracker",
      category: "iOS Development & Machine Learning",
      description:
        "An iOS app for exploring 130+ years of USC football history, with machine learning-powered game predictions.",
      technologies: ["SwiftUI", "Python", "Create ML", "Core ML"],
      github: "https://github.com/codytran11/USC-Football-Tracker",
      images: [
        uscSeasons,
        uscSeasonDetail,
        uscPredictor,
        uscAccolades,
        uscAbout,
      ],
      icon: "football",
    },
    {
      id: "world-cup",
      title: "World Cup",
      fullTitle: "World Cup Predictor",
      category: "Machine Learning & Data Engineering",
      description:
        "A full ML pipeline predicting the 2026 World Cup final match, using historical international match data, Elo ratings, SQL feature engineering, and Monte Carlo simulation.",
      technologies: ["Python", "PostgreSQL", "Pandas", "Machine Learning"],
      github: "https://github.com/codytran11/wc-finale-predictor",
      images: [worldCupPrediction],
      icon: "soccer",
    },
    {
      id: "incoming-danger",
      title: "Incoming Danger",
      fullTitle: "Incoming Danger",
      category: "Game Development Internship",
      description:
        "A 5-person multiplayer wave-survival game built in Unity, featuring a networked shop and synchronized coin economy. Developed as part of a summer internship at Atlas Arena.",
      technologies: ["Unity", "C#", "Netcode for GameObjects"],
      github: "https://github.com/wurlino/atlas-game",
      images: [
        incomingDangerLobby,
        incomingDangerMainScreen,
        incomingDangerGameplay,
        incomingDangerWave,
      ],
      icon: "game",
    },
  ];

  const selectedProject = projects.find(
    (project) => project.id === activeProject,
  );

  const openProject = (projectId) => {
    setActiveProject(projectId);
    setActiveImage(0);
  };

  const closeProject = () => {
    setActiveProject(null);
    setActiveImage(0);
  };

  const nextImage = () => {
    if (!selectedProject) return;

    setActiveImage((current) => (current + 1) % selectedProject.images.length);
  };

  const previousImage = () => {
    if (!selectedProject) return;

    setActiveImage(
      (current) =>
        (current - 1 + selectedProject.images.length) %
        selectedProject.images.length,
    );
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-heading">
        <p className="projects-label">My Work</p>

        <h1 className="projects-title">Check out what I've built!</h1>
      </div>

      <div className="projects-phone">
        <div className="phone-frame">
          <div className="phone-screen">
            <div className="phone-island" />

            <div className="phone-status">
              <span>9:41</span>

              <div className="phone-status-icons">
                <span>●</span>
                <span>◒</span>
                <span>▰</span>
              </div>
            </div>

            {!selectedProject && (
              <div className="phone-home">
                <div className="phone-home-heading">
                  <p>Projects</p>
                  <span>My work</span>
                </div>

                <div className="app-grid">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      className="project-app"
                      onClick={() => openProject(project.id)}
                    >
                      <div className={`app-icon app-icon-${project.icon}`}>
                        {project.icon === "football" && (
                          <div className="football-icon">
                            <span className="football-lace lace-one" />
                            <span className="football-lace lace-two" />
                            <span className="football-lace lace-three" />
                          </div>
                        )}

                        {project.icon === "soccer" && (
                          <div className="soccer-icon">
                            <span className="soccer-center" />
                            <span className="soccer-ring" />
                          </div>
                        )}

                        {project.icon === "game" && (
                          <div className="game-icon">
                            <span className="game-dpad">+</span>

                            <div className="game-buttons">
                              <span />
                              <span />
                            </div>
                          </div>
                        )}
                      </div>

                      <span className="app-name">{project.title}</span>
                    </button>
                  ))}
                </div>

                <div className="phone-dock">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {selectedProject && (
              <div className="project-app-screen">
                <button className="project-back" onClick={closeProject}>
                  ← Projects
                </button>

                <div className="project-screen-content">
                  <div
                    className={`app-icon project-screen-icon app-icon-${selectedProject.icon}`}
                  >
                    {selectedProject.icon === "football" && (
                      <div className="football-icon">
                        <span className="football-lace lace-one" />
                        <span className="football-lace lace-two" />
                        <span className="football-lace lace-three" />
                      </div>
                    )}

                    {selectedProject.icon === "soccer" && (
                      <div className="soccer-icon">
                        <span className="soccer-center" />
                        <span className="soccer-ring" />
                      </div>
                    )}

                    {selectedProject.icon === "game" && (
                      <div className="game-icon">
                        <span className="game-dpad">+</span>

                        <div className="game-buttons">
                          <span />
                          <span />
                        </div>
                      </div>
                    )}
                  </div>

                  <h2>{selectedProject.fullTitle}</h2>

                  <p className="project-screen-category">
                    {selectedProject.category}
                  </p>

                  <div className="project-preview">
                    <img
                      src={selectedProject.images[activeImage]}
                      alt={`${selectedProject.fullTitle} ${activeImage + 1}`}
                    />

                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          className="preview-arrow preview-arrow-left"
                          onClick={previousImage}
                          aria-label="Previous project image"
                        >
                          ←
                        </button>

                        <button
                          className="preview-arrow preview-arrow-right"
                          onClick={nextImage}
                          aria-label="Next project image"
                        >
                          →
                        </button>

                        <div className="preview-counter">
                          {activeImage + 1} / {selectedProject.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  <p className="project-screen-description">
                    {selectedProject.description}
                  </p>

                  <div className="project-tech">
                    {selectedProject.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>

                  <a
                    className="project-github"
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub ↗
                  </a>
                </div>
              </div>
            )}

            <div className="phone-home-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
