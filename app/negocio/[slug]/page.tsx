"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { MapPin, MessageCircle, ChevronLeft } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { ProductCard } from "@/components/product-card"

export default function NegocioPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { getBusinessBySlug, getBusinessById, allListings, incrementBusinessWhatsAppClick } =
    useAuth()

  const business = slug ? getBusinessBySlug(slug) ?? getBusinessById(slug) : undefined
  const businessListings = business
    ? allListings.filter((l) => l.businessId === business.id)
    : []

  if (!business) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface">
        <Navbar />
        <div className="px-6 py-24 text-center">
          <p className="font-body text-lg text-primary-secondary">
            Negocio no encontrado.
          </p>
          <Link href="/motos" className="mt-4 inline-block font-body font-medium text-accent hover:underline">
            Volver al listado
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const whatsappUrl = `https://wa.me/${business.phone.replace(/\D/g, "")}`

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/motos"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary-secondary hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al listado
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6 rounded-[24px] border border-border bg-surface-elevated p-6 shadow-soft md:flex-row md:items-center md:gap-8 md:p-8"
        >
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-subtle md:h-28 md:w-28">
            {business.logo ? (
              <Image
                src={business.logo}
                alt={business.name}
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-display text-3xl font-bold text-accent md:text-4xl">
                {business.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-primary md:text-3xl">
                {business.name}
              </h1>
              <span className="rounded-full bg-accent/15 px-3 py-1 font-body text-xs font-semibold text-accent">
                Negocio Verificado
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 font-body text-primary-secondary">
              <MapPin className="h-4 w-4 shrink-0" />
              {business.province}
            </p>
            {business.description && (
              <p className="mt-3 font-body text-sm leading-relaxed text-primary-secondary">
                {business.description}
              </p>
            )}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => incrementBusinessWhatsAppClick(business.id)}
            className="flex shrink-0 items-center justify-center gap-2 rounded-button bg-[#25D366] px-6 py-3 font-body font-semibold text-white shadow-soft transition-colors hover:bg-[#20BA5A]"
          >
            <MessageCircle className="h-5 w-5" />
            Contactar por WhatsApp
          </a>
        </motion.header>

        {businessListings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="mb-6 font-display text-xl font-bold text-primary md:text-2xl">
              Publicaciones ({businessListings.length})
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-3">
              {businessListings.map((listing, index) => (
                <ProductCard key={listing.id} moto={listing} index={index} />
              ))}
            </div>
          </motion.section>
        )}

        {businessListings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-12 rounded-[20px] border border-border bg-surface-elevated p-12 text-center"
          >
            <p className="font-body text-primary-secondary">
              Este negocio aún no tiene publicaciones.
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
