"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

export function BusinessCta() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"])

  return (
    <section id="negocios" ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-card"
        >
          {/* Subtle warm gradient */}
          <motion.div
            style={{ y: bgY }}
            className="pointer-events-none absolute -inset-20 bg-gradient-to-br from-accent/5 via-transparent to-accent/3"
          />

          <div className="relative flex flex-col items-center px-8 py-20 text-center sm:px-16 sm:py-28">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Para negocios
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              {'\u00bfTienes tienda o taller?'}
              <br />
              <span className="font-medium">Crece con nosotros.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 max-w-md text-pretty text-base font-light text-muted-foreground"
            >
              Llega a miles de compradores en toda Cuba con herramientas profesionales
              para hacer crecer tu negocio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <a
                href="#"
                className="group flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90"
              >
                Comenzar ahora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground transition-opacity hover:opacity-70"
              >
                Saber mas &#8594;
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-8 border-t border-border/60 pt-12"
            >
              {[
                { value: "2K+", label: "Vendedores activos" },
                { value: "15K+", label: "Compradores al mes" },
                { value: "98%", label: "Satisfaccion" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-light text-foreground sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-light text-muted-foreground sm:text-sm">
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
