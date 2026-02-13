"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const easeSmooth = [0.4, 0, 0.2, 1] as const

export function BusinessCta() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="negocios"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeSmooth }}
          className="relative overflow-hidden rounded-card bg-primary shadow-card"
        >
          {/* Degradado sutil para profundidad */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(255,255,255,0.06),transparent)]" />

          <div className="relative flex flex-col items-center px-8 py-20 text-center sm:px-14 sm:py-28">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-label font-medium tracking-widest text-white/70"
            >
              Para negocios
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-5 font-heading text-display font-semibold tracking-tight text-white"
            >
              ¿Tienes tienda o taller?
              <br />
              <span className="text-white/95">Crece con nosotros.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-5 max-w-md font-body text-body-lg leading-relaxed text-white/80"
            >
              Llega a miles de compradores en toda Cuba con herramientas profesionales
              para hacer crecer tu negocio.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link href="/registro-empresarial">
                <motion.span
                  className="inline-flex h-12 items-center gap-2 rounded-button bg-white px-8 font-body text-base font-medium text-primary shadow-soft transition-all duration-smooth hover:shadow-card"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  Comenzar ahora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </motion.span>
              </Link>
              <Link href="/para-negocios">
                <motion.span
                  className="font-body text-base font-medium text-white/80 transition-colors duration-smooth hover:text-white"
                  whileHover={{ x: 4 }}
                >
                  Saber más →
                </motion.span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-16 grid grid-cols-3 gap-8 border-t border-white/15 pt-10"
            >
              {[
                { value: "2K+", label: "Vendedores activos" },
                { value: "15K+", label: "Compradores al mes" },
                { value: "98%", label: "Satisfacción" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-semibold text-white md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-body text-sm text-white/60 md:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
