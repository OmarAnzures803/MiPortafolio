import { useRef } from "react";
import { motion, useInView } from "motion/react";

const toolGroups = [
  {
    category: "Frontend",
    tools: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    tools: ["Node.js", "Python", "REST APIs", "SQL"],
  },
  {
    category: "Herramientas",
    tools: ["Git", "GitHub", "Figma", "VS Code", "Vite"],
  },
  {
    category: "Bases de datos",
    tools: ["MySQL", "PostgreSQL", "MongoDB"],
  },
];

function ToolBadge({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.12)" }}
      className="px-4 py-2 rounded-full border border-white/15 text-white cursor-default transition-colors duration-200"
      style={{
        fontFamily: "'Atkinson Hyperlegible', sans-serif",
        fontSize: "0.9rem",
        backgroundColor: "rgba(255,255,255,0.05)",
      }}
    >
      {name}
    </motion.span>
  );
}

export function ToolsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tools" ref={ref} className="px-4 py-6">
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
              Herramientas
            </p>
            <div className="h-px bg-white/15 w-full" />
          </div>

          {/* Groups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {toolGroups.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: gi * 0.1 + 0.2, duration: 0.5 }}
                className="flex flex-col gap-3"
              >
                <p
                  style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#909090",
                  }}
                >
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool, ti) => (
                    <ToolBadge key={tool} name={tool} index={gi * 6 + ti} />
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
