import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import "../../styles/globals.css";

import spriteBirrete from "../assets/Sprite-birrete.png";
import spriteHerramientas from "../assets/Sprite-herramientas02.png";
import spriteMedalla from "../assets/Sprite-medalla.png";

import cabezaEdImg from "../assets/cabeza-ed.png";
import cuerpoImg from "../assets/cuerpo-cer.png";
import handLImg from "../assets/handL.png";
import handRImg from "../assets/handR.png";
import piernaLImg from "../assets/piernaL.png";
import piernaRImg from "../assets/piernaR.png";

// ─── Walking character constants ──────────────────────────────────────────────
const TRAVEL_DURATION = 1.8; // seconds to walk into position
const START_X = 440; // px off-screen to the right
const WALK_CYCLE = 0.44; // seconds per full leg cycle (lower = faster steps)

// Character part sizes (px)
const CHAR_W = 220;
const CHAR_H = 180;
const HEAD_W = 198; // bigger head
const HEAD_LEFT = Math.round((CHAR_W - HEAD_W) / 2);
const HEAD_TOP = -58; // more separation from body
const BODY_W = 92;
const BODY_LEFT = Math.round((CHAR_W - BODY_W) / 2);
const BODY_TOP = 118;
const HAND_W = 34;
const HAND_TOP = BODY_TOP + 4;
const HANDL_LEFT = BODY_LEFT - HAND_W - 8; // a bit more gap from body
const HANDR_LEFT = BODY_LEFT + BODY_W + 8;
const LEG_W = 38; // 2px smaller
const LEG_TOP = BODY_TOP + 50; // slight gap from body
const LEGL_LEFT = BODY_LEFT + 0; // legs a bit more spread
const LEGR_LEFT = BODY_LEFT + BODY_W - LEG_W - 0;

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
    <div className="flex flex-col gap-8 ml-4 md:ml-6 pl-14 md:pl-16 border-l-[1.6px] border-[#767676] py-4">
      {education.map((item, i) => (
        <motion.div
          key={item.degree}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="flex flex-col gap-2 relative"
        >
          <div className="absolute -left-[46px] md:-left-[34px] top-[4px] w-3 h-3 rounded-full bg-[#767676]" />
          <p
            style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
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

function ToolCard({ tool, index }: { tool: (typeof tools)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.055, duration: 0.45, ease: "easeOut" }}
      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.09)" }}
      className="flex flex-col gap-3 p-5 rounded-2xl cursor-default"
      style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span style={{ fontSize: "2rem", lineHeight: 1 }}>{tool.icon}</span>
      <p
        style={{
          fontFamily: "'Atkinson Hyperlegible', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          color: "white",
        }}
      >
        {tool.name}
      </p>
      <p
        style={{
          fontFamily: "'Atkinson Hyperlegible', sans-serif",
          fontSize: "0.85rem",
          color: "#909090",
        }}
      >
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

// ─── Certifications ──────────────────────────────────────────────────────────

const certifications = [
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    period: "2023",
    description:
      "Certificación en HTML5 semántico, CSS3, Flexbox, Grid y diseño responsivo. Incluye proyectos prácticos de páginas web.",
    tags: ["HTML5", "CSS3", "Responsive Design"],
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    period: "2023",
    description:
      "Fundamentos de JavaScript: variables, funciones, POO, programación funcional y estructuras de datos.",
    tags: ["JavaScript", "ES6+", "Algoritmos"],
  },
  {
    title: "CSS Challenges",
    issuer: "Frontend Mentor",
    period: "2024",
    description:
      "Desafíos de maquetación y diseño CSS: layouts complejos, animaciones y reproducción fiel de mockups.",
    tags: ["CSS", "Flexbox", "Grid", "Animaciones"],
  },
];

function CertificationsContent() {
  return (
    <div className="flex flex-col gap-8 ml-4 md:ml-6 pl-14 md:pl-16 border-l-[1.6px] border-[#767676] py-4">
      {certifications.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="flex flex-col gap-3 relative"
        >
          <div className="absolute -left-[46px] md:-left-[34px] top-[4px] w-3 h-3 rounded-full bg-[#767676]" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <p
              style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
                color: "white",
              }}
            >
              {item.title}
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
            {item.issuer}
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

// ─── Tab types ────────────────────────────────────────────────────────────────

type TabId = "education" | "tools" | "career";

type Tab = {
  readonly id: TabId;
  readonly label: string;
  readonly imgSrc: string;
  readonly emoji: string;
};

const tabs: Tab[] = [
  { id: "education", label: "Educación", imgSrc: spriteBirrete, emoji: "🎓" },
  {
    id: "tools",
    label: "Herramientas",
    imgSrc: spriteHerramientas,
    emoji: "🔧",
  },
  {
    id: "career",
    label: "Certificaciones",
    imgSrc: spriteMedalla,
    emoji: "🏅",
  },
];

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const showLabel = isActive || hovered;

  useEffect(() => {
    if (!isActive) setHovered(false);
  }, [isActive]);

  return (
    <motion.button
      onMouseEnter={() => {
        if (!isActive) setHovered(true);
      }}
      onMouseLeave={() => {
        if (!isActive) setHovered(false);
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative shrink-0 bg-transparent border-none cursor-pointer pb-3 flex items-center"
      style={{ color: isActive ? "white" : "#909090" }}
    >
      {/* Pixel art icon */}
      <div className="w-10 h-10 md:w-26 md:h-26 flex items-center justify-center shrink-0">
        <img
          src={tab.imgSrc}
          alt={tab.label}
          className="w-full h-full object-contain"
          style={{
            imageRendering: "pixelated",
            filter: isActive ? "brightness(1)" : "brightness(0.55)",
            transition: "filter 0.25s ease",
          }}
        />
      </div>

      {/* Expanding label */}
      <div
        className="overflow-hidden"
        style={{
          maxWidth: showLabel ? "260px" : "0px",
          transition: "max-width 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <motion.span
          animate={{ opacity: showLabel ? 1 : 0, x: showLabel ? 0 : -14 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="whitespace-nowrap pl-3"
          style={{
            fontFamily: "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2vw, 1.35rem)",
            display: "block",
          }}
        >
          {tab.label}
        </motion.span>
      </div>

      {/* Active underline */}
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

// ─── Walking Character (right column) ────────────────────────────────────────

function WalkingCharacter() {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const [started, setStarted] = useState(false);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          setStarted(true);
          // Stop walking slightly before travel ends so legs land naturally
          setTimeout(() => setArrived(true), (TRAVEL_DURATION - 0.15) * 1000);
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const walking = started && !arrived;

  // Walk keyframes — phase offset baked into initial keyframe position
  // LegL starts grounded, LegR starts mid-lift (180° offset)
  const legLAnim = walking ? { y: [0, -13, 0] } : { y: 0 };
  const legRAnim = walking ? { y: [-13, 0, -13] } : { y: 0 };
  // Hands: HandR synced with LegL, HandL synced with LegR (diagonal natural walk)
  const handLAnim = walking ? { y: [-7, 0, -7] } : { y: 0 };
  const handRAnim = walking ? { y: [0, -7, 0] } : { y: 0 };

  const walkTrans = {
    duration: WALK_CYCLE,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };
  const stopTrans = { duration: 0.18 };

  return (
    <div
      ref={ref}
      // overflow:hidden clips character as it enters from right edge
      className="hidden lg:flex items-center justify-center shrink-0 overflow-hidden"
      style={{ width: 270, minHeight: 420 }}
    >
      <motion.div
        initial={{ x: START_X }}
        animate={{ x: started ? 0 : START_X }}
        transition={{ duration: TRAVEL_DURATION, ease: [0.15, 0, 0.55, 1] }}
        style={{ position: "relative", width: CHAR_W, height: CHAR_H }}
      >
        {/* ── LEG LEFT ── */}
        <motion.img
          src={piernaLImg}
          alt=""
          animate={legLAnim}
          transition={walking ? walkTrans : stopTrans}
          style={{
            position: "absolute",
            width: LEG_W,
            left: LEGL_LEFT,
            top: LEG_TOP,
            imageRendering: "pixelated",
          }}
        />

        {/* ── LEG RIGHT ── */}
        <motion.img
          src={piernaRImg}
          alt=""
          animate={legRAnim}
          transition={walking ? walkTrans : stopTrans}
          style={{
            position: "absolute",
            width: LEG_W,
            left: LEGR_LEFT,
            top: LEG_TOP,
            imageRendering: "pixelated",
          }}
        />
        {/* ── BODY (rendered first = behind head) ── */}
        <img
          src={cuerpoImg}
          alt=""
          style={{
            position: "absolute",
            width: BODY_W,
            left: BODY_LEFT,
            top: BODY_TOP,
            imageRendering: "pixelated",
          }}
        />

        {/* ── HEAD (rendered after body = on top) ── */}
        <img
          src={cabezaEdImg}
          alt=""
          style={{
            position: "absolute",
            width: HEAD_W,
            left: HEAD_LEFT,
            top: HEAD_TOP,
            imageRendering: "pixelated",
          }}
        />

        {/* ── HAND LEFT ── */}
        <motion.img
          src={handLImg}
          alt=""
          animate={handLAnim}
          transition={walking ? walkTrans : stopTrans}
          style={{
            position: "absolute",
            width: HAND_W,
            left: HANDL_LEFT,
            top: HAND_TOP,
            imageRendering: "pixelated",
          }}
        />

        {/* ── HAND RIGHT ── */}
        <motion.img
          src={handRImg}
          alt=""
          animate={handRAnim}
          transition={walking ? walkTrans : stopTrans}
          style={{
            position: "absolute",
            width: HAND_W,
            left: HANDR_LEFT,
            top: HAND_TOP,
            imageRendering: "pixelated",
          }}
        />
      </motion.div>
    </div>
  );
}

// function WaveCharacter() {
//   return (
//     <motion.img
//       src={cabezaEdImg}
//       alt=""
//       animate={headAnimState}
//       transition={}
//     />
//   );
// }

// ─── TabbedSection ────────────────────────────────────────────────────────────

export function TabbedSection() {
  const [active, setActive] = useState<TabId>("education");
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="education" ref={ref} className="px-4 py-6 relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex gap-5 items-stretch">
          {/* ── Main card — altura fija para que el personaje no se mueva ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 bg-black rounded-[42px] p-8 md:p-12 flex flex-col gap-10 min-w-0"
            style={{ height: 500 }}
          >
            {/* Tab bar */}
            <div className="flex flex-col gap-1 shrink-0">
              <div
                className="flex justify-around gap-4 md:gap-8 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
              >
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={active === tab.id}
                    onClick={() => setActive(tab.id)}
                  />
                ))}
              </div>
              <div className="h-[2px] bg-white/15 w-full" />
            </div>

            {/* Tab content — ocupa el espacio restante del card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex-1 overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {active === "education" && <EducationContent />}
                {active === "tools" && <ToolsContent />}
                {active === "career" && <CertificationsContent />}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Walking character ── */}
          <WalkingCharacter />
        </div>
      </div>
    </section>
  );
}
