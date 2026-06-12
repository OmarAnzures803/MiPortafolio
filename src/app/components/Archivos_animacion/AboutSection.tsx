import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useMotionValue } from "motion/react";
import imgGif from "../../../imports/Sprite-01_developer.gif";
import imgHandsUp from "../../../imports/Sprite-01_developer_HandsUp.png";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Global scroll — no target, sin warning
  const { scrollY } = useScroll();

  // MotionValues para el PNG fijo (actualizados imperativamente en cada frame)
  const pngTop    = useMotionValue(2000);   // arranca fuera de pantalla
  const pngLeft   = useMotionValue(0);
  const pngW      = useMotionValue(300);
  const pngH      = useMotionValue(300);
  const pngOp     = useMotionValue(1);
  const gifOp     = useMotionValue(0);

  useEffect(() => {
    function update(s: number) {
      const heroCard = document.querySelector("[data-hero-card]") as HTMLElement | null;
      const sprite   = spriteRef.current;
      if (!heroCard || !sprite) return;

      const heroRect   = heroCard.getBoundingClientRect();
      const spriteRect = sprite.getBoundingClientRect();

      // Posiciones en la página (invariantes al scroll)
      const heroBottomPage   = heroRect.bottom   + s;           // borde inferior del hero card
      const spriteCenterPage = spriteRect.top + spriteRect.height / 2 + s; // centro del sprite

      // Dimensiones y posición horizontal del sprite (para alinear el PNG)
      pngLeft.set(spriteRect.left);
      pngW.set(spriteRect.width);
      pngH.set(spriteRect.height);

      // El PNG termina su recorrido cuando el sprite está centrado en pantalla
      const animEnd = Math.max(1, spriteCenterPage - window.innerHeight * 0.5);
      const progress = Math.min(1, Math.max(0, s / animEnd));

      // Interpola la posición en la página: borde hero → centro sprite
      const pngCenterPage = heroBottomPage + (spriteCenterPage - heroBottomPage) * progress;

      // Convierte a posición en el viewport (para position:fixed)
      const pngTopViewport = pngCenterPage - s - spriteRect.height / 2;
      pngTop.set(pngTopViewport);

      // Corte abrupto: PNG visible todo el trayecto, desaparece instantáneamente al llegar
      const arrived = progress >= 1;
      pngOp.set(arrived ? 0 : 1);
      gifOp.set(arrived ? 1 : 0);
    }

    // Medición inicial (tras un tick para que el layout esté asentado)
    const t = setTimeout(() => update(window.scrollY), 50);

    const unsubScroll = scrollY.on("change", update);

    function onResize() { update(window.scrollY); }
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t);
      unsubScroll();
      window.removeEventListener("resize", onResize);
    };
  }, [scrollY, pngTop, pngLeft, pngW, pngH, pngOp, gifOp]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 40 }}
      className="px-4 py-6"
    >
      {/*
        PNG con position:fixed — viaja libremente por toda la página.
        z-index:40 → queda DETRÁS del hero section (z-index:50), así parece
        emerger desde detrás del card del hero conforme desciende.
      */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top:     pngTop,
          left:    pngLeft,
          width:   pngW,
          height:  pngH,
          opacity: pngOp,
          zIndex:  40,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={imgHandsUp}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain", imageRendering: "pixelated" }}
        />
      </motion.div>

      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* Columna izquierda — GIF (oculto mientras desciende el PNG) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-center py-8"
        >
          <div
            ref={spriteRef}
            style={{ position: "relative", width: 300, height: 300 }}
          >
            <motion.img
              src={imgGif}
              alt="Omar Anzures — desarrollador de software"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ imageRendering: "pixelated", opacity: gifOp }}
            />
          </div>
        </motion.div>

        {/* Columna derecha — descripción */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="bg-black rounded-[42px] flex flex-col gap-6 items-center justify-center p-8 md:p-12"
        >
          <p
            className="text-center"
            style={{
              fontFamily: "'Ubuntu Mono', monospace",
              fontWeight: 700,
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              color: "#909090",
            }}
          >
            ¿Cómo me defino a mí mismo?
          </p>
          <p
            style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
              color: "white",
              lineHeight: 1.6,
            }}
          >
            Soy un apasionado por el desarrollo de UI y el desarrollo en general,
            siempre dispuesto a aprender nuevas tecnologías y herramientas para mejorar mi trabajo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
