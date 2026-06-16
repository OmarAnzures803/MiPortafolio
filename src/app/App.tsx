import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { TabbedSection } from "./components/TabbedSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  useEffect(() => {
    // El navegador guarda y restaura la posición de scroll entre recargas ("auto").
    // Esto hace que cada recarga empiece unos píxeles más abajo que la anterior.
    // "manual" desactiva esa restauración automática.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#161616] min-h-screen" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <TabbedSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
