import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { TabbedSection } from "./components/TabbedSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <div className="bg-[#272727] min-h-screen" style={{ scrollBehavior: "smooth" }}>
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
