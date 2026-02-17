"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const categories = [
  { title: "Motos nuevas", image: "/images/cat-new-motos.jpg", slug: "nuevas", description: "Suzuki, Yamaha, Lifan, 0km" },
  { title: "Motos usadas", image: "/images/cat-used-motos.jpg", slug: "usadas", description: "Verificadas, Oportunidades" },
  { title: "Repuestos", image: "/images/cat-parts.jpg", slug: "repuestos", description: "Motores, Llantas, Baterías" },
  { title: "Accesorios", image: "/images/cat-accessories.jpg", slug: "accesorios", description: "Cascos, Guantes, Luces LED" },
  { title: "Talleres y servicios", image: "/images/cat-workshops.jpg", slug: "talleres", description: "Mecánica, Pintura, Electricidad" },
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
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                className="group relative aspect-[3/4] w-full overflow-hidden rounded-card border border-white/[0.06] bg-surface-card shadow-soft transition-all duration-smooth hover:shadow-card hover:border-accent/20 cursor-pointer"
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
                  <h3 className="font-heading text-base font-medium text-white md:text-lg">
                    {cat.title}
                  </h3>
                  <p className="mt-1 font-body text-xs text-secondary group-hover:text-white transition-colors">
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
