"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Bike, Shield, Wrench, Zap, Settings } from "lucide-react"

const categories = [
  {
    title: "Motos nuevas",
    icon: Bike,
    slug: "nuevas",
    description: "Suzuki, Yamaha, Lifan, 0km",
    gradient: "from-blue-600/20 to-blue-900/40"
  },
  {
    title: "Motos usadas",
    icon: Shield,
    slug: "usadas",
    description: "Verificadas, Oportunidades",
    gradient: "from-orange-500/20 to-orange-900/40"
  },
  {
    title: "Repuestos",
    icon: Settings,
    slug: "repuestos",
    description: "Motores, Llantas, Baterías",
    gradient: "from-slate-500/20 to-slate-900/40"
  },
  {
    title: "Accesorios",
    icon: Zap,
    slug: "accesorios",
    description: "Cascos, Guantes, Luces LED",
    gradient: "from-emerald-500/20 to-emerald-900/40"
  },
  {
    title: "Talleres",
    icon: Wrench,
    slug: "talleres",
    description: "Mecánica, Pintura, Electricidad",
    gradient: "from-purple-500/20 to-purple-900/40"
  },
]

export function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="categorias"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-20 text-center"
        >
          <span className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
            // Classification
          </span>
          <h2 className="mt-4 font-technical text-4xl text-white uppercase tracking-tighter sm:text-5xl md:text-6xl">
            Explora por<br />Categoría
          </h2>
          <p className="mx-auto mt-6 max-w-md font-body text-sm text-secondary leading-relaxed">
            ACCESO DIRECTO A NUESTRO INVENTARIO ESPECIALIZADO
          </p>
        </motion.div>

        <div className="grid grid-cols-2 justify-items-center gap-4 sm:gap-5 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              href={`/motos?category=${cat.slug}`}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                className="group relative aspect-[3/4] w-full overflow-hidden rounded-card border border-white/[0.06] bg-surface-card shadow-soft transition-all duration-smooth hover:shadow-card hover:border-accent/20 cursor-pointer"
                whileHover={{ y: -6 }}
              >
                {/* Dynamic Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50 transition-opacity duration-300 group-hover:opacity-80`} />

                {/* Icon Container - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-accent/30 shadow-glow-sm">
                    <cat.icon
                      className="h-8 w-8 text-white/90 transition-colors duration-300 group-hover:text-accent"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content at Bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-12">
                  <h3 className="font-heading text-base font-medium text-white md:text-lg">
                    {cat.title}
                  </h3>
                  <p className="mt-1 font-body text-xs text-secondary group-hover:text-white transition-colors line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-3 h-0.5 w-0 rounded-full bg-accent transition-all duration-smooth group-hover:w-8" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
