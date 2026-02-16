"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Eye,
  Heart,
  Gauge,
  Calendar,
  Zap,
  Battery,
  Package,
  Wrench,
  ChevronRight,
} from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import type { MotoListing } from "@/contexts/auth-context"

interface ProductCardProps {
  moto: MotoListing
  index: number
}

function getCategoryLabel(moto: MotoListing): string {
  if (moto.category === "moto")
    return moto.motoType === "electrica" ? "Eléctrica" : "Combustión"
  if (moto.category === "part") return "Pieza"
  return "Servicio"
}

const overlayTextClass = "text-white/90"

function QuickSpecs({ moto }: { moto: MotoListing }) {
  if (moto.category === "moto" && moto.motoType === "combustion") {
    const parts = [
      moto.displacement && { icon: Gauge, label: moto.displacement },
      moto.mileage && { icon: Gauge, label: moto.mileage },
      moto.year && { icon: Calendar, label: moto.year },
    ].filter(Boolean) as { icon: typeof Gauge; label: string }[]
    if (parts.length === 0) return <SpecFallback condition={moto.condition} />
    return (
      <div className={`flex flex-wrap items-center gap-3 text-[11px] ${overlayTextClass}`}>
        {parts.map(({ icon: Icon, label }, i) => (
          <span key={i} className="flex items-center gap-1">
            <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
            {label}
          </span>
        ))}
      </div>
    )
  }
  if (moto.category === "moto" && moto.motoType === "electrica") {
    const parts = [
      moto.watts && { icon: Zap, label: moto.watts },
      moto.amperage && { icon: Battery, label: moto.amperage },
    ].filter(Boolean) as { icon: typeof Zap; label: string }[]
    if (parts.length === 0) return <SpecFallback condition={moto.condition} />
    return (
      <div className={`flex flex-wrap items-center gap-3 text-[11px] ${overlayTextClass}`}>
        {parts.map(({ icon: Icon, label }, i) => (
          <span key={i} className="flex items-center gap-1">
            <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
            {label}
          </span>
        ))}
      </div>
    )
  }
  if (moto.category === "part") {
    const compat = [moto.partForBrand, moto.partForModel].filter(Boolean).join(" ")
    if (!compat) return <SpecFallback condition={moto.condition} />
    return (
      <div className={`flex items-center gap-1.5 text-[11px] ${overlayTextClass}`}>
        <Package className="h-3.5 w-3.5 shrink-0 opacity-80" />
        <span className="truncate">Compat: {compat}</span>
      </div>
    )
  }
  if (moto.category === "service" && moto.serviceType) {
    return (
      <div className={`flex items-center gap-1.5 text-[11px] ${overlayTextClass}`}>
        <Wrench className="h-3.5 w-3.5 shrink-0 opacity-80" />
        <span className="truncate">{moto.serviceType}</span>
      </div>
    )
  }
  return <SpecFallback condition={moto.condition} />
}

function SpecFallback({ condition }: { condition?: "nuevo" | "de_uso" }) {
  if (!condition) return null
  return (
    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-body text-white/95 backdrop-blur-sm">
      {condition === "nuevo" ? "Nuevo" : "De uso"}
    </span>
  )
}

export function ProductCard({ moto, index }: ProductCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { getBusinessById } = useAuth()
  const business = moto.businessId ? getBusinessById(moto.businessId) : undefined

  const categoryLabel = getCategoryLabel(moto)
  const hasMultipleImages = (moto.images?.length ?? 0) > 1
  const views = moto.views ?? 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.35),
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
    >
      <Link href={`/producto/${moto.id}`} className="block h-full">
        <motion.article
          className="relative flex h-[300px] flex-col overflow-hidden rounded-[20px] border border-white/[0.06] bg-surface-card shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-accent/20 sm:h-[320px] md:rounded-[24px]"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* 1. Imagen a fondo completo (ocupa todo el card) */}
          <div className="absolute inset-0 bg-surface-card">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-6 w-6 rounded-full border-2 border-white border-t-transparent"
                />
              </div>
            )}
            <Image
              src={moto.images?.[0] || "/placeholder-moto.jpg"}
              alt={moto.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>

          {/* 2. Overlay en degradado: transparente arriba → oscuro abajo (sin bloque sólido) */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
            aria-hidden
          />

          {/* 3. Contenido superpuesto sobre la imagen (encima del overlay) */}
          <div className="relative z-10 flex flex-1 flex-col justify-between p-3 sm:p-4">
            {/* Parte superior: badge + favorito */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-black/60 px-2.5 py-1 font-body text-[10px] font-medium uppercase tracking-wide text-white shadow-soft backdrop-blur-sm">
                  {categoryLabel}
                </span>
                {business && (
                  <span className="rounded-full bg-accent/90 px-2 py-0.5 font-body text-[9px] font-medium text-black shadow-soft">
                    Negocio
                  </span>
                )}
              </div>
              <motion.button
                type="button"
                aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsFavorite((f) => !f)
                }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur-sm transition-colors hover:bg-white"
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-primary-muted"}`}
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Parte inferior: título, provincia, specs, precio, botón (todo sobre el degradado) */}
            <div className="mt-auto space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="min-w-0 flex-1 font-display text-[13px] font-bold leading-tight text-white drop-shadow-sm line-clamp-2 sm:text-sm">
                  {moto.title}
                </h3>
                {moto.price > 0 && (
                  <span className="shrink-0 font-display text-sm font-bold text-white drop-shadow-sm sm:text-base">
                    ${moto.price.toLocaleString()}
                  </span>
                )}
                {moto.price === 0 && (
                  <span className="shrink-0 font-body text-xs font-medium text-white/90">
                    Consultar
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="flex items-center gap-1 truncate text-white/90">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {moto.province ?? "—"}
                </span>
                {views > 0 && (
                  <span className="flex items-center gap-1 text-white/80">
                    <Eye className="h-3 w-3" />
                    {views} vistas
                  </span>
                )}
              </div>
              <div className="min-h-[18px]">
                <QuickSpecs moto={moto} />
              </div>
              <motion.span
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-accent/90 py-2.5 font-body text-sm font-semibold text-black shadow-soft backdrop-blur-sm transition-colors hover:bg-accent sm:rounded-[16px] sm:py-3 sm:text-[15px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver detalles
                <ChevronRight className="h-4 w-4" />
              </motion.span>
            </div>
          </div>

          {/* Dots si hay varias imágenes */}
          {hasMultipleImages && (
            <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {moto.images!.slice(0, 5).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-1 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          )}
        </motion.article>
      </Link>
    </motion.div>
  )
}
