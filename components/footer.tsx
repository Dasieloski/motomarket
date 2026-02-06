"use client"

import { motion } from "framer-motion"

const footerLinks = [
  {
    title: "Marketplace",
    links: ["Motos nuevas", "Motos usadas", "Repuestos", "Accesorios", "Talleres"],
  },
  {
    title: "Empresa",
    links: ["Sobre nosotros", "Contacto", "Blog", "Prensa"],
  },
  {
    title: "Soporte",
    links: ["Centro de ayuda", "Seguridad", "Terminos", "Privacidad"],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-8 py-20 lg:px-16">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xs"
          >
            <span className="text-lg font-medium tracking-tight text-foreground">
              MotoMarket
            </span>
            <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
              El marketplace de motos, piezas y servicios verificados en Cuba.
              Compra y vende con confianza.
            </p>
          </motion.div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-20">
            {footerLinks.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">
                  {group.title}
                </h4>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs font-light text-muted-foreground">
            {'2026 MotoMarket Cuba. Todos los derechos reservados.'}
          </p>
          <div className="flex items-center gap-6">
            {["Terminos", "Privacidad", "Cookies"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs font-light text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
