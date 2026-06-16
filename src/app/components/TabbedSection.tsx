import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import '../../styles/globals.css';

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

// ─── Tabbed Container ─────────────────────────────────────────────────────────

const tabs = [
  { id: "education", label: "Antecedentes Educativos" },
  { id: "tools", label: "Herramientas" },
  { id: "career", label: "Carrera" },
] as const;

type TabId = typeof tabs[number]["id"];

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
          {/* Tab bar */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-6 md:gap-11 overflow-x-auto pb-1 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className="relative shrink-0 bg-transparent border-none cursor-pointer pb-3 transition-colors duration-200"
                  style={{
                    fontFamily: "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 2vw, 1.4rem)",
                    color: active === tab.id ? "white" : "#909090",
                  }}
                >
                  {tab.label}
                  {active === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
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
