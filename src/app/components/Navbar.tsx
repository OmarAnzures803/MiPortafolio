import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const navLinks = [
  { label: "Sobre mí", href: "#about" },
  { label: "Educación / Skills", href: "#education" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleNav(href: string) {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/*
        position: sticky en lugar de fixed.
        Razón: si cualquier ancestro tiene un CSS transform aplicado (por ejemplo,
        por Motion durante animaciones), los elementos con position:fixed se
        posicionan relativos a ese ancestro transformado y dejan de ser interactuables.
        position:sticky no tiene esa restricción y siempre funciona sobre el
        contenedor de scroll normal.

        z-index: 9999 en el mismo objeto style — un solo style prop es obligatorio,
        dos style props en el mismo elemento hace que el segundo sobreescriba al primero.
      */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 left-0 right-0 flex items-center justify-between px-6 py-4 transition-colors duration-300"
        style={{
          zIndex:         9999,
          background:     scrolled ? "rgba(0,0,0,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        }}
      >
        <span
          className="text-white cursor-pointer select-none"
          style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
        >
          OAC
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-[#b0b0b0] hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none"
              style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.95rem" }}
            >
              {l.label}
            </button>
          ))}
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-200"
            style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.9rem" }}
          >
            CV
            <svg width="14" height="14" viewBox="0 0 28.3333 31.5" fill="none">
              <path d="M1.5 20.8236L1.5 26.6631C1.5 27.5481 1.83363 28.3969 2.4275 29.0227C3.02136 29.6484 3.82681 30 4.66667 30H23.6667C24.5065 30 25.312 29.6484 25.9058 29.0227C26.4997 28.3969 26.8333 27.5481 26.8333 26.6631V20.8236M14.1684 1.5V20.4089M6.93034 13.1839L14.1684 20.4089L21.4065 13.1839" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
            </svg>
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 text-white bg-transparent border-none cursor-pointer"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <svg width="28" height="22" viewBox="0 0 54.3333 42.5" fill="none">
            <path d="M50.8333 39H3.5M50.8333 21.25H3.5M50.8333 3.5H3.5" stroke="white" strokeLinecap="round" strokeWidth="7"/>
          </svg>
        </button>
      </motion.nav>

      {/* Mobile menu — fixed es correcto aquí (overlay de pantalla completa) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-black flex flex-col items-start justify-center px-8 gap-8"
            style={{ zIndex: 10000 }}
          >
            <button
              className="absolute top-5 right-6 text-white bg-transparent border-none cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <X size={32} />
            </button>
            {navLinks.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNav(l.href)}
                className="text-white bg-transparent border-none cursor-pointer text-left"
                style={{ fontFamily: "'Clash Display', 'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "2rem" }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
