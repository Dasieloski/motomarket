"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Star, MessageCircle, Zap } from "lucide-react"

const features = [
  {
    icon: Star,
    title: "Reputación",
    description: "Calificaciones y reseñas de compradores reales que puedes consultar antes de decidir.",
  },
  {
    icon: ShieldCheck,
    title: "Verificación",
    description: "Cada vendedor pasa un proceso de verificación para garantizar tu seguridad.",
  },
  {
    icon: MessageCircle,
    title: "Soporte real",
    description: "Asistencia personal para resolver dudas y asegurar una experiencia sin fricciones.",
  },
  {
    icon: Zap,
    title: "Publicar rápido",
    description: "Publica tu anuncio con fotos y descripción en menos de 2 minutos.",
  },
]

const easeSmooth = [0.4, 0, 0.2, 1] as const

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="confianza"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeSmooth }}
          className="mb-20 text-center"
        >
          <span className="font-body text-label font-medium tracking-widest text-primary-muted">
            Confianza
          </span>
          <h2 className="mt-5 font-heading text-display font-semibold tracking-tight text-primary">
            Compra con total seguridad
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body text-body-lg leading-relaxed text-primary-secondary">
            Cada detalle está pensado para que tu experiencia sea segura y confiable
          </p>
        </motion.div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-card bg-surface-subtle text-accent shadow-soft transition-all duration-smooth group-hover:shadow-card md:h-[72px] md:w-[72px]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4 }}
              >
                <feature.icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-body text-lg font-medium text-primary transition-colors duration-smooth group-hover:text-accent md:text-xl">
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
