"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Explorar", href: "#categorias" },
  { label: "Destacados", href: "#destacados" },
  { label: "Nuestra historia", href: "#historia" },
  { label: "Confianza", href: "#confianza" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-8 py-5 lg:px-16">
          <a href="#" className="flex items-center gap-2">
            <span className={`text-lg font-medium tracking-tight transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-background"
            }`}>
              MotoMarket
            </span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-normal transition-colors duration-300 ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-background/70 hover:text-background"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="#negocios"
              className={`text-sm font-normal transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-background/70 hover:text-background"
              }`}
            >
              Para negocios
            </a>
            <a
              href="#"
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-background text-foreground hover:bg-background/90"
              }`}
            >
              Publicar anuncio
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-background"
            }`}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-2xl font-light text-foreground"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background"
              onClick={() => setMobileOpen(false)}
            >
              Publicar anuncio
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
