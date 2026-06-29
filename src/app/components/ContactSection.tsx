import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import cafeImg from "../../app/assets/Cafe.gif";

const links = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/OmarAnzures803",
    handle: "@OmarAnzures803",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/omar-campos-935a8a1b7/",
    handle: "Omar Anzures",
  },
  {
    icon: Mail,
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=omaranzures803@gmail.com",
    handle: "omaranzures803@gmail.com",
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="px-4 py-6 pb-16">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-black rounded-[42px] p-8 md:p-16 flex flex-col items-center gap-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontFamily:
                "'Clash Display', 'Atkinson Hyperlegible', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "white",
              textAlign: "center",
            }}
          >
            ¿Hablamos?
          </motion.p>
          <motion.img
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            src={cafeImg}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              fontSize: "1.1rem",
              color: "#909090",
              textAlign: "center",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            Estoy abierto a nuevas oportunidades, colaboraciones o simplemente
            una conversación sobre tecnología.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                  whileHover={{
                    scale: 1.04,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/15 text-white no-underline transition-colors duration-200"
                  style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <Icon size={20} />
                  <div className="flex flex-col">
                    <span style={{ fontSize: "0.75rem", color: "#767676" }}>
                      {link.label}
                    </span>
                    <span style={{ fontSize: "0.95rem" }}>{link.handle}</span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-4 pt-8 border-t border-white/10 w-full text-center"
          >
            <p
              style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontSize: "0.85rem",
                color: "#767676",
              }}
            >
              © 2026 Omar Anzures Campos · OmarAnzures803
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
