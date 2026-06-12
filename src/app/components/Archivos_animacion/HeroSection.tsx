import { motion } from "motion/react";
import imgAvatar from "../../../imports/Frame9/5ece9633dfae30c74e9ee76a13fd5a6f23357242.png";

export function HeroSection() {
  function scrollToAbout() {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center pt-20 pb-8 px-4"
      style={{ position: "relative", zIndex: 50 }}
    >
      <motion.div
        data-hero-card
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1320px] bg-black rounded-[42px] p-8 md:p-14 flex flex-col md:flex-row items-center md:items-end justify-between gap-10 relative overflow-hidden"
      >
        {/* Name + title */}
        <div className="flex flex-col gap-4 z-10">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white leading-[1.05]"
            style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 8vw, 7rem)",
            }}
          >
            Omar Anzures<br />Campos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-white"
            style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
            }}
          >
            Desarrollador de Software
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={scrollToAbout}
            className="mt-4 self-start flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-[#b0b0b0] hover:text-white hover:border-white/50 transition-all duration-300 bg-transparent cursor-pointer"
            style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem" }}
          >
            Conóceme
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.button>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative shrink-0"
        >
          <div className="w-[220px] h-[260px] md:w-[300px] md:h-[340px] rounded-[28px] overflow-hidden">
            <img
              src={imgAvatar}
              alt="Omar Anzures Campos"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
          >
            <span style={{ fontSize: "1.8rem" }}>👋</span>
          </motion.div>
        </motion.div>

        {/* Background glow */}
        <div className="absolute bottom-0 right-[20%] w-[400px] h-[300px] rounded-full bg-white/2 blur-3xl pointer-events-none" />
      </motion.div>
    </section>
  );
}
