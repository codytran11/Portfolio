import { useState, useEffect, useRef } from "react";
function About() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={aboutRef} id="about" className="about">
      <h1 className="about-title">About Me</h1>

      <div className={`about-card ${isVisible ? "visible" : ""}`}>
        <p className="about-description">
          Hi! My name is Cody Tran, and I am a second-year student at the
          University of Southern California (USC), pursuing a major in Computer
          Science and Business Administration. I'm originally from the Bay Area
          and my hobbies include sports like basketball/football and videogames.
        </p>

        <p className="about-description">
          I have a strong passion for Data Science and am hoping to apply this
          into the sports industry or gaming industry. I am also interested in
          the field of Artificial Intelligence and Machine Learning, and I am
          constantly seeking opportunities to expand my knowledge and skills in
          these areas.
        </p>
      </div>
    </section>
  );
}

export default About;
