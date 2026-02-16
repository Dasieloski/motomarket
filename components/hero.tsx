"use client"

import { useRef, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { label: "Motos", href: "#categorias" },
  { label: "Piezas", href: "#categorias" },
  { label: "Servicios", href: "#categorias" },
]

const HERO_BG = "#F5F5F3"

const HeroScene = dynamic(
  () => import("./hero/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[320px] w-full overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_0%_0%,#ffffff_0,#f5f5f3_45%,#e7e5dd_100%)] md:h-[520px]" />
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

  // Valor numérico derivado de scrollYProgress para animar la moto (equivalente a ScrollTrigger suave)
  const [scrollFor3D, setScrollFor3D] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollFor3D(latest)
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.1])
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, 32])

  // Memoizar el callback para evitar re-renders innecesarios
  const handleModelLoaded = useCallback(() => {
    setIsModelLoaded(true)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100vh] min-h-[100dvh] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_0%_0%,#ffffff_0,#f5f5f3_40%,#e7e5dd_100%)] pt-24 md:pt-28"
      style={{ backgroundColor: HERO_BG }}
    >
      {/* Capa intermedia: Canvas 3D ocupando todo el hero como fondo dinámico */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroScene
          className="h-full w-full"
          scrollProgress={scrollFor3D}
          onModelLoaded={handleModelLoaded}
        />
      </div>

      {/* Gradient lateral oscuro solo en la zona del texto para máxima legibilidad */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black/65 via-black/40 to-transparent md:w-[45%]" />
      </div>

      {/* Capa inferior: degradados sutiles sobre el fondo */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-50 mix-blend-soft-light">
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-accent/12 via-transparent to-transparent blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tl from-primary/12 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Capa superior: grid 2 columnas (texto izquierda) */}
      <div className="relative z-20 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
        {/* Columna izquierda: texto con sombra para reforzar contraste */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative w-full max-w-xl"
        >
          <div className="relative px-6 py-6 md:px-8 md:py-8">
            {/* Badge superior opcional (se puede reactivar con otro copy si hace falta) */}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="mt-6 font-display text-[2.4rem] leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] md:text-[3.2rem]"
            >
              <span className="block">Compra y vende motos</span>
              <span className="block text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">en Cuba.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] md:text-[16px]"
            >
              Publicación fácil y rápida. Encuentra motos, piezas, accesorios y talleres. Contacto directo por WhatsApp o llamada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="mt-7 flex flex-col gap-4 md:flex-row md:items-center"
            >
              <Link href="/motos-destacadas">
                <motion.button
                  type="button"
                  className="group relative inline-flex items-center justify-center rounded-[999px] bg-white px-7 py-3.5 text-sm font-medium text-primary shadow-[0_18px_35px_rgba(0,0,0,0.4)] transition-[box-shadow,transform,background-color] duration-300 ease-[0.22,1,0.36,1] hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 rounded-[999px] bg-gradient-to-r from-accent/40 via-transparent to-primary/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10">Ver motos destacadas</span>
                </motion.button>
              </Link>

              <Link href="/vender">
                <motion.button
                  type="button"
                  className="inline-flex items-center justify-center rounded-[999px] border-2 border-white/80 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-[0.22,1,0.36,1] hover:border-white hover:bg-white/20"
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
                  className="inline-flex h-10 items-center rounded-[999px] border border-white/60 bg-white/10 backdrop-blur-sm px-5 text-xs font-medium text-white shadow-sm transition-all duration-300 ease-[0.22,1,0.36,1] hover:border-white hover:bg-white/20 md:h-11 md:text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Texto auxiliar eliminado según petición del usuario */}
          </div>
        </motion.div>

        {/* Columna derecha vacía: reserva espacio visual para la moto de fondo */}
        <div className="hidden w-full md:block" />
      </div>

      {/* Indicador de scroll eliminado según petición del usuario */}
    </section>
  )
}
