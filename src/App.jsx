import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import BackgroundEffect from "./components/BackgroundEffect";
import Scroll from "./components/Scroll";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <BackgroundEffect />
      <Scroll />
      <Navbar />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
