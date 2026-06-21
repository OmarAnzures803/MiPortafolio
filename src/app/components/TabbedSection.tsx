import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import '../../styles/globals.css';

import educationIcon from '../assets/Sprite-birrete.png';
import toolsIcon from '../assets/Sprite-herramientas02.png';
import careerIcon from '../assets/Sprite-medalla.png';

// ─── Education ───────────────────────────────────────────────────────────────

const education = [
  {
    degree: "Ingeniería en Desarrollo y Gestión de Software",
    school: "Universidad Tecnológica de Puebla",
    period: "2024 – 2026 (en proceso de titulación)",
  },
  {
    degree: "Técnico Superior Universitario en Tecnologías de la Información",
    school: "Universidad Tecnológica de Puebla",
    period: "2022 – 2024",
  },
];

function EducationContent() {
  return (
    <div className="flex flex-col gap-8 pl-10 md:pl-14 border-l-[1.6px] border-[#767676] py-4">
      {education.map((item, i) => (
        <motion.div
          key={item.degree}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="flex flex-col gap-2 relative"
        >
          <div className="absolute -left-[41px] md:-left-[53px] top-[4px] w-3 h-3 rounded-full bg-[#767676]" />
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)", color: "white" }}>
            {item.degree}
          </p>
          <div>
            <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem", color: "#b0b0b0" }}>{item.school}</p>
            <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.9rem", color: "#767676" }}>{item.period}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tools ───────────────────────────────────────────────────────────────────

const tools = [
  { name: "React", category: "Frontend", icon: "⚛️" },
  { name: "TypeScript", category: "Lenguaje", icon: "🟦" },
  { name: "Tailwind CSS", category: "Estilos", icon: "🎨" },
  { name: "Node.js", category: "Backend", icon: "🟢" },
  { name: "Python", category: "Lenguaje", icon: "🐍" },
  { name: "Git", category: "Control", icon: "🔀" },
  { name: "Figma", category: "Diseño", icon: "🖼️" },
  { name: "PostgreSQL", category: "Base de datos", icon: "🐘" },
  { name: "Docker", category: "DevOps", icon: "🐳" },
  { name: "Next.js", category: "Framework", icon: "▲" },
  { name: "Express", category: "Backend", icon: "🚀" },
  { name: "Vite", category: "Build", icon: "⚡" },
];

function ToolCard({ tool, index }: { tool: typeof tools[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.055, duration: 0.45, ease: "easeOut" }}
      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.09)" }}
      className="flex flex-col gap-3 p-5 rounded-2xl cursor-default transition-colors duration-200"
      style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <span style={{ fontSize: "2rem", lineHeight: 1 }}>{tool.icon}</span>
      <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "1rem", color: "white" }}>
        {tool.name}
      </p>
      <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.85rem", color: "#909090" }}>
        {tool.category}
      </p>
    </motion.div>
  );
}

function ToolsContent() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {tools.map((tool, i) => (
        <ToolCard key={tool.name} tool={tool} index={i} />
      ))}
    </div>
  );
}

// ─── Career ──────────────────────────────────────────────────────────────────

const experience = [
  {
    role: "Desarrollador Frontend",
    company: "Empresa / Proyecto",
    period: "2024 – Presente",
    description: "Desarrollo de interfaces de usuario con React y TypeScript. Diseño e implementación de componentes reutilizables con Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    role: "Desarrollador de Software",
    company: "Proyecto Universitario",
    period: "2023 – 2024",
    description: "Desarrollo de aplicaciones web full-stack para proyectos académicos. Implementación de APIs REST y bases de datos relacionales.",
    tags: ["Node.js", "SQL", "JavaScript"],
  },
];

function CareerContent() {
  return (
    <div className="flex flex-col gap-8 pl-10 md:pl-14 border-l-[1.6px] border-[#767676] py-4">
      {experience.map((item, i) => (
        <motion.div
          key={item.role}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="flex flex-col gap-3 relative"
        >
          <div className="absolute -left-[41px] md:-left-[53px] top-[4px] w-3 h-3 rounded-full bg-[#767676]" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)", color: "white" }}>
              {item.role}
            </p>
            <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.9rem", color: "#767676" }}>{item.period}</p>
          </div>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem", color: "#b0b0b0" }}>{item.company}</p>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.95rem", color: "#909090", lineHeight: 1.6 }}>
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full"
                style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif",
                  fontSize: "0.8rem",
                  color: "#b0b0b0",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Definir el tipo de los tabs ─────────────────────────────────────────────

type Tab = {
  readonly id: "education" | "tools" | "career";
  readonly label: string;
  readonly icon: string;
};

const tabs: Tab[] = [
  { id: "education", label: "Antecedentes Educativos", icon: educationIcon },
  { id: "tools", label: "Herramientas", icon: toolsIcon },
  { id: "career", label: "Carrera", icon: careerIcon },
];

type TabId = typeof tabs[number]["id"];

// ─── Tab Button Component ─────────────────────────────────────────────────────

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
  icon: string;
}

function TabButton({ tab, isActive, onClick, icon }: TabButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isActive) {
      setShowLabel(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isActive) {
      setShowLabel(false);
    }
  };

  // Si está activo, siempre muestra la etiqueta
  const shouldShowLabel = isActive || showLabel;

  return (
    <motion.button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative shrink-0 bg-transparent border-none cursor-pointer transition-colors duration-200 flex items-center gap-3"
      style={{
        fontFamily: "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(1rem, 2vw, 1.4rem)",
        color: isActive ? "white" : "#909090",
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Contenedor del icono con el texto que se despliega */}
      <div className="relative flex items-center">
        {/* Icono PNG */}
        <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
          <img 
            src={icon} 
            alt={tab.label}
            className="w-full h-full object-contain"
            style={{
              filter: isActive ? 'brightness(1)' : 'brightness(0.6)',
              transition: 'filter 0.3s ease'
            }}
          />
        </div>

        {/* Contenedor del texto con desbordamiento oculto */}
        <div className="overflow-hidden" style={{ maxWidth: shouldShowLabel ? '300px' : '0px' }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: shouldShowLabel ? 1 : 0,
              x: shouldShowLabel ? 0 : -20
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut"
            }}
            className="whitespace-nowrap"
            style={{
              fontFamily: "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              color: isActive ? "white" : "#909090",
            }}
          >
            {tab.label}
          </motion.span>
        </div>
      </div>

      {/* Indicador de tab activo */}
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
    </motion.button>
  );
}

// ─── Tabbed Container ─────────────────────────────────────────────────────────

export function TabbedSection() {
  const [active, setActive] = useState<TabId>("education");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" ref={ref} className="px-4 py-6">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-black rounded-[42px] p-8 md:p-12 flex flex-col gap-10"
        >
          {/* Tab bar - ahora los tabs están en una fila horizontal */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-6 md:gap-11 overflow-x-auto pb-1 scrollbar-none">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={active === tab.id}
                  onClick={() => setActive(tab.id)}
                  icon={tab.icon}
                />
              ))}
            </div>
            <div className="h-[2px] bg-white/15 w-full" />
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {active === "education" && <EducationContent />}
              {active === "tools" && <ToolsContent />}
              {active === "career" && <CareerContent />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}