"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { AnimatedIcon } from "@/components/ui/animated-icon"
import { Facebook, Instagram, Linkedin } from "lucide-react"

const footerLinks = [
  {
    title: "Marketplace",
    links: ["Motos nuevas", "Motos usadas", "Repuestos", "Accesorios", "Talleres"],
  },
  {
    title: "Empresa",
    links: ["Sobre nosotros", "Contacto", "Blog", "Prensa", "Roadmap"],
  },
  {
    title: "Soporte",
    links: ["Centro de ayuda", "Seguridad", "Terminos", "Privacidad"],
  },
]

const socialIcons = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
]

const easeSmooth = [0.4, 0, 0.2, 1] as const

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  return (
    <footer ref={footerRef} className="border-t border-white/[0.06] bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20 lg:px-14">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: easeSmooth }}
            className="max-w-sm"
          >
            <span className="font-logo text-lg font-semibold tracking-tight text-white">
              MotoMarket
            </span>
            <p className="mt-5 font-body text-body leading-relaxed text-primary-secondary">
              El marketplace de motos, piezas y servicios verificados en Cuba.
              Compra y vende con confianza.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialIcons.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-primary-muted transition-colors duration-smooth hover:text-accent"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatedIcon icon={Icon} size={24} color="white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            {footerLinks.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: easeSmooth }}
              >
                <h4 className="font-body text-label font-medium tracking-widest text-accent">
                  {group.title.toUpperCase()}
                </h4>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href={link === "Roadmap" ? "/roadmap" : "#"}
                        className="inline-block font-body text-body text-primary-secondary transition-colors duration-smooth hover:text-white"
                        whileHover={{ x: 2 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row"
        >
          <p className="font-body text-label text-primary-muted">
            {'2026 MotoMarket Cuba. Todos los derechos reservados.'}
          </p>
          <div className="flex items-center gap-6">
            {["Terminos", "Privacidad", "Cookies"].map((label) => (
              <motion.a
                key={label}
                href="#"
                className="font-body text-label text-primary-muted transition-colors duration-smooth hover:text-white"
                whileHover={{ x: 2 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
