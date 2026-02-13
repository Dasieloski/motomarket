"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Bike, LogOut, Eye, Building2, BarChart3, MessageCircle, Calendar, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { useAuth } from "@/contexts/auth-context"
import { getPlanById } from "@/lib/business"
import { PremiumButton } from "@/components/ui/premium-button"
import { PremiumCard } from "@/components/ui/premium-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactButtons } from "@/components/contact-buttons"

export default function DashboardPage() {
  const router = useRouter()
  const { user, listings, isLoading, logout, deleteListing, updateListing, getBusinessByUserId } = useAuth()
  const business = user ? getBusinessByUserId(user.id) : undefined
  const planConfig = business ? getPlanById(business.planId) : undefined

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
        />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = useMemo(() => {
    const totalPublications = listings.length
    const totalViews = listings.reduce((acc, l) => acc + (l.views ?? 0), 0)
    const active = listings.filter((l) => (l.status ?? "active") === "active").length
    return { totalPublications, totalViews, active }
  }, [listings])

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
                Mi cuenta
              </h1>
              <p className="mt-2 font-body text-[15px] text-primary-secondary">
                Gestiona tus publicaciones y ventas
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/vender">
                <PremiumButton>
                  <Plus className="h-4 w-4" />
                  Vender mi moto
                </PremiumButton>
              </Link>
              <PremiumButton variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </PremiumButton>
            </div>
          </div>
        </motion.div>

        {/* User Info + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]"
        >
          <PremiumCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-primary/20">
                <span className="font-display text-2xl font-bold text-accent">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-primary">
                  {user.name}
                </h2>
                <p className="font-body text-sm text-primary-secondary">{user.email}</p>
                <p className="mt-1 font-body text-xs text-primary-muted">
                  Gestiona tus publicaciones para el mercado de motos en Cuba.
                </p>
              </div>
            </div>
          </PremiumCard>

          <PremiumCard className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-body uppercase tracking-wide text-primary-muted">
                  Publicaciones
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-primary">
                  {stats.totalPublications}
                </p>
              </div>
              <div>
                <p className="text-xs font-body uppercase tracking-wide text-primary-muted">
                  Vistas totales
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-primary flex items-center gap-1">
                  <Eye className="h-4 w-4 text-primary-muted" />
                  {stats.totalViews}
                </p>
              </div>
              <div>
                <p className="text-xs font-body uppercase tracking-wide text-primary-muted">
                  Activas
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-primary">
                  {stats.active}
                </p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>

        {/* Sección Negocio (si tiene cuenta empresarial) */}
        {business && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12"
          >
            <PremiumCard className="overflow-hidden border-2 border-accent/20 p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                    <Building2 className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-xl font-bold text-primary">
                        {business.name}
                      </h2>
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-body text-xs font-semibold text-accent">
                        Negocio Verificado
                      </span>
                    </div>
                    <p className="mt-1 font-body text-sm text-primary-secondary">
                      Plan {planConfig?.name ?? business.planId} · Vence{" "}
                      {new Date(business.planExpiresAt).toLocaleDateString("es-CU")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={`/negocio/${business.slug}`}>
                    <motion.span
                      className="inline-flex items-center gap-2 rounded-button border-2 border-accent bg-transparent px-4 py-2 font-body text-sm font-semibold text-accent hover:bg-accent/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Ver perfil público
                    </motion.span>
                  </Link>
                  <Link href="/para-negocios#planes">
                    <motion.span
                      className="inline-flex items-center gap-2 rounded-button bg-accent px-4 py-2 font-body text-sm font-semibold text-white hover:bg-accent-hover"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="h-4 w-4" />
                      Mejorar plan
                    </motion.span>
                  </Link>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-subtle">
                    <Eye className="h-5 w-5 text-primary-muted" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-primary-muted">Vistas totales</p>
                    <p className="font-display text-lg font-bold text-primary">
                      {business.totalViews + listings.reduce((a, l) => a + (l.views ?? 0), 0)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-subtle">
                    <MessageCircle className="h-5 w-5 text-primary-muted" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-primary-muted">Clics WhatsApp</p>
                    <p className="font-display text-lg font-bold text-primary">
                      {business.totalWhatsAppClicks}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-subtle">
                    <BarChart3 className="h-5 w-5 text-primary-muted" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-primary-muted">Publicaciones</p>
                    <p className="font-display text-lg font-bold text-primary">
                      {listings.length}
                      {planConfig?.maxListings != null && (
                        <span className="font-body text-sm font-normal text-primary-muted">
                          /{planConfig.maxListings}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-subtle">
                    <Calendar className="h-5 w-5 text-primary-muted" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-primary-muted">Plan vence</p>
                    <p className="font-display text-sm font-bold text-primary">
                      {new Date(business.planExpiresAt).toLocaleDateString("es-CU")}
                    </p>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </motion.div>
        )}

        {/* Listings */}
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold text-primary">
            Mis publicaciones ({listings.length})
          </h2>

          {listings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PremiumCard className="p-12 text-center">
                <Bike className="mx-auto h-16 w-16 text-primary-muted" />
                <h3 className="mt-4 font-display text-xl font-bold text-primary">
                  No tienes publicaciones aún
                </h3>
                <p className="mt-2 font-body text-sm text-primary-secondary">
                  Comienza a vender tu primera moto
                </p>
                <Link href="/vender" className="mt-6 inline-block">
                  <PremiumButton>
                    <Plus className="h-4 w-4" />
                    Crear publicación
                  </PremiumButton>
                </Link>
              </PremiumCard>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {listings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
                >
                  <PremiumCard className="overflow-hidden">
                    <Link href={`/producto/${listing.id}`} className="block">
                      <div className="relative h-40 w-full overflow-hidden md:h-48">
                        <Image
                          src={listing.images[0] || "/placeholder-moto.jpg"}
                          alt={listing.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="font-display text-base font-bold text-primary line-clamp-1 md:text-lg">
                          {listing.title}
                        </h3>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-xs font-body text-primary-muted">
                          <span className="rounded-badge bg-surface-subtle px-2 py-0.5 text-[11px] uppercase tracking-wide">
                            {(listing.category ?? "moto") === "moto"
                              ? "Moto"
                              : (listing.category ?? "moto") === "part"
                                ? "Pieza / accesorio"
                                : "Taller / servicio"}
                          </span>
                          <span className="rounded-badge bg-surface-subtle px-2 py-0.5 text-[11px] uppercase tracking-wide">
                            {(listing.status ?? "active") === "active"
                              ? "Activa"
                              : (listing.status ?? "active") === "pending"
                                ? "Pendiente"
                                : "Vendida"}
                          </span>
                          {listing.province && (
                            <span className="rounded-badge bg-surface-subtle px-2 py-0.5 text-[11px]">
                              {listing.province}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-[11px] text-primary-secondary">
                            <Eye className="h-3 w-3" />
                            {listing.views ?? 0} vistas
                          </span>
                        </p>
                        <p className="mt-2 font-body text-sm text-primary-secondary line-clamp-2">
                          {listing.description}
                        </p>
                        {listing.price > 0 && (
                          <div className="mt-3 md:mt-4">
                            <span className="font-display text-lg font-bold text-accent md:text-xl">
                              ${listing.price.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                    {listing.phone && (
                      <div className="border-t border-border px-4 py-2 md:px-6">
                        <ContactButtons phone={listing.phone} />
                      </div>
                    )}
                    <div className="flex items-center justify-end gap-2 border-t border-border p-2 md:p-3">
                      <Link
                        href={`/producto/${listing.id}`}
                        className="rounded-input px-3 py-1.5 text-sm font-body text-accent transition-colors hover:bg-accent/10"
                      >
                        Ver publicación
                      </Link>
                      {business && (
                        <button
                          type="button"
                          onClick={() => updateListing(listing.id, { isHighlighted: !listing.isHighlighted })}
                          className="rounded-input px-3 py-1.5 text-sm font-body text-primary-muted transition-colors hover:bg-accent/10 hover:text-accent"
                        >
                          {listing.isHighlighted ? "Quitar destacado" : "Destacar"}
                        </button>
                      )}
                      <button
                        onClick={() => router.push(`/vender?edit=${listing.id}`)}
                        className="rounded-input p-2 text-primary-secondary transition-colors hover:bg-surface-subtle hover:text-accent"
                        type="button"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("¿Estás seguro de eliminar esta publicación?")) {
                            deleteListing(listing.id)
                          }
                        }}
                        className="rounded-input p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
