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
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="font-heading text-display font-semibold tracking-tight text-primary">
            Explora por categoría
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
              className="group relative aspect-[3/4] overflow-hidden rounded-card bg-surface-subtle shadow-soft transition-all duration-smooth hover:shadow-card"
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-smooth group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-90 transition-opacity duration-smooth group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-5 transition-colors sm:p-6">
                <h3 className="font-body text-base font-medium text-white drop-shadow-sm md:text-lg">
                  {cat.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
