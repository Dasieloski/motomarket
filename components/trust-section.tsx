"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Star, MessageCircle, Zap } from "lucide-react"

const features = [
  {
    icon: Star,
    title: "Reputacion",
    description: "Calificaciones y resenas de compradores reales que puedes consultar antes de decidir.",
  },
  {
    icon: ShieldCheck,
    title: "Verificacion",
    description: "Cada vendedor pasa un proceso de verificacion para garantizar tu seguridad.",
  },
  {
    icon: MessageCircle,
    title: "Soporte real",
    description: "Asistencia personal para resolver dudas y asegurar una experiencia sin fricciones.",
  },
  {
    icon: Zap,
    title: "Publicar rapido",
    description: "Publica tu anuncio con fotos y descripcion en menos de 2 minutos.",
  },
]

const easeSmooth = [0.4, 0, 0.2, 1] as const

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="confianza"
      ref={sectionRef}
      className="relative bg-surface-elevated py-24 md:py-32"
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeSmooth }}
          className="mb-20 text-center"
        >
          <span className="font-body text-label font-medium tracking-widest text-accent">
            CONFIANZA
          </span>
          <h2 className="mt-5 font-heading text-display font-semibold tracking-tight text-white">
            Compra con total seguridad
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body text-body-lg leading-relaxed text-primary-secondary">
            Cada detalle esta pensado para que tu experiencia sea segura y confiable
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: easeSmooth }}
              className="group flex flex-col items-center text-center"
            >
              <motion.div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-card border border-white/[0.06] bg-surface-card text-accent shadow-soft transition-all duration-smooth group-hover:border-accent/20 group-hover:shadow-glow md:h-[72px] md:w-[72px]"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4 }}
              >
                <feature.icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-body text-lg font-medium text-white transition-colors duration-smooth group-hover:text-accent md:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-primary-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
