"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const easeSmooth = [0.4, 0, 0.2, 1] as const

export function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface-elevated py-24 md:py-32"
    >
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-prussian/10 to-transparent" />
        <div className="absolute right-0 bottom-0 h-1/2 w-1/4 bg-gradient-to-tl from-accent/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeSmooth }}
            className="relative aspect-[4/5] overflow-hidden rounded-card border border-white/[0.06] shadow-card"
          >
            <Image
              src="/images/brand-story.jpg"
              alt="Comunidad de motociclistas en Cuba"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Accent corner detail */}
            <div className="absolute bottom-0 left-0 h-24 w-1 bg-gradient-to-t from-accent to-transparent" />
          </motion.div>

          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-label font-medium tracking-widest text-accent"
            >
              NUESTRA HISTORIA
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-5 font-heading text-display font-semibold tracking-tight text-white"
            >
              Confianza, comunidad
              <br />
              <span className="text-primary-secondary">y reputacion.</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="mt-8 flex flex-col gap-5"
            >
              <p className="font-body text-body-lg leading-relaxed text-primary-secondary">
                Creamos MotoMarket con una conviccion: comprar y vender motos en Cuba
                deberia ser una experiencia segura, transparente y digna de confianza.
              </p>
              <p className="font-body text-body-lg leading-relaxed text-primary-secondary">
                Cada anuncio verificado, cada valoracion real y cada conexion entre
                compradores y vendedores construye una comunidad donde la reputacion
                importa y la pasion por las dos ruedas nos une.
              </p>
            </motion.div>
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-9 inline-flex items-center gap-2 font-body text-base font-medium text-accent transition-colors duration-smooth hover:text-accent-hover"
              whileHover={{ x: 4 }}
            >
              Conocer mas
              <span className="text-lg">&#8594;</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
