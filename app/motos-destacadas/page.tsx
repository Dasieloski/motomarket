"use client"

import { motion } from "framer-motion"
import Link from "next/link"

import { ProductCard } from "@/components/product-card"
import { PremiumCard } from "@/components/ui/premium-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"

const DESTACADAS_LIMIT = 6

export default function MotosDestacadasPage() {
  const { allListings } = useAuth()
  const allMotos = allListings.slice(0, DESTACADAS_LIMIT)

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
            Motos destacadas
          </h1>
          <p className="mt-4 font-body text-lg text-primary-secondary">
            Descubre las mejores motos disponibles en el mercado
          </p>
        </motion.div>

        {/* Grid: 2 cols en todos los breakpoints, espaciado consistente */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-3">
          {allMotos.map((moto, index) => (
            <ProductCard key={moto.id} moto={moto} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <PremiumCard className="p-12">
            <h2 className="font-display text-2xl font-bold text-primary">
              ¿Quieres vender tu moto?
            </h2>
            <p className="mt-2 font-body text-primary-secondary">
              Únete a nuestra comunidad y publica tu anuncio
            </p>
            <Link href="/vender" className="mt-6 inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-button bg-accent px-8 py-3 font-body font-medium text-white shadow-card transition-colors hover:bg-accent-hover"
              >
                Publicar mi moto
              </motion.button>
            </Link>
          </PremiumCard>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
