import "./Contact.css";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-content">
        <p className="contact-label">Let's talk</p>

        <a className="contact-email" href="mailto:codytran76@gmail.com">
          codytran76@gmail.com ↗
        </a>

        <div className="contact-links">
          <a
            href="https://linkedin.com/in/cody-a-tran"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://github.com/codytran11"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
