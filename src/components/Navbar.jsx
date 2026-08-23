import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="nav-logo">Cody Tran</h2>

      <div className="nav-links">
        <a href="#about">About</a>

        <a href="/Cody_Tran_Resume.pdf" target="_blank" rel="noreferrer">
          Resume
        </a>

        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
