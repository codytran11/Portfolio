import { useState, useEffect, useRef } from "react";
import "./About.css";

import portrait from "../assets/about/portrait.jpg";
import basketballTeam from "../assets/about/basketball-team.jpeg";
import badminton from "../assets/about/badminton.jpeg";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePhotoClick = (photo) => {
    setActivePhoto((current) => (current === photo ? null : photo));
  };

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("about-visual")) {
      setActivePhoto(null);
    }
  };

  return (
    <section
      ref={aboutRef}
      id="about"
      className={`about ${isVisible ? "visible" : ""}`}
    >
      <div className="about-sigil" aria-hidden="true">
        <svg viewBox="0 0 800 800" className="sigil-svg">
          <circle cx="400" cy="400" r="285" className="sigil-ring" />

          <circle
            cx="400"
            cy="400"
            r="220"
            className="sigil-ring sigil-ring-inner"
          />

          <circle
            cx="400"
            cy="400"
            r="150"
            className="sigil-ring sigil-ring-small"
          />

          <polygon
            points="400,85 675,245 675,555 400,715 125,555 125,245"
            className="sigil-geometry"
          />

          <polygon
            points="400,150 615,275 615,525 400,650 185,525 185,275"
            className="sigil-geometry sigil-geometry-inner"
          />

          <polygon
            points="400,185 585,400 400,615 215,400"
            className="sigil-diamond"
          />

          <line x1="400" y1="90" x2="400" y2="710" className="sigil-line" />

          <line x1="90" y1="400" x2="710" y2="400" className="sigil-line" />

          <line x1="180" y1="180" x2="620" y2="620" className="sigil-line" />

          <line x1="620" y1="180" x2="180" y2="620" className="sigil-line" />

          <polygon
            points="400,105 414,135 400,165 386,135"
            className="sigil-rune"
          />

          <polygon
            points="695,400 665,414 635,400 665,386"
            className="sigil-rune"
          />

          <polygon
            points="400,695 386,665 400,635 414,665"
            className="sigil-rune"
          />

          <polygon
            points="105,400 135,386 165,400 135,414"
            className="sigil-rune"
          />

          <circle cx="400" cy="115" r="6" className="sigil-node" />

          <circle cx="685" cy="400" r="6" className="sigil-node" />

          <circle cx="400" cy="685" r="6" className="sigil-node" />

          <circle cx="115" cy="400" r="6" className="sigil-node" />

          <circle cx="400" cy="250" r="4" className="sigil-star" />

          <circle cx="550" cy="400" r="4" className="sigil-star" />

          <circle cx="400" cy="550" r="4" className="sigil-star" />

          <circle cx="250" cy="400" r="4" className="sigil-star" />

          <circle cx="295" cy="295" r="3" className="sigil-star" />

          <circle cx="505" cy="295" r="3" className="sigil-star" />

          <circle cx="505" cy="505" r="3" className="sigil-star" />

          <circle cx="295" cy="505" r="3" className="sigil-star" />
        </svg>
      </div>

      <div
        className={`about-visual ${activePhoto ? "has-active-photo" : ""}`}
        onClick={handleBackgroundClick}
      >
        <svg
          className="about-constellation"
          viewBox="0 0 600 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="constellation-line"
            d="M 95 130 C 145 130, 190 175, 225 210"
          />

          <path
            className="constellation-line"
            d="M 375 410 C 430 410, 470 435, 515 470"
          />

          <path
            className="constellation-line"
            d="M 225 210 C 270 225, 330 225, 375 235"
          />

          <circle className="constellation-node" cx="95" cy="130" r="3.5" />

          <circle className="constellation-node" cx="225" cy="210" r="4" />

          <circle className="constellation-node" cx="375" cy="410" r="4" />

          <circle className="constellation-node" cx="515" cy="470" r="3.5" />

          <circle className="constellation-star" cx="290" cy="225" r="2" />

          <circle className="constellation-star" cx="330" cy="235" r="1.7" />
        </svg>

        <div
          className={`about-photo photo-one ${
            activePhoto === "portrait"
              ? "photo-focused"
              : activePhoto
                ? "photo-hidden"
                : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            handlePhotoClick("portrait");
          }}
        >
          <img src={portrait} alt="Headshot" />
        </div>

        <div
          className={`about-photo photo-two ${
            activePhoto === "basketball"
              ? "photo-focused"
              : activePhoto
                ? "photo-hidden"
                : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            handlePhotoClick("basketball");
          }}
        >
          <img src={basketballTeam} alt="Basketball team" />
        </div>

        <div
          className={`about-photo photo-three ${
            activePhoto === "badminton"
              ? "photo-focused"
              : activePhoto
                ? "photo-hidden"
                : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            handlePhotoClick("badminton");
          }}
        >
          <img src={badminton} alt="Badminton Senior Night" />
        </div>
      </div>

      <div className="about-content">
        <p className="about-label">✦ About Me</p>

        <h1 className="about-title">Hi, I'm Cody.</h1>

        <p className="about-description">
          I'm a second-year student at the University of Southern California
          (USC), pursuing a major in Computer Science and Business
          Administration. I'm originally from the Bay Area and my hobbies
          include sports like basketball/football/badminton and videogames.
        </p>

        <p className="about-description">
          I have a strong passion for Data Science and am hoping to apply this
          into the sports industry or gaming industry. I am also interested in
          the field of Artificial Intelligence and Machine Learning, and I am
          constantly seeking opportunities to expand my knowledge and skills in
          these areas. A side hobby of mine is game and app development, and I
          have experience in developing mobile applications and games using
          various programming languages and frameworks.
        </p>

        <a
          className="about-resume"
          href="/Cody_Tran_Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          View my resume <span>↗</span>
        </a>
      </div>
    </section>
  );
}

export default About;
