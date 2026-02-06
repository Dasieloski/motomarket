"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Search, ChevronDown } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with soft parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="/images/hero-lifestyle.jpg"
          alt="Motociclista en carretera"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-4xl font-light leading-[1.15] tracking-tight text-background sm:text-5xl md:text-7xl"
        >
          Encuentra tu
          <br />
          <span className="font-medium">camino</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-md text-pretty text-base font-light text-background/80 sm:text-lg"
        >
          Compra y vende motos y repuestos con confianza y estilo.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 w-full max-w-lg"
        >
          <div className="group relative flex items-center overflow-hidden rounded-full bg-background/95 shadow-lg backdrop-blur-sm transition-shadow duration-500 focus-within:shadow-xl">
            <Search className="ml-5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar motos, piezas, servicios..."
              className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
            />
            <button
              type="button"
              className="mr-1.5 shrink-0 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90"
            >
              Buscar
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-background/60">
            Explorar
          </span>
          <ChevronDown className="h-4 w-4 text-background/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
