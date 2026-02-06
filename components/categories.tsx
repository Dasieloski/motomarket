"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const categories = [
  {
    title: "Motos nuevas",
    image: "/images/cat-new-motos.jpg",
  },
  {
    title: "Motos usadas",
    image: "/images/cat-used-motos.jpg",
  },
  {
    title: "Repuestos",
    image: "/images/cat-parts.jpg",
  },
  {
    title: "Accesorios",
    image: "/images/cat-accessories.jpg",
  },
  {
    title: "Talleres y servicios",
    image: "/images/cat-workshops.jpg",
  },
]

export function Categories() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="categorias" ref={ref} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Explora por categoria
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty text-base font-light text-muted-foreground">
            Encuentra exactamente lo que necesitas en nuestro marketplace especializado
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={cat.image || "/placeholder.svg"}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent transition-opacity duration-500 group-hover:from-foreground/70" />

              <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                <h3 className="text-sm font-medium tracking-wide text-background sm:text-base">
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
