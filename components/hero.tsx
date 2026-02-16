"use client"

import { useRef, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Link from "next/link"

const quickLinks = [
  { label: "Motos", href: "#categorias" },
  { label: "Piezas", href: "#categorias" },
  { label: "Servicios", href: "#categorias" },
]

const HeroScene = dynamic(
  () => import("./hero/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[320px] w-full overflow-hidden bg-[#0A0D14] md:h-[520px]" />
    ),
  }
)

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const [scrollFor3D, setScrollFor3D] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollFor3D(latest)
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.1])
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, 32])

  const handleModelLoaded = useCallback(() => {
    setIsModelLoaded(true)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100vh] min-h-[100dvh] items-center justify-center overflow-hidden bg-[#0A0D14] pt-24 md:pt-28"
    >
      {/* 3D Canvas - DO NOT MODIFY */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroScene
          className="h-full w-full"
          scrollProgress={scrollFor3D}
          onModelLoaded={handleModelLoaded}
        />
      </div>

      {/* === ANIMATED GRADIENT BACKGROUND === */}
      <div className="pointer-events-none absolute inset-0 z-[1] hero-gradient-overlay">
        {/* Orb 1 - TEST: Red glow top-left */}
        <div className="hero-orb-1 absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,0,0,0.5)_0%,transparent_70%)] blur-3xl md:h-[700px] md:w-[700px]" />
        {/* Orb 2 - TEST: Yellow glow bottom-right */}
        <div className="hero-orb-2 absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,220,0,0.4)_0%,transparent_65%)] blur-3xl md:h-[600px] md:w-[600px]" />
        {/* Orb 3 - TEST: Cyan glow center */}
        <div className="hero-orb-3 absolute left-1/3 top-1/4 h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(0,255,255,0.45)_0%,transparent_60%)] blur-3xl md:h-[500px] md:w-[500px]" />
      </div>

      {/* Left gradient for text legibility */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#0A0D14]/90 via-[#0A0D14]/60 to-transparent md:w-[55%]" />
      </div>

      {/* Bottom edge gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-[var(--surface)] to-transparent" />

      {/* Content grid */}
      <div className="relative z-[3] mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative w-full max-w-xl"
        >
          <div className="relative px-4 py-6 md:px-6 md:py-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-accent/8 px-4 py-1.5 backdrop-blur-sm edge-card"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="font-body text-xs font-medium uppercase tracking-wider text-accent">
                El marketplace #1 de Cuba
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="font-display text-[2.6rem] leading-[1.05] tracking-tight text-white md:text-[3.5rem]"
            >
              <span className="block">El futuro de</span>
              <span className="block">comprar y vender</span>
              <span className="block text-accent">motos en Cuba.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-white/50 md:text-[16px]"
            >
              Publica en minutos. Conecta directo con compradores. Motos, piezas, accesorios y talleres verificados en un solo lugar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="mt-8 flex flex-col gap-4 md:flex-row md:items-center"
            >
              <Link href="/motos-destacadas">
                <motion.button
                  type="button"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-[var(--radius-button)] bg-accent px-8 py-4 text-sm font-semibold text-[#0A0D14] transition-all duration-300 hover:bg-accent-hover glow-accent glow-accent-hover"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                  <span className="relative z-10">Ver motos destacadas</span>
                </motion.button>
              </Link>

              <Link href="/vender">
                <motion.button
                  type="button"
                  className="inline-flex items-center justify-center rounded-[var(--radius-button)] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 edge-button hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Vender mi moto
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.4, 0, 0.2, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {quickLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.8 + i * 0.06,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="inline-flex h-10 items-center rounded-full px-5 text-xs font-medium text-white/50 backdrop-blur-sm transition-all duration-300 edge-button hover:text-accent md:h-11 md:text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right column empty - space reserved for 3D model */}
        <div className="hidden w-full md:block" />
      </div>
    </section>
  )
}
