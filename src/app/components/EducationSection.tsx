import { useRef } from "react";
import { motion, useInView } from "motion/react";

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

export function EducationSection() {
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
              Antecedentes Educativos
            </p>
            <div className="h-px bg-white/15 w-full" />
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-8 pl-4 md:pl-8 border-l-2 border-[#767676]">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
                className="flex flex-col gap-2 relative"
              >
                <div className="absolute -left-[21px] md:-left-[29px] top-1 w-3 h-3 rounded-full bg-[#767676]" />
                <p
                  style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                    color: "white",
                  }}
                >
                  {item.degree}
                </p>
                <div>
                  <p
                    style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      fontSize: "1rem",
                      color: "#b0b0b0",
                    }}
                  >
                    {item.school}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
