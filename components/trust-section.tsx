"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShieldCheck, Star, MessageCircle, Zap } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Verificacion real",
    description:
      "Cada vendedor pasa un proceso de verificacion para garantizar tu seguridad.",
  },
  {
    icon: Star,
    title: "Reputacion visible",
    description:
      "Calificaciones y resenas de compradores reales que puedes consultar antes de decidir.",
  },
  {
    icon: MessageCircle,
    title: "Soporte dedicado",
    description:
      "Asistencia personal para resolver dudas y asegurar una experiencia sin fricciones.",
  },
  {
    icon: Zap,
    title: "Publicacion rapida",
    description:
      "Publica tu anuncio con fotos y descripcion en menos de 2 minutos.",
  },
]

export function TrustSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="confianza" ref={ref} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Confianza
          </span>
          <h2 className="mt-4 text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Compra con total seguridad
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty text-base font-light text-muted-foreground">
            Cada detalle esta pensado para que tu experiencia sea segura y confiable
          </p>
        </motion.div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-foreground">
                <feature.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
