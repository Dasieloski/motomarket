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
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeSmooth }}
            className="relative aspect-[4/5] overflow-hidden rounded-card shadow-card"
          >
            <Image
              src="/images/brand-story.jpg"
              alt="Comunidad de motociclistas en Cuba"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </motion.div>

          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-label font-medium tracking-widest text-primary-muted"
            >
              Nuestra historia
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-5 font-heading text-display font-semibold tracking-tight text-primary"
            >
              Confianza, comunidad
              <br />
              y reputación.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="mt-8 flex flex-col gap-5"
            >
              <p className="font-body text-body-lg leading-relaxed text-primary-secondary">
                Creamos MotoMarket con una convicción: comprar y vender motos en Cuba
                debería ser una experiencia segura, transparente y digna de confianza.
              </p>
              <p className="font-body text-body-lg leading-relaxed text-primary-secondary">
                Cada anuncio verificado, cada valoración real y cada conexión entre
                compradores y vendedores construye una comunidad donde la reputación
                importa y la pasión por las dos ruedas nos une.
              </p>
            </motion.div>
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-9 inline-flex items-center gap-2 font-body text-base font-medium text-primary transition-colors duration-smooth hover:text-accent"
              whileHover={{ x: 4 }}
            >
              Conocer más
              <span className="text-lg">→</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
