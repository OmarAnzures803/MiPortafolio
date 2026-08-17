import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink, Github, Figma } from "lucide-react";
import bttiCap1 from "../../imports/previews/btti-cap-1.png";
import bttiCap2 from "../../imports/previews/btti-cap-2.png";
import bttiCap3 from "../../imports/previews/btti-cap-3.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type Project = {
  title: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null; // live site URL → shows "Previsualizar" button
  figma: string | null; // Figma design URL → shows Figma icon
  gradient: string;
  previewStyle: "desktop" | "mobile";
  previewImages: [string | null, string | null, string | null];
  preview: {
    bg: string;
    accent: string;
  };
};

// ─── Projects data ────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    title: "Agua Anzures",
    role: "Desarrollador Full Stack · Desktop y Mobile",
    period: "Abril 2025 – Mayo 2025",
    description:
      "Sistema de gestión operativa para clientes, viajes y ventas. Incluye aplicación de escritorio, API REST y app móvil para administración de clientes, viajes, contactos y reportes. Desplegado en servidor Ubuntu con soporte de entorno productivo.",
    tags: ["WPF", ".NET MAUI", "ASP.NET Core", "EF Core", "PostgreSQL", "MVVM"],
    github: "https://github.com/OmarAnzures803/AguaAnzures.git",
    demo: null,
    figma: null,
    gradient: "from-[#1a1a1a] to-[#0d0d0d]",
    previewStyle: "mobile",
    previewImages: [null, null, null],
    preview: {
      bg: "linear-gradient(135deg,#0a1f3c 0%,#1a3a5c 100%)",
      accent: "#4a9eff",
    },
  },
  {
    title: "Sistema Bolsa de Trabajo TI",
    role: "Desarrollador Frontend · Integración y Despliegue",
    period: "Enero 2026 – Abril 2026",
    description:
      "Integré egresados-ui con AppEgresados, unificando la interfaz con la plataforma principal. Implementé pantallas y flujos de navegación para distintos roles. Desplegué en servidor Ubuntu vía SSH, validando rutas, vistas y carga dinámica de componentes.",
    tags: ["React", "Frontend", "SSH", "Ubuntu", "Despliegue"],
    github: "https://github.com/Cacaguadios/AppEgresados.git",
    demo: "https://ti.utpuebla.edu.mx/bttiutp/login",
    figma:
      "https://www.figma.com/design/elGvYKOePuR6YO58Q7qYsB/AppEgresados?m=auto&t=5ht3w0ppeltNbl5b-6",
    gradient: "from-[#1a1a1a] to-[#0d0d0d]",
    previewStyle: "desktop",
    previewImages: [bttiCap1, bttiCap2, bttiCap3],
    preview: {
      bg: "linear-gradient(135deg,#0a2e1a 0%,#1a4a2c 100%)",
      accent: "#4cde80",
    },
  },
  {
    title: "SkillSwap",
    role: "Frontend Developer · App Móvil (Play Store)",
    period: "Agosto 2025 – Septiembre 2025",
    description:
      "Aplicación móvil para el intercambio de habilidades, publicada en Play Store. Desarrollé componentes y pantallas en React Native con diseño modular en Figma, mejorando consistencia visual y reduciendo tiempos de iteración.",
    tags: ["React Native", "Figma", "Play Store", "Mobile"],
    github: "https://github.com/CrafterJe/Frontend-SkillSwap.git",
    demo: null,
    figma: null,
    gradient: "from-[#1a1a1a] to-[#0d0d0d]",
    previewStyle: "mobile",
    previewImages: [null, null, null],
    preview: {
      bg: "linear-gradient(135deg,#1a0a3c 0%,#2d1a5c 100%)",
      accent: "#a78bfa",
    },
  },
  {
    title: "Portfolio Personal",
    role: "Diseño y Desarrollo",
    period: "2025",
    description:
      "Portafolio construido con React 18, Tailwind CSS v4 y Motion para animaciones fluidas. Incluye personaje pixel art animado, animación de letras SVG al scroll y diseño responsivo desde Figma.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Motion", "Figma"],
    github: "#",
    demo: null,
    figma: null,
    gradient: "from-[#1a1a1a] to-[#0d0d0d]",
    previewStyle: "desktop",
    previewImages: [null, null, null],
    preview: {
      bg: "linear-gradient(135deg,#2a1800 0%,#3d2600 100%)",
      accent: "#f59e0b",
    },
  },
];

// ─── Screenshot fan constants ─────────────────────────────────────────────────
// 0 = back card (flies furthest), 1 = mid, 2 = front (stays lowest on hover)

const IDLE_Y = [-10, -6, -3]; // px above card top while at rest
const IDLE_X = [0, 0, 0]; // all stacked at center on idle
const IDLE_ROT = [0, -2, 2]; // deg: back=0°, mid=-2°, front=2°
const IDLE_SCALE = [0.93, 0.96, 1.0];

const HOVER_Y = [-180, -132, -68]; // rises: back flies furthest
const HOVER_X = [4, -42, 40]; // back→right, mid→left, front→center
const HOVER_ROT = [0, -5, 4];
const HOVER_SCALE = [0.96, 0.98, 1.01];

// ─── Preview components (replace inner content with <img> when ready) ────────

type PreviewProps = {
  project: Project;
  shade: number;
  imageSrc?: string | null;
};
const brightness = (shade: number) => `brightness(${0.72 + shade * 0.14})`;

function DesktopPreview({ project, shade, imageSrc }: PreviewProps) {
  if (imageSrc) {
    return (
      <div
        className="w-full rounded-xl overflow-hidden shadow-2xl"
        style={{
          height: 192,
          border: "1px solid rgba(255,255,255,0.1)",
          filter: brightness(shade),
          background: "#0d0d0d",
        }}
      >
        <img
          src={imageSrc}
          alt={`Preview de ${project.title}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl overflow-hidden shadow-2xl"
      style={{
        height: 132,
        background: project.preview.bg,
        border: "1px solid rgba(255,255,255,0.1)",
        filter: brightness(shade),
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 px-3"
        style={{ height: 24, background: "rgba(0,0,0,0.38)" }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ff5f57",
          }}
        />
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ffbd2e",
          }}
        />
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#28ca41",
          }}
        />
        <div
          style={{
            flex: 1,
            height: 11,
            borderRadius: 3,
            background: "rgba(255,255,255,0.1)",
            marginLeft: 6,
          }}
        />
      </div>
      {/* Mock UI */}
      <div className="px-3 py-2 flex flex-col gap-1.5">
        <div
          style={{
            height: 8,
            width: "46%",
            borderRadius: 3,
            background: project.preview.accent,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            height: 5,
            width: "74%",
            borderRadius: 3,
            background: "rgba(255,255,255,0.17)",
          }}
        />
        <div
          style={{
            height: 5,
            width: "58%",
            borderRadius: 3,
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div className="flex gap-2" style={{ marginTop: 3 }}>
          <div
            style={{
              flex: 2,
              height: 26,
              borderRadius: 5,
              background: "rgba(255,255,255,0.07)",
            }}
          />
          <div
            style={{
              flex: 1,
              height: 26,
              borderRadius: 5,
              background: "rgba(255,255,255,0.04)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MobilePreview({ project, shade, imageSrc }: PreviewProps) {
  if (imageSrc) {
    return (
      <div className="flex justify-center items-end" style={{ height: 155 }}>
        <div
          style={{
            width: 172,
            height: 158,
            borderRadius: 18,
            border: "1.5px solid rgba(255,255,255,0.14)",
            overflow: "hidden",
            filter: brightness(shade),
            boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
            background: "#0d0d0d",
          }}
        >
          <img
            src={imageSrc}
            alt={`Preview de ${project.title}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    // Outer wrapper keeps the same bounding-box height as desktop so the fan
    // constants stay unchanged. Phone is centered inside it.
    <div className="flex justify-center items-end" style={{ height: 155 }}>
      <div
        style={{
          width: 172,
          height: 158,
          borderRadius: 18,
          background: project.preview.bg,
          border: "1.5px solid rgba(255,255,255,0.14)",
          overflow: "hidden",
          filter: brightness(shade),
          boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-2"
          style={{ height: 22, background: "rgba(0,0,0,0.45)" }}
        >
          <div
            style={{
              width: 18,
              height: 4,
              borderRadius: 3,
              background: "rgba(255,255,255,0.25)",
            }}
          />
          {/* Notch */}
          <div
            style={{
              width: 16,
              height: 5,
              borderRadius: 10,
              background: "rgba(0,0,0,0.7)",
            }}
          />
          <div
            style={{
              width: 10,
              height: 4,
              borderRadius: 3,
              background: "rgba(255,255,255,0.2)",
            }}
          />
        </div>
        {/* App content */}
        <div className="flex flex-col gap-1.5 px-2 py-2">
          <div
            style={{
              height: 7,
              width: "55%",
              borderRadius: 3,
              background: project.preview.accent,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              height: 4,
              width: "85%",
              borderRadius: 3,
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <div
            style={{
              height: 28,
              width: "100%",
              borderRadius: 6,
              background: "rgba(255,255,255,0.07)",
              marginTop: 2,
            }}
          />
          <div
            style={{
              height: 20,
              width: "100%",
              borderRadius: 5,
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              height: 20,
              width: "100%",
              borderRadius: 5,
              background: "rgba(255,255,255,0.04)",
            }}
          />
          {/* Bottom nav bar */}
          <div
            className="flex justify-around items-center"
            style={{
              height: 18,
              borderRadius: 6,
              background: "rgba(0,0,0,0.35)",
              marginTop: 2,
              padding: "0 4px",
            }}
          >
            {[
              project.preview.accent,
              "rgba(255,255,255,0.25)",
              "rgba(255,255,255,0.25)",
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenshotPreview({ project, shade }: PreviewProps) {
  const imageSrc = project.previewImages[shade] ?? null;

  return project.previewStyle === "mobile" ? (
    <MobilePreview project={project} shade={shade} imageSrc={imageSrc} />
  ) : (
    <DesktopPreview project={project} shade={shade} imageSrc={imageSrc} />
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    // Single animated wrapper — screenshots and card content share this opacity,
    // so they appear together on page load with no race condition.
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1 + 0.2,
        duration: 0.6,
        ease: "easeOut",
      }}
      style={{ position: "relative", zIndex: hovered ? 20 : 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Screenshot stack (behind card, peeks above top edge) ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{
            y: IDLE_Y[i],
            x: IDLE_X[i],
            rotate: IDLE_ROT[i],
            scale: IDLE_SCALE[i],
          }}
          animate={
            hovered
              ? {
                  y: HOVER_Y[i],
                  x: HOVER_X[i],
                  rotate: HOVER_ROT[i],
                  scale: HOVER_SCALE[i],
                }
              : {
                  y: IDLE_Y[i],
                  x: IDLE_X[i],
                  rotate: IDLE_ROT[i],
                  scale: IDLE_SCALE[i],
                }
          }
          transition={{
            type: "spring",
            stiffness: hovered ? 260 : 320,
            damping: hovered ? 22 : 28,
            delay: hovered ? (2 - i) * 0.055 : i * 0.04,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 60,
            right: 60,
            transformOrigin: "bottom center",
            zIndex: i + 1,
          }}
        >
          <ScreenshotPreview project={project} shade={i} />
        </motion.div>
      ))}

      {/* ── Card content (sits on top of screenshot stack) ── */}
      <div
        className={`bg-gradient-to-br ${project.gradient} border border-white/8 rounded-[28px] p-6 md:p-8 flex flex-col gap-5`}
        style={{
          position: "relative",
          zIndex: 10,
          cursor: "default",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p
              style={{
                fontFamily:
                  "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "white",
              }}
            >
              {project.title}
            </p>
            <p
              style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontSize: "0.82rem",
                color: "#767676",
              }}
            >
              {project.role}
            </p>
            <p
              style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontSize: "0.8rem",
                color: "#555",
              }}
            >
              {project.period}
            </p>
          </div>

          {/* Top-right icons: GitHub + ExternalLink + Figma */}
          <div
            className="flex items-center gap-3 shrink-0"
            style={{
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.2s",
            }}
          >
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/60 transition-colors"
              >
                <Github size={20} />
              </a>
            )}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/60 transition-colors"
              >
                <ExternalLink size={19} />
              </a>
            ) : (
              <span
                className="text-white transition-colors"
                style={{ opacity: 0.3, cursor: "default" }}
              >
                <ExternalLink size={19} />
              </span>
            )}
            {project.figma ? (
              <a
                href={project.figma}
                target="_blank"
                rel="noreferrer"
                className="text-white transition-colors hover:text-[#F24E1E]"
              >
                <Figma size={19} />
              </a>
            ) : (
              <span
                className="text-white transition-colors"
                style={{ opacity: 0.3, cursor: "default" }}
              >
                <Figma size={19} />
              </span>
            )}
          </div>
        </div>

        {/* Description */}
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

        {/* Tags */}
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

        {/* Previsualizar button — only when demo URL exists */}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl transition-all duration-200"
            style={{
              padding: "10px 0",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              fontSize: "0.88rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.11)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.1)";
            }}
          >
            <ExternalLink size={15} />
            Previsualizar
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section id="projects" ref={ref} className="px-4 py-6 relative">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-black rounded-[42px] p-8 md:p-12 flex flex-col gap-10"
          style={{ overflow: "visible" }}
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily:
                  "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.3rem, 3vw, 2rem)",
                color: "#909090",
              }}
            >
              Mis Proyectos
            </p>
            <div className="h-px bg-white/15 w-full" />
          </div>

          {/* Grid — overflow visible so screenshots fan above cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            style={{ overflow: "visible", paddingTop: 16 }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
