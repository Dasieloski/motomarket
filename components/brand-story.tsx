"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <section id="historia" ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <motion.div style={{ y: imgY }} className="absolute -inset-10">
              <Image
                src="/images/brand-story.jpg"
                alt="Comunidad de motociclistas en Cuba"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Nuestra historia
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 text-balance text-3xl font-light leading-[1.2] tracking-tight text-foreground sm:text-4xl"
            >
              Confianza, comunidad
              <br />
              y camino abierto.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-col gap-5"
            >
              <p className="text-base font-light leading-relaxed text-muted-foreground">
                Creamos MotoMarket con una conviccion: comprar y vender motos en Cuba
                deberia ser una experiencia segura, transparente y digna de confianza.
              </p>
              <p className="text-base font-light leading-relaxed text-muted-foreground">
                Cada anuncio verificado, cada valoracion real y cada conexion entre
                compradores y vendedores construye una comunidad donde la reputacion
                importa y la pasion por las dos ruedas nos une.
              </p>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              href="#"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
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
