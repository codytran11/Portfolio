import { useEffect, useState } from "react";
import "./Scroll.css";

function Scroll() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const currentProgress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setProgress(currentProgress);

      const sections = ["about", "projects", "contact"];

      let currentSection = "about";

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.45) {
          currentSection = section;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (section) => {
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-map">
      <div className="scroll-rail">
        <div
          className="scroll-progress"
          style={{
            height: `${progress}%`,
          }}
        />

        <div
          className={`scroll-rune rune-about ${
            activeSection === "about" ? "active" : ""
          }`}
          onClick={() => scrollToSection("about")}
        >
          <span className="rune-symbol">◇</span>
          <span className="rune-label">About</span>
        </div>

        <div
          className={`scroll-rune rune-projects ${
            activeSection === "projects" ? "active" : ""
          }`}
          onClick={() => scrollToSection("projects")}
        >
          <span className="rune-symbol">◇</span>
          <span className="rune-label">Projects</span>
        </div>

        <div
          className={`scroll-rune rune-contact ${
            activeSection === "contact" ? "active" : ""
          }`}
          onClick={() => scrollToSection("contact")}
        >
          <span className="rune-symbol">◇</span>
          <span className="rune-label">Contact</span>
        </div>

        <span className="scroll-star star-one">✦</span>
        <span className="scroll-star star-two">✧</span>
        <span className="scroll-star star-three">✦</span>
      </div>
    </div>
  );
}

export default Scroll;
