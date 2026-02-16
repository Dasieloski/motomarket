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

const HERO_BG = "#000000"

const HeroScene = dynamic(
  () => import("./hero/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[320px] w-full overflow-hidden rounded-3xl bg-black md:h-[520px]" />
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
      className="relative flex h-[100vh] min-h-[100dvh] items-center justify-center overflow-hidden bg-black pt-24 md:pt-28"
      style={{ backgroundColor: HERO_BG }}
    >
      {/* 3D Canvas - DO NOT MODIFY */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroScene
          className="h-full w-full"
          scrollProgress={scrollFor3D}
          onModelLoaded={handleModelLoaded}
        />
      </div>

      {/* Left gradient for text legibility */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black/80 via-black/50 to-transparent md:w-[50%]" />
      </div>

      {/* Subtle ambient gradients */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-40">
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-prussian/30 via-transparent to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Bottom edge gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Content grid */}
      <div className="relative z-20 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative w-full max-w-xl"
        >
          <div className="relative px-6 py-6 md:px-8 md:py-8">
            {/* Aspirational badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 backdrop-blur-sm"
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
              className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-white/60 md:text-[16px]"
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
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-button bg-accent px-8 py-4 text-sm font-semibold text-black shadow-glow transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(252,163,17,0.3)]"
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
                  className="inline-flex items-center justify-center rounded-button border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
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
                  className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-xs font-medium text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:text-accent md:h-11 md:text-sm"
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
