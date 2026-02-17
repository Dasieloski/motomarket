"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, MapPin, Eye, MessageCircle, Phone } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { PremiumCard } from "@/components/ui/premium-card"

export default function ProductoPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const { allListings, incrementListingViews, incrementBusinessWhatsAppClick } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const listing = allListings.find((l) => l.id === id)

  useEffect(() => {
    if (listing && id) {
      incrementListingViews(id, listing.businessId)
    }
  }, [id, listing?.id, listing?.businessId, incrementListingViews])

  useEffect(() => {
    if (!listing && allListings.length >= 0 && id) {
      const found = allListings.find((l) => l.id === id)
      if (!found && allListings.length > 0) {
        router.replace("/motos")
      }
    }
  }, [listing, allListings, id, router])

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
        />
      </div>
    )
  }

  const images = listing.images?.length ? listing.images : ["/placeholder-moto.jpg"]
  const conditionLabel = listing.condition === "nuevo" ? "Nuevo" : "De uso"

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-24 pb-12 md:pt-32 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link
            href="/motos"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary-secondary hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al listado
          </Link>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Galería */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <PremiumCard className="overflow-hidden p-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-subtle">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${listing.title} - imagen ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </PremiumCard>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.slice(0, 6).map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-input transition-all ${currentImageIndex === i
                      ? "ring-2 ring-accent ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-badge bg-surface-subtle px-2.5 py-1 text-xs font-body uppercase tracking-wide text-primary-muted">
                {listing.category === "moto"
                  ? listing.motoType === "electrica"
                    ? "Moto eléctrica"
                    : "Moto combustión"
                  : listing.category === "part"
                    ? "Pieza / accesorio"
                    : "Taller / servicio"}
              </span>
              <span className="rounded-badge bg-accent/10 px-2.5 py-1 text-xs font-body font-medium text-accent">
                {conditionLabel}
              </span>
              {listing.province && (
                <span className="flex items-center gap-1 rounded-badge bg-surface-subtle px-2.5 py-1 text-xs font-body text-primary-secondary">
                  <MapPin className="h-3 w-3" />
                  {listing.province}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl font-bold leading-tight text-primary md:text-4xl">
              {listing.title}
            </h1>

            {listing.price > 0 && (
              <p className="font-heading text-3xl font-bold text-accent">
                ${listing.price.toLocaleString()}
              </p>
            )}

            {(listing.views ?? 0) > 0 && (
              <p className="flex items-center gap-1.5 font-body text-sm text-primary-muted">
                <Eye className="h-4 w-4" />
                {listing.views} {listing.views === 1 ? "vista" : "vistas"}
              </p>
            )}

            {/* Especificaciones dinámicas */}
            <PremiumCard className="p-6">
              <h2 className="mb-4 font-heading text-lg font-bold text-primary">
                Especificaciones
              </h2>
              <dl className="space-y-3 font-body text-sm">
                {listing.category === "moto" && (
                  <>
                    {listing.motoType === "electrica" && (
                      <>
                        {listing.amperage && (
                          <div className="flex justify-between">
                            <dt className="text-primary-muted">Amperaje</dt>
                            <dd className="font-medium text-primary">{listing.amperage}</dd>
                          </div>
                        )}
                        {listing.watts && (
                          <div className="flex justify-between">
                            <dt className="text-primary-muted">Potencia (watts)</dt>
                            <dd className="font-medium text-primary">{listing.watts}</dd>
                          </div>
                        )}
                      </>
                    )}
                    {listing.motoType === "combustion" && listing.displacement && (
                      <div className="flex justify-between">
                        <dt className="text-primary-muted">Cilindraje</dt>
                        <dd className="font-medium text-primary">{listing.displacement} cc</dd>
                      </div>
                    )}
                    {listing.brand && (
                      <div className="flex justify-between">
                        <dt className="text-primary-muted">Marca</dt>
                        <dd className="font-medium text-primary">{listing.brand}</dd>
                      </div>
                    )}
                    {listing.model && (
                      <div className="flex justify-between">
                        <dt className="text-primary-muted">Modelo</dt>
                        <dd className="font-medium text-primary">{listing.model}</dd>
                      </div>
                    )}
                    {listing.year && (
                      <div className="flex justify-between">
                        <dt className="text-primary-muted">Año</dt>
                        <dd className="font-medium text-primary">{listing.year}</dd>
                      </div>
                    )}
                    {listing.mileage && (
                      <div className="flex justify-between">
                        <dt className="text-primary-muted">Kilometraje</dt>
                        <dd className="font-medium text-primary">{listing.mileage}</dd>
                      </div>
                    )}
                  </>
                )}
                {listing.category === "part" && (
                  <>
                    {(listing.partForBrand || listing.partForModel) && (
                      <div className="flex justify-between">
                        <dt className="text-primary-muted">Compatible con</dt>
                        <dd className="font-medium text-primary">
                          {[listing.partForBrand, listing.partForModel].filter(Boolean).join(" ")}
                        </dd>
                      </div>
                    )}
                    {listing.partType && (
                      <div className="flex justify-between">
                        <dt className="text-primary-muted">Tipo</dt>
                        <dd className="font-medium text-primary">{listing.partType}</dd>
                      </div>
                    )}
                  </>
                )}
                {listing.category === "service" && listing.serviceType && (
                  <div className="flex justify-between">
                    <dt className="text-primary-muted">Tipo de servicio</dt>
                    <dd className="font-medium text-primary">{listing.serviceType}</dd>
                  </div>
                )}
              </dl>
            </PremiumCard>

            {listing.description && (
              <div>
                <h2 className="mb-2 font-heading text-lg font-bold text-primary">
                  Descripción
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-primary-secondary whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Botones de contacto grandes */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <a
                href={`https://wa.me/${listing.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => listing.businessId && incrementBusinessWhatsAppClick(listing.businessId)}
                className="flex flex-1 items-center justify-center gap-3 rounded-input bg-[#25D366] px-6 py-4 font-body text-base font-medium text-white shadow-card transition-all hover:bg-[#20BA5A] hover:shadow-card-hover"
              >
                <MessageCircle className="h-5 w-5" />
                Contactar por WhatsApp
              </a>
              <a
                href={`tel:${listing.phone}`}
                className="flex flex-1 items-center justify-center gap-3 rounded-input border-2 border-accent bg-surface-elevated px-6 py-4 font-body text-base font-medium text-accent shadow-soft transition-all hover:bg-accent hover:text-white"
              >
                <Phone className="h-5 w-5" />
                Llamar
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
