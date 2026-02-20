"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import dynamic from "next/dynamic"
import { ArrowRight, ChevronDown } from "lucide-react"

// Dynamic import for the 3D scene (Spline) - Keeping this as is, but framing it better
const HeroScene = dynamic(() => import("./hero/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  ),
})

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })


  // Monolithic text movement
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Scene parallax
  const yScene = useTransform(scrollYProgress, [0, 1], [0, 50])
  const scaleScene = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden border-b border-border pt-16"
    >
      {/* === 3D SCENE BACKGROUND (FULLSCREEN) === */}
      <motion.div
        style={{ y: yScene, scale: scaleScene }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <div className="relative h-full w-full">
          {/* Volumetric ambient glow behind model */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[100px] rounded-full" />

          {/* The 3D Scene */}
          <HeroScene scrollProgress={scrollYProgress as MotionValue<number>} />

          {/* Gradient Overlays for Integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-surface/80 opacity-60" />

          {/* Technical overlay lines - Background */}
          <div className="absolute top-24 right-6 p-4 flex flex-col items-end gap-1 opacity-40">
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-[10px] font-mono text-white/40">RX-78 SYSTEM</span>
          </div>
          <div className="absolute bottom-24 left-6 p-4 flex flex-col items-start gap-1 opacity-40">
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-[10px] font-mono text-white/40">GRID: ACTIVE</span>
          </div>
        </div>
      </motion.div>

      {/* === CONTENT FOREGROUND === */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* Main Typography - Centered or Left-Aligned based on preference */}
          {/* Using col-span-12 or col-span-8 to allow text to float over the 3D model */}
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            className="col-span-1 lg:col-span-8 flex flex-col items-start gap-6 pt-10"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              <span className="text-xs font-bold tracking-widest text-white/90 uppercase font-sans">
                Sistema Operativo v2.1
              </span>
            </motion.div>

            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-technical text-hero leading-[0.9] text-white lg:text-huge"
              >
                MOTO<br />
                <span className="text-white/40">MARKET</span>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                className="absolute -bottom-2 left-0 h-1 w-24 bg-accent origin-left"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="max-w-md font-body text-lg text-secondary leading-relaxed bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/5"
            >
              La plataforma definitiva para comprar, vender y gestionar motos en Cuba.
              Seguridad verificada. Diseño de alto rendimiento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/motos"
                className="group relative flex items-center gap-3 overflow-hidden rounded bg-white px-8 py-4 text-sm font-bold tracking-wider text-black transition-transform hover:scale-105"
              >
                <span className="relative z-10">EXPLORAR MOTOS</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
              </a>

              <a
                href="/vender"
                className="group flex items-center gap-3 rounded border border-white/20 bg-black/40 px-8 py-4 text-sm font-bold tracking-wider text-white transition-colors hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
              >
                VENDER
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 z-20"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
