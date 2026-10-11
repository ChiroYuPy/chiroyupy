import Nav from "./components/Nav.jsx";
import SideDots from "./components/SideDots.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Timeline from "./components/Timeline.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import useSectionScroll from "./useSectionScroll.js";

export default function App() {
  useSectionScroll();
  return (
    <>
      <Nav />
      <SideDots />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Timeline />
        <About />
        <Contact />
      </main>
    </>
  );
}
