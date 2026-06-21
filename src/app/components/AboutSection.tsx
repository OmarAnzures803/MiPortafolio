import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useMotionValue } from "motion/react";
import imgGif     from "../../imports/Sprite-01_developer.gif";
import imgHandsUp from "../../imports/Sprite-01_developer_HandsUp.png";

// ─── PARÁMETROS AJUSTABLES ───────────────────────────────────────────────────

/** Factor del viewport para definir el final de la animación.
 *  0.5 = el PNG llega cuando el sprite está centrado verticalmente en pantalla.
 *  Baja el valor → llega antes (cuando el sprite está más abajo). */
const ANIM_END_FACTOR = 0.5;

/** Grados totales de rotación durante la caída.
 *  360 = una vuelta completa. 720 = dos vueltas. */
const SPIN_DEGREES = 360;

/** Progreso (0–1) en que termina la fase de caída y empieza el aterrizaje.
 *  0.78 = el personaje empieza a estabilizarse cuando lleva el 78% del recorrido. */
const LAND_START = 0.78;

/** Ángulo de rebote (grados negativos = leve contragiro) al aterrizar.
 *  -8 = pequeño overshoot antes de quedar recto. Ponlo en 0 para aterrizaje limpio. */
const LAND_WOBBLE_DEG = -8;

/** Progreso en que el personaje queda perfectamente recto (0°).
 *  Debe ser < 1 para que haya un instante de quietud antes del corte. */
const LAND_END = 0.95;

/** Progreso en que el PNG alcanza opacidad total.
 *  0.06 = fade-in rápido en el primer 6% del recorrido de scroll. */
const FADE_IN_END = 0.06;

// ─────────────────────────────────────────────────────────────────────────────

/** Calcula la rotación del personaje según el progreso del scroll. */
function calcRotation(p: number): number {
  if (p <= LAND_START) {
    // Caída principal: gira desde SPIN_DEGREES hasta ~0
    return SPIN_DEGREES * (1 - p / LAND_START);
  }
  if (p <= LAND_END) {
    // Aterrizaje: overshoot con seno → LAND_WOBBLE_DEG y vuelta a 0
    const t = (p - LAND_START) / (LAND_END - LAND_START);
    return LAND_WOBBLE_DEG * Math.sin(t * Math.PI);
  }
  return 0; // estabilizado
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spriteRef  = useRef<HTMLDivElement>(null);

  // ⚠️  La animación de entrada de la columna izquierda usa SOLO opacidad.
  //    Si se añade x/y al initial, getBoundingClientRect() devuelve posiciones
  //    incorrectas durante la transición y el PNG se arrastra horizontalmente.
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollY } = useScroll(); // scroll global, sin target → sin warning

  // MotionValues del PNG (actualizados en cada tick de scroll)
  const pngTop  = useMotionValue(2500); // arranca fuera de pantalla
  const pngLeft = useMotionValue(0);
  const pngW    = useMotionValue(300);
  const pngH    = useMotionValue(300);
  const pngOp   = useMotionValue(0);
  const pngRot  = useMotionValue(SPIN_DEGREES);
  const gifOp   = useMotionValue(0);

  useEffect(() => {
    function update(s: number) {
      const heroCard = document.querySelector("[data-hero-card]") as HTMLElement | null;
      const sprite   = spriteRef.current;
      if (!heroCard || !sprite) return;

      const heroRect   = heroCard.getBoundingClientRect();
      const spriteRect = sprite.getBoundingClientRect();

      // Posiciones de PÁGINA (no cambian con el scroll)
      const heroBottomPage   = heroRect.bottom + s;
      const spriteCenterPage = spriteRect.top + spriteRect.height / 2 + s;

      // Alineación horizontal exacta al sprite del GIF
      pngLeft.set(spriteRect.left);
      pngW.set(spriteRect.width);
      pngH.set(spriteRect.height);

      // Rango del scroll donde ocurre la animación completa
      const animEnd  = Math.max(1, spriteCenterPage - window.innerHeight * ANIM_END_FACTOR);
      const progress = Math.min(1, Math.max(0, s / animEnd));

      // Posición vertical: interpola en coordenadas de página, luego convierte a viewport
      const pngCenterPage  = heroBottomPage + (spriteCenterPage - heroBottomPage) * progress;
      const pngTopViewport = pngCenterPage - s - spriteRect.height / 2;
      pngTop.set(pngTopViewport);

      // Rotación: cae girando y aterriza de pie
      pngRot.set(calcRotation(progress));

      // Opacidad
      if (s <= 0) {
        // Página al tope: PNG oculto, GIF oculto (esperando el primer scroll)
        pngOp.set(0);
        gifOp.set(0);
      } else if (progress >= 1) {
        // Llegó a destino: corte abrupto → GIF aparece
        pngOp.set(0);
        gifOp.set(1);
      } else {
        // Fade-in rápido al inicio del scroll, luego totalmente opaco
        pngOp.set(Math.min(1, progress / FADE_IN_END));
        gifOp.set(0);
      }
    }

    // Pequeño delay para que el layout esté asentado antes de medir
    const t = setTimeout(() => update(window.scrollY), 50);

    const unsubScroll = scrollY.on("change", update);
    function onResize() { update(window.scrollY); }
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t);
      unsubScroll();
      window.removeEventListener("resize", onResize);
    };
  }, [scrollY, pngTop, pngLeft, pngW, pngH, pngOp, pngRot, gifOp]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ position: "relative" }}
      className="px-4 py-6"
    >
      {/*
        PNG con position:fixed — viaja libremente por toda la página sin clipping.
        zIndex:40 < zIndex:50 del HeroSection → queda detrás del card del hero,
        emergiendo visualmente por debajo de su borde inferior al scrollear.
        transformOrigin:"center center" garantiza que la rotación sea sobre el
        propio centro de la imagen (caída sobre sí mismo).
      */}
      <motion.div
        aria-hidden
        style={{
          position:        "fixed",
          top:             pngTop,
          left:            pngLeft,
          width:           pngW,
          height:          pngH,
          opacity:         pngOp,
          rotate:          pngRot,
          transformOrigin: "center center",
          zIndex:          40,
          pointerEvents:   "none",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
        }}
      >
        <img
          src={imgHandsUp}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain", imageRendering: "pixelated" }}
        />
      </motion.div>

      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/*
          ⚠️  SOLO opacidad en la animación de entrada — sin x ni y.
          Si se agrega translateX/Y aquí, el getBoundingClientRect() del spriteRef
          devuelve la posición desplazada durante la transición, haciendo que el
          PNG fijo se mueva lateralmente al aparecer por primera vez.
        */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-center py-8"
        >
          <div ref={spriteRef} style={{ position: "relative", width: 300, height: 300 }}>
            <motion.img
              src={imgGif}
              alt="Omar Anzures — desarrollador de software"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ imageRendering: "pixelated", opacity: gifOp }}
            />
          </div>
        </motion.div>

        {/* La columna derecha sí puede tener x porque no afecta la medición */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="bg-black rounded-[42px] flex flex-col gap-6 items-center justify-center p-8 md:p-12"
        >
          <p
            className="text-center"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize:   "clamp(1.8rem, 3vw, 2.5rem)",
              color:      "#FFFFFF", // 
              letterSpacing: "-0.02em",
            }}
          >
            ¿Quién soy?
          </p>
          <p
            style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              fontWeight: 700,
              fontSize:   "clamp(0.95rem, 1.8vw, 1.25rem)",
              color:      "#D4D4D4", //
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