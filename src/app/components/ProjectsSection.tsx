import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Portfolio Personal",
    description: "Mi portafolio construido con React 18, Tailwind CSS v4 y Motion para animaciones fluidas. Diseño en Figma, implementado en código.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    github: "#",
    demo: "#",
    gradient: "from-[#1a1a1a] to-[#0d0d0d]",
  },
  {
    title: "Proyecto 2",
    description: "Descripción del proyecto. Qué problema resuelve, qué tecnologías usaste y cuál fue tu contribución principal.",
    tags: ["Node.js", "SQL", "REST API"],
    github: "#",
    demo: "#",
    gradient: "from-[#1a1a1a] to-[#0d0d0d]",
  },
  {
    title: "Proyecto 3",
    description: "Descripción del proyecto. Qué problema resuelve, qué tecnologías usaste y cuál fue tu contribución principal.",
    tags: ["Python", "JavaScript", "MongoDB"],
    github: "#",
    demo: "#",
    gradient: "from-[#1a1a1a] to-[#0d0d0d]",
  },
  {
    title: "Proyecto 4",
    description: "Descripción del proyecto. Qué problema resuelve, qué tecnologías usaste y cuál fue tu contribución principal.",
    tags: ["React", "Figma", "CSS"],
    github: "#",
    demo: null,
    gradient: "from-[#1a1a1a] to-[#0d0d0d]",
  },
];

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bg-gradient-to-br ${project.gradient} border border-white/8 rounded-[28px] p-6 md:p-8 flex flex-col gap-5 group cursor-default`}
    >
      <div className="flex items-start justify-between gap-4">
        <p
          style={{
            fontFamily: "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            color: "white",
          }}
        >
          {project.title}
        </p>
        <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-white hover:text-white/70 transition-colors">
              <Github size={20} />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-white hover:text-white/70 transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <p
        style={{
          fontFamily: "'Atkinson Hyperlegible', sans-serif",
          fontSize: "0.95rem",
          color: "#909090",
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
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
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="px-4 py-6">
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
              Mis Proyectos
            </p>
            <div className="h-px bg-white/15 w-full" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
