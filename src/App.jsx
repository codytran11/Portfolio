import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import BackgroundEffect from "./components/BackgroundEffect";
import Scroll from "./components/Scroll";

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
