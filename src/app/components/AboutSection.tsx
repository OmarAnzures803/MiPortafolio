import { useRef } from "react";
import { motion, useInView } from "motion/react";
import imgPixelArt from "../../imports/image-1.png";

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="px-4 py-6">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Pixel art — sin fondo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-center py-8"
        >
          <img
            src={imgPixelArt}
            alt="Pixel art Omar"
            className="max-h-[300px] object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>

        {/* Description card */}
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
            Soy un apasionado por el desarrollo de UI y el desarrollo en general, siempre dispuesto a aprender nuevas tecnologías y herramientas para mejorar mi trabajo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
