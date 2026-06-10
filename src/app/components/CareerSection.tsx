import { useRef } from "react";
import { motion, useInView } from "motion/react";

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

export function CareerSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="career" ref={ref} className="px-4 py-6">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-black rounded-[42px] p-8 md:p-12 flex flex-col gap-10"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.3rem, 3vw, 2rem)",
                color: "#909090",
              }}
            >
              Carrera
            </p>
            <div className="h-px bg-white/15 w-full" />
          </div>

          {/* Experience items */}
          <div className="flex flex-col gap-8 pl-4 md:pl-8 border-l-2 border-[#767676]">
            {experience.map((item, i) => (
              <motion.div
                key={item.role + item.company}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
                className="flex flex-col gap-3 relative"
              >
                <div className="absolute -left-[21px] md:-left-[29px] top-1 w-3 h-3 rounded-full bg-[#767676]" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p
                    style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                      color: "white",
                    }}
                  >
                    {item.role}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      fontSize: "0.9rem",
                      color: "#767676",
                    }}
                  >
                    {item.period}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontSize: "1rem",
                    color: "#b0b0b0",
                  }}
                >
                  {item.company}
                </p>
                <p
                  style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontSize: "0.95rem",
                    color: "#909090",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-white/10 text-[#b0b0b0]"
                      style={{
                        fontFamily: "'Atkinson Hyperlegible', sans-serif",
                        fontSize: "0.8rem",
                        backgroundColor: "rgba(255,255,255,0.04)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
