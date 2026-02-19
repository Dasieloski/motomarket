"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, MapPin, Eye, MessageCircle, Phone, Zap } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import type { Review } from "@/contexts/auth-context"
import { PremiumCard } from "@/components/ui/premium-card"
import { ReviewSection } from "@/components/ui/review-section"
import { MotoComparator } from "@/components/ui/moto-comparator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PremiumButton } from "@/components/ui/premium-button"

// Helper function to generate unique IDs
const generateId = () => `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

export default function ProductoPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const { allListings, incrementListingViews, incrementBusinessWhatsAppClick, getBusinessById, user, updateListing } =
    useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [comparatorOpen, setComparatorOpen] = useState(false)

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

  const handleAddReview = (newReview: Omit<Review, "id" | "createdAt">) => {
    if (!listing) return
    
    const review: Review = {
      ...newReview,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }

    updateListing(listing.id, {
      ...listing,
      reviews: [...(listing.reviews || []), review],
    })
  }

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="w-full max-w-5xl space-y-6">
          <div className="h-4 w-32 rounded-full bg-surface-elevated animate-pulse" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="h-72 w-full rounded-2xl bg-surface-elevated animate-pulse" />
              <div className="flex gap-2">
                <div className="h-16 w-20 rounded-input bg-surface-elevated animate-pulse" />
                <div className="h-16 w-20 rounded-input bg-surface-elevated animate-pulse" />
                <div className="h-16 w-20 rounded-input bg-surface-elevated animate-pulse" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 w-40 rounded-full bg-surface-elevated animate-pulse" />
              <div className="h-8 w-3/4 rounded-full bg-surface-elevated animate-pulse" />
              <div className="h-6 w-32 rounded-full bg-surface-elevated animate-pulse" />
              <div className="h-32 w-full rounded-2xl bg-surface-elevated animate-pulse" />
              <div className="h-12 w-full rounded-input bg-surface-elevated animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const images = listing.images?.length ? listing.images : ["/placeholder-moto.jpg"]
  const conditionLabel = listing.condition === "nuevo" ? "Nuevo" : "De uso"
  const business = listing.businessId ? getBusinessById(listing.businessId) : undefined

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-24 pb-16 md:pt-32 md:pb-20">
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
            className="space-y-3 lg:space-y-4"
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
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
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

          {/* Info + tabs */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 lg:space-y-7"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-center lg:justify-start lg:text-left">
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

            <h1 className="font-heading text-3xl font-bold leading-tight text-primary text-center md:text-4xl lg:text-left">
              {listing.title}
            </h1>

            {listing.price > 0 && (
              <div className="space-y-1 text-center lg:text-left">
                <p className="font-heading text-3xl font-bold text-accent">
                  ${listing.price.toLocaleString()}
                </p>
                <p className="text-sm text-primary-muted">
                  USD
                </p>
              </div>
            )}

            {(listing.views ?? 0) > 0 && (
              <p className="flex items-center justify-center gap-1.5 font-body text-sm text-primary-muted lg:justify-start">
                <Eye className="h-4 w-4" />
                {listing.views} {listing.views === 1 ? "vista" : "vistas"}
              </p>
            )}

            {/* Tabs: especificaciones, descripción, preguntas, historial de precio */}
            <Tabs defaultValue="specs" className="mt-6 w-full mb-6">
              <TabsList className="mx-auto inline-flex h-10 items-center justify-center rounded-full bg-surface-subtle p-1 text-primary-secondary lg:mx-0 flex-wrap gap-1">
                <TabsTrigger
                  value="specs"
                  className="rounded-full px-3.5 py-1.5 text-[11px] md:text-sm data-[state=active]:bg-accent data-[state=active]:text-white"
                >
                  📋 Especificaciones
                </TabsTrigger>
                <TabsTrigger
                  value="description"
                  className="rounded-full px-3.5 py-1.5 text-[11px] md:text-sm data-[state=active]:bg-accent data-[state=active]:text-white"
                >
                  📝 Descripción
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-full px-3.5 py-1.5 text-[11px] md:text-sm data-[state=active]:bg-accent data-[state=active]:text-white"
                >
                  ⭐ Reseñas
                </TabsTrigger>
                <TabsTrigger
                  value="qa"
                  className="rounded-full px-3.5 py-1.5 text-[11px] md:text-sm data-[state=active]:bg-accent data-[state=active]:text-white"
                >
                  💬 Preguntas
                </TabsTrigger>
                <TabsTrigger
                  value="price"
                  className="rounded-full px-3.5 py-1.5 text-[11px] md:text-sm data-[state=active]:bg-accent data-[state=active]:text-white"
                >
                  📊 Historial
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-20 mb-4">
                <PremiumCard className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-heading text-lg font-bold text-primary">
                        Especificaciones técnicas
                      </h2>
                      <p className="mt-1 text-xs font-body text-primary-secondary">
                        Datos clave de la moto para ayudarte a comparar.
                      </p>
                    </div>
                  </div>
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
              </TabsContent>

              <TabsContent value="description" className="mt-20 mb-4">
                {listing.description ? (
                  <div>
                    <h2 className="font-heading text-lg font-bold text-primary">
                      Descripción detallada
                    </h2>
                    <p className="mt-1 text-xs font-body text-primary-secondary">
                      Lee con atención la información que da el vendedor sobre el estado real.
                    </p>
                    <p className="font-body text-[15px] leading-relaxed text-primary-secondary whitespace-pre-wrap">
                      {listing.description}
                    </p>
                  </div>
                ) : (
                  <PremiumCard className="p-4">
                    <p className="font-body text-sm text-primary-secondary">
                      El vendedor aún no ha añadido una descripción detallada para esta publicación.
                    </p>
                  </PremiumCard>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-20 mb-4">
                <ReviewSection
                  reviews={listing.reviews}
                  onAddReview={handleAddReview}
                  isLoggedIn={!!user}
                />
              </TabsContent>

              <TabsContent value="qa" className="mt-20 mb-4">
                <PremiumCard className="p-5">
                  <h2 className="font-heading text-base font-bold text-primary">
                    Preguntas y respuestas
                  </h2>
                  <p className="mt-1 text-xs font-body text-primary-secondary">
                    Aquí verás dudas frecuentes y respuestas del vendedor sobre esta moto.
                  </p>
                  <p className="font-body text-sm text-primary-secondary">
                    Próximamente podrás hacer preguntas al vendedor directamente desde aquí y ver
                    las respuestas frecuentes de otros compradores.
                  </p>
                </PremiumCard>
              </TabsContent>

              <TabsContent value="price" className="mt-20 mb-4">
                <PremiumCard className="p-5">
                  <h2 className="font-heading text-base font-bold text-primary">
                    Historial de precio
                  </h2>
                  <p className="mt-1 text-xs font-body text-primary-secondary">
                    Seguimiento de cambios en el precio de esta publicación a lo largo del tiempo.
                  </p>
                  <p className="font-body text-sm text-primary-secondary">
                    Aún no hay cambios de precio registrados para esta publicación. Cuando el
                    vendedor ajuste el precio, verás aquí el historial para tomar una mejor decisión.
                  </p>
                </PremiumCard>
              </TabsContent>
            </Tabs>

            {/* Métodos de pago disponibles */}
            {listing.paymentMethods && listing.paymentMethods.length > 0 && (
              <PremiumCard className="mt-4 p-5 bg-accent/5 border border-accent/20">
                <h3 className="font-heading text-sm font-bold text-primary mb-3">
                  💳 Métodos de pago aceptados
                </h3>
                <div className="flex flex-wrap gap-2">
                  {listing.paymentMethods.map((method) => (
                    <div 
                      key={method}
                      className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1.5 text-xs font-body font-medium text-accent"
                    >
                      {method === "transferencia_cup" && "💸 Transferencia CUP"}
                      {method === "efectivo_cup" && "💵 Efectivo CUP"}
                      {method === "pago_exterior" && "🌍 Pago exterior"}
                    </div>
                  ))}
                </div>
              </PremiumCard>
            )}

            {/* Botones de contacto grandes + comparador */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row mb-16">
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
              <button
                onClick={() => setComparatorOpen(true)}
                className="flex flex-1 items-center justify-center gap-3 rounded-input border-2 border-accent bg-accent px-6 py-4 font-body text-base font-medium text-white shadow-card transition-all hover:bg-accent/80 hover:text-white"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                Comparar motos
              </button>
            </div>

            {/* Información del vendedor */}
            <PremiumCard className="mt-2 p-5">
              <h2 className="mb-3 font-heading text-base font-bold text-primary">
                Información del vendedor
              </h2>
              {business ? (
                <div className="space-y-2 font-body text-sm">
                  <p className="font-medium text-primary">
                    {business.name}
                    <span className="ml-2 inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                      Cuenta verificada
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5 text-primary-secondary">
                    <MapPin className="h-3 w-3" />
                    {business.province}
                  </p>
                  <p className="text-xs text-primary-muted">
                    Miembro desde {new Date(business.createdAt).toLocaleDateString("es-ES")}
                  </p>
                  <Link
                    href={`/negocio/${business.slug}`}
                    className="inline-flex text-xs font-medium text-accent hover:underline"
                  >
                    Ver más publicaciones del vendedor
                  </Link>
                </div>
              ) : (
                <p className="font-body text-sm text-primary-secondary">
                  Publicación de un vendedor particular. Usa WhatsApp o llamada para coordinar
                  detalles de la moto en Cuba.
                </p>
              )}
            </PremiumCard>
          </motion.div>
        </div>
      </main>

      {/* Sticky CTA inferior para móvil solo WhatsApp y Llamar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-5xl gap-3">
          <a
            href={`https://wa.me/${listing.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => listing.businessId && incrementBusinessWhatsAppClick(listing.businessId)}
            className="flex flex-1 items-center justify-center gap-2 rounded-input bg-[#25D366] px-4 py-2.5 font-body text-sm font-medium text-white shadow-card"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`tel:${listing.phone}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-input border border-accent bg-surface-elevated px-4 py-2.5 font-body text-sm font-medium text-accent shadow-soft"
          >
            <Phone className="h-4 w-4" />
            Llamar
          </a>
        </div>
      </div>

      {/* Comparador Modal */}
      <MotoComparator
        currentMoto={listing}
        allMotos={allListings}
        isOpen={comparatorOpen}
        onClose={() => setComparatorOpen(false)}
      />

      <Footer />
    </div>
  )
}
