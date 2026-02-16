"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const categories = [
  { title: "Motos nuevas", image: "/images/cat-new-motos.jpg" },
  { title: "Motos usadas", image: "/images/cat-used-motos.jpg" },
  { title: "Repuestos", image: "/images/cat-parts.jpg" },
  { title: "Accesorios", image: "/images/cat-accessories.jpg" },
  { title: "Talleres y servicios", image: "/images/cat-workshops.jpg" },
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
          <span className="font-body text-label font-medium tracking-widest text-accent">
            CATEGORIAS
          </span>
          <h2 className="mt-5 font-heading text-display font-semibold tracking-tight text-white">
            Explora por categoria
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body text-body-lg text-primary-secondary leading-relaxed">
            Encuentra exactamente lo que necesitas en nuestro marketplace especializado
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.title}
              href="#"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              className="group relative aspect-[3/4] overflow-hidden rounded-card border border-white/[0.06] bg-surface-card shadow-soft transition-all duration-smooth hover:shadow-card hover:border-accent/20"
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-smooth group-hover:scale-105"
                />
              </div>
              {/* Dark overlay with accent tint on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-smooth group-hover:from-black/85 group-hover:via-prussian/30" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-body text-base font-medium text-white md:text-lg">
                  {cat.title}
                </h3>
                <div className="mt-2 h-0.5 w-0 rounded-full bg-accent transition-all duration-smooth group-hover:w-8" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
