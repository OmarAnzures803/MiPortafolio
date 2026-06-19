import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import svgPaths from "../../imports/svg-mf95v2uqri";
import imgPhoto  from "../../imports/Yo.png";

// ─── PARÁMETROS DE ANIMACIÓN ─────────────────────────────────────────────────

const PIVOT_X           = 485;    // centro X del pivote en el viewBox (entre A y n)
const MAX_DIST          = 460;    // distancia máx desde el pivote (svg units)
const MAX_STAGGER       = 0.28;   // retraso máx de letras del extremo (scroll progress)
const TRAVEL_DURATION   = 0.42;   // duración del viaje en scroll progress
const TRAVEL_PX         = -500;   // distancia de subida en CSS px
const ENTRY_BASE_DELAY  = 0.45;   // delay de la primera letra al cargar (seg)
const ENTRY_MAX_STAGGER = 0.25;   // stagger adicional para letras del extremo (seg)
const ENTRY_FROM_Y      = -280;   // desde dónde caen las letras al cargar (CSS px)

// ─── PARÁMETROS DEL SCROLL "CONÓCEME" ───────────────────────────────────────

/**
 * Duración total del scroll animado al pulsar "Conóceme" (milisegundos).
 * Súbelo para dar más tiempo a la animación del personaje pixel art.
 * Bájalo si prefieres que llegue más rápido.
 *   Sugeridos: 1200 (rápido) · 1600 (fluido) · 2200 (cinematográfico)
 */
const SCROLL_DURATION = 2400;

/**
 * Función de easing del scroll. Recibe t ∈ [0, 1] y devuelve el progreso
 * suavizado. Cambia la función para diferentes sensaciones:
 *
 *   easeInOutCubic  → arranca y frena suave, mitad rápida   (actual)
 *   easeInOutQuart  → más dramático, arranque más lento
 *   easeOutExpo     → arranca rápido y frena muy suave al final
 *
 * Para cambiar: reemplaza el cuerpo de la función.
 */
function easeScroll(t: number): number {
  // easeInOutCubic: t<0.5 → aceleración cúbica, t≥0.5 → deceleración cúbica
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── PARÁMETROS RESPONSIVOS ──────────────────────────────────────────────────

/**
 * Ancho de referencia del card a escala 1× (px).
 * Container1 empieza en left:52 y mide 952px → borde derecho a 1004px.
 * Con la foto en 575+363=938 + algo de margen ≈ 1060px es el ancho "ideal".
 */
const BASE_WIDTH   = 1060;
/**
 * Ancho del card (border-box) por debajo del cual se activa el layout mobile.
 * A viewport 1024px el card mide ~992px (1024 - 32px de px-4 en la sección).
 */
const MOBILE_BREAK = 768;
/** Escala mínima permitida en modo desktop antes de cambiar a mobile. */
const MIN_SCALE    = 0.4;

// ─── LETRAS ──────────────────────────────────────────────────────────────────

const LETTER_DATA = [
  { key: "p15221c80", xCenter: 47.5  }, // O
  { key: "p2008fa80", xCenter: 161   }, // m
  { key: "p2bf29000", xCenter: 260   }, // a
  { key: "p10407d00", xCenter: 315.5 }, // r
  { key: "p29fe8900", xCenter: 442   }, // A ← pivote izq
  { key: "p1cbfd700", xCenter: 528.5 }, // n ← pivote der
  { key: "p1a9f4b80", xCenter: 605   }, // z
  { key: "p2f09d6c0", xCenter: 678.5 }, // u
  { key: "p3bd1c100", xCenter: 746   }, // r
  { key: "p30085a80", xCenter: 809   }, // e
  { key: "p18b56980", xCenter: 884.5 }, // s
  { key: "p306ce000", xCenter: 42.5  }, // C
  { key: "p39de7870", xCenter: 125   }, // a
  { key: "p28aebf00", xCenter: 225   }, // m
  { key: "p3000fd00", xCenter: 329   }, // p
  { key: "p11fd7e80", xCenter: 408   }, // o
  { key: "p3322380",  xCenter: 484.5 }, // s
] as const;

type LetterDatum = typeof LETTER_DATA[number];

/** Un componente por letra para que cada useTransform sea hook-válido. */
function AnimatedLetter({
  datum,
  scrollYProgress,
}: {
  datum: LetterDatum;
  scrollYProgress: MotionValue<number>;
}) {
  const nd = Math.abs(datum.xCenter - PIVOT_X) / MAX_DIST;

  const scrollStart = nd * MAX_STAGGER;
  const scrollEnd   = Math.min(scrollStart + TRAVEL_DURATION, 1);
  const scrollY     = useTransform(scrollYProgress, [scrollStart, scrollEnd], [0, TRAVEL_PX]);

  const entryDelay = ENTRY_BASE_DELAY + nd * ENTRY_MAX_STAGGER;

  return (
    <motion.g
      initial={{ y: ENTRY_FROM_Y, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: entryDelay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.g style={{ y: scrollY }}>
        <path d={svgPaths[datum.key as keyof typeof svgPaths]} fill="white" />
      </motion.g>
    </motion.g>
  );
}

// ─── SVG gradiente de la foto (idéntico al Figma export) ─────────────────────
const PHOTO_GRADIENT = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 363 357' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(1.1114e-15 17.85 -18.15 1.093e-15 181.5 178.5)'><stop stop-color='rgba(65,65,65,1)' offset='0'/><stop stop-color='rgba(49,49,49,1)' offset='0.25'/><stop stop-color='rgba(32,32,32,1)' offset='0.5'/><stop stop-color='rgba(16,16,16,1)' offset='0.75'/><stop stop-color='rgba(8,8,8,1)' offset='0.875'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>")`;

/** Bloque foto reutilizable (foto + gradiente). */
function PhotoBlock({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }} aria-hidden>
      {/* gradiente primero (DOM) → detrás de la foto */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: PHOTO_GRADIENT }} />
      {/* foto después (DOM) → encima del gradiente */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}>
        <img
          alt="Omar Anzures Campos"
          src={imgPhoto}
          style={{ position: "absolute", left: 0, width: "100%", maxWidth: "none", height: "135.77%", top: "-6.15%", ...style }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const navbarRef  = useRef<HTMLElement | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const [cardWidth, setCardWidth] = useState<number>(() =>
    typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 1320) : 1320,
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const measure = () => {
      setCardWidth(card.offsetWidth);
    };

    const obs = new ResizeObserver(measure);
    obs.observe(card);
    measure();
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Un selector específico para evitar capturar otro <nav>.
    const navbar = document.querySelector('#main-navbar') as HTMLElement;
    
    if (navbar) {
      navbarRef.current = navbar;
      setNavbarHeight(navbar.offsetHeight);

      // Actualiza cuando cambie el tamaño de la navbar
      const resizeObserver = new ResizeObserver(() => {
        setNavbarHeight(navbar.offsetHeight);
      });
      resizeObserver.observe(navbar);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  function scrollToAbout() {
    const target = document.querySelector("#about");
    if (!target) return;

    const startY   = window.scrollY;
    const targetY  = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetY - startY;
    let   startTime: number | null = null;

    function step(now: number) {
      if (startTime === null) startTime = now;
      const elapsed  = now - startTime;
      const progress = Math.min(1, elapsed / SCROLL_DURATION);
      window.scrollTo(0, startY + distance * easeScroll(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // ── Responsive ──────────────────────────────────────────────────────────────
  const isMobile = cardWidth < MOBILE_BREAK;
  
  // Escala del contenido (de 0.4 en 768px a 1 en 1060px, máximo 1)
  // Escala del contenido (de 0.4 en 768px, sin máximo)
const contentScale = isMobile 
  ? 1 
  : Math.max(MIN_SCALE, cardWidth / BASE_WIDTH);

  // Dimensiones del contenedor escalado
  const desktopContainerHeight = 399 * contentScale;
  const desktopContainerTop = 26 * contentScale;
  const desktopContainerLeft = 52 * contentScale;
  const desktopContainerWidth = 952 * contentScale;

  // Altura mínima del card (crece verticalmente con el contenido)
   const cardMinHeight = isMobile
    ? "auto"
    : Math.max(280, Math.ceil(
        desktopContainerTop + 
        desktopContainerHeight + 
        40 * contentScale 
      ));
  // Padding responsivo
  const cardPadding = isMobile 
    ? "clamp(20px, 5vw, 40px) clamp(20px, 5vw, 40px) 0 px" 
    : `${56 * contentScale}px`;

  // Asegura que el card no sea más alto que el viewport
  const maxCardHeight = `calc(100vh - ${navbarHeight + 40}px)`;

  const letters = LETTER_DATA.map((datum) => (
    <AnimatedLetter key={datum.key} datum={datum} scrollYProgress={scrollYProgress} />
  ));

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center px-4"
      style={{ // Resto del espacio vertical para el card, con un mínimo de 280px para evitar colapsos en mobile */
      minHeight: `calc(100vh - ${navbarHeight}px)`,
      paddingTop: "0px",  // Evita desplazar el card; flex se encarga del centrado
      paddingBottom: "20px",            // Pequeño margen inferior
      position: "relative",
    }}
    >
      <motion.div
        ref={cardRef}
        data-hero-card
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="bg-black overflow-clip relative rounded-[42px] w-full"
        style={{
          maxWidth:  "1320px",
          minHeight: cardMinHeight,
          maxHeight: maxCardHeight, // evita que el card crezca más que el viewport (menos navbar)
          padding:   cardPadding,
          zIndex:    10000,
          overflowY: "auto", // permite scroll interno si el contenido es muy alto (modo desktop con escala baja)
        }}
      >
        {/* MODO DESKTOP (≥ 768 px) */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              height: `${desktopContainerHeight}px`,
              left: `${desktopContainerLeft}px`,
              top: `${desktopContainerTop}px`,
              width: `${desktopContainerWidth}px`,
            }}
          >
            <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full">
              {/* FOTO */}
              <div style={{ 
                height: `${357 * contentScale}px`, 
                left: `${575 * contentScale}px`, 
                top: `${64 * contentScale}px`, 
                width: `${363 * contentScale}px`, 
                position: "absolute" 
              }}>
                <PhotoBlock />
              </div>

              {/* SVG DEL NOMBRE */}
              <div className="relative shrink-0" style={{ 
                height: `${243 * contentScale}px`, 
                width: `${952 * contentScale}px`, 
                overflow: "visible" 
              }}>
                <svg
                  className="absolute block inset-0 size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 918.202 236.058"
                  style={{ overflow: "visible" }}
                >
                  {letters}
                </svg>
              </div>

              {/* SUBTÍTULO */}
              <p
                className="whitespace-nowrap text-white shrink-0"
                style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif",
                  fontWeight: 700,
                  fontSize: `${32 * contentScale}px`,
                  lineHeight: `${48 * contentScale}px`,
                }}
              >
                Desarrollador de Software
              </p>

              {/* BOTÓN */}
              <div style={{ paddingTop: `${16 * contentScale}px` }}>
                <button
                  onClick={scrollToAbout}
                  className="flex items-center gap-2 bg-transparent cursor-pointer"
                  style={{
                    padding: `${12.8 * contentScale}px ${24.8 * contentScale}px`,
                    borderRadius: "9999px",
                    border: "0.8px solid rgba(255,255,255,0.2)",
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontSize: `${16 * contentScale}px`,
                    color: "#b0b0b0",
                    lineHeight: `${24 * contentScale}px`,
                  }}
                >
                  Conóceme
                  <svg width={16 * contentScale} height={16 * contentScale} viewBox="0 0 16 16" fill="none">
                    <path d={svgPaths.p98bfb80} stroke="#B0B0B0" strokeLinecap="round" strokeWidth={1.33333 * contentScale} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODO MOBILE (< 768 px) */}
        {isMobile && (
          <div
            style={{
              padding: "clamp(20px, 5vw, 40px)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(12px, 3vw, 20px)",
                position: "relative",
              }}
            >
              {/* SVG nombre */}
              <div style={{ position: "relative", overflow: "visible" }}>
                <svg
                  viewBox="0 0 918.202 236.058"
                  preserveAspectRatio="xMinYMid meet"
                  fill="none"
                  style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
                >
                {letters}
                </svg>
              </div>

              {/* Subtítulo */}
              <p
                className="text-white"
                  style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(15px, 4vw, 24px)",
                    lineHeight: 1.4,
                    }}
            >
      Desarrollador de Software
    </p>

    {/* Botón - con z-index mayor */}
<div style={{ position: "relative", zIndex: 2 }}>
  <button
    onClick={scrollToAbout}
    className="flex items-center gap-2 bg-transparent cursor-pointer"
    style={{
      padding: "10px 20px",
      borderRadius: "9999px",
      border: "0.8px solid rgba(255,255,255,0.2)",
      fontFamily: "'Atkinson Hyperlegible', sans-serif",
      fontSize: "clamp(13px, 3.5vw, 16px)",
      color: "#b0b0b0",
      position: "relative", // Asegura que z-index funcione
      zIndex: 2,
    }}
  >
        Conóceme
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d={svgPaths.p98bfb80} stroke="#B0B0B0" strokeLinecap="round" strokeWidth="1.33333" />
        </svg>
      </button>
    </div>

    {/* Foto - con z-index menor */}
<div
  style={{
    position: "relative",
    alignSelf: "flex-end",
    width: "clamp(275px, 78%, 320px)",
    aspectRatio: "363 / 357",
    marginTop: "-50px",
    zIndex: 1, // Menor que el botón
    ...(typeof window !== 'undefined' && window.innerWidth <= 425 && {
      alignSelf: "center",
    })
  }}
>
      <PhotoBlock />
    </div>
  </div>
)}
      </motion.div>
    </section>
  );
}
