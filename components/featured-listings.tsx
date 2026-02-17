"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import type { MotoListing } from "@/contexts/auth-context"

const featuredListings: MotoListing[] = [
  {
    id: "f1",
    title: "Honda CB300R Neo Sports",
    description: "Diseño minimalista con toques retro. Motor monocilíndrico de 286cc, refrigeración líquida.",
    price: 4500,
    images: ["/images/listing-1.jpg"],
    location: "La Habana", // Legacy field, kept for compatibility if needed, but province is key
    province: "La Habana",
    condition: "de_uso",
    category: "moto",
    motoType: "combustion",
    year: "2023",
    displacement: "300cc",
    mileage: "4,500 km",
    userId: "featured",
    createdAt: new Date().toISOString(),
    phone: "",
    status: "active",
    isHighlighted: true,
  },
  {
    id: "f2",
    title: "Suzuki GN125 Custom",
    description: "Clásica y resistente. Modificada estilo café racer ligero.",
    price: 2800,
    images: ["/images/listing-2.jpg"],
    province: "Santiago de Cuba",
    condition: "de_uso",
    category: "moto",
    motoType: "combustion",
    year: "2020",
    displacement: "125cc",
    userId: "featured",
    createdAt: new Date().toISOString(),
    phone: "",
    status: "active",
    businessId: "biz_demo", // Simulating a business listing
  },
  {
    id: "f3",
    title: "Mishozuki Pro Max 2024",
    description: "La eléctrica más potente del mercado. Batería de litio 72V 40Ah.",
    price: 1800,
    images: ["/images/listing-3.jpg"],
    province: "Camagüey",
    condition: "nuevo",
    category: "moto",
    motoType: "electrica",
    watts: "2500W",
    amperage: "40Ah",
    userId: "featured",
    createdAt: new Date().toISOString(),
    phone: "",
    status: "active",
  },
  {
    id: "f4",
    title: "Yamaha XT250 Adventure",
    description: "Lista para cualquier terreno. Suspensión de largo recorrido.",
    price: 3600,
    images: ["/images/listing-4.jpg"],
    province: "Villa Clara",
    condition: "de_uso",
    category: "moto",
    motoType: "combustion",
    year: "2019",
    displacement: "250cc",
    mileage: "15,000 km",
    userId: "featured",
    createdAt: new Date().toISOString(),
    phone: "",
    status: "active",
    isHighlighted: true,
  },
]

export function FeaturedListings() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="destacados"
      ref={sectionRef}
      className="relative bg-surface py-24 md:py-32 border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="font-body text-label font-medium tracking-widest text-accent">
              SELECCION PREMIUM
            </span>
            <h2 className="mt-4 font-heading text-display font-semibold tracking-tight text-white">
              Destacados de la semana
            </h2>
          </div>
          <motion.a
            href="/motos-destacadas"
            className="inline-flex items-center gap-1.5 font-body text-sm font-bold text-accent transition-colors duration-300 hover:text-accent-hover uppercase tracking-wider"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.4 }}
          >
            Ver inventario completo
            <span className="text-lg">&#8594;</span>
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing, i) => (
            <div key={listing.id}>
              <ProductCard moto={listing} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
