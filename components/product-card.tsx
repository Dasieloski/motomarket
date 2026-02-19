"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AnimatedIcon } from "@/components/ui/animated-icon"
import {
  Heart,
  MapPin,
  Eye,
  Settings,
  Zap,
  Battery,
  Layers,
  Wrench,
  ArrowUpRight
} from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import type { MotoListing } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  moto: MotoListing
  index: number
}

function getCategoryLabel(moto: MotoListing): string {
  if (moto.category === "moto")
    return moto.motoType === "electrica" ? "E-MOTO" : "MOTOR"
  if (moto.category === "part") return "PIEZA"
  return "TALLER"
}

// Tech-Spec Data Row Component
function SpecRow({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between py-1 border-b border-white/[0.04] last:border-0">
      <div className="flex items-center gap-1.5 text-secondary">
        <Icon className="w-3 h-3" />
        <span className="text-[10px] uppercase tracking-wider font-medium">{label}</span>
      </div>
      <span className="text-xs font-medium text-primary font-mono">{value}</span>
    </div>
  )
}

export function ProductCard({ moto, index }: ProductCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [isFavorite, setIsFavorite] = useState(false)
  const { getBusinessById, allListings } = useAuth()
  const business = moto.businessId ? getBusinessById(moto.businessId) : undefined

  const categoryLabel = getCategoryLabel(moto)

  const createdAtDate = moto.createdAt ? new Date(moto.createdAt) : null
  const daysSinceCreated =
    createdAtDate && !Number.isNaN(createdAtDate.getTime())
      ? (Date.now() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24)
      : null

  const isNewListing = moto.condition === "nuevo" && daysSinceCreated !== null && daysSinceCreated <= 7

  const similarListings = allListings.filter((listing) => {
    if (listing.id === moto.id) return false
    if (listing.category !== moto.category) return false
    if (listing.category === "moto" && listing.motoType && moto.motoType) {
      return listing.motoType === moto.motoType
    }
    return listing.price > 0
  })

  const averagePrice =
    similarListings.length > 0
      ? similarListings.reduce((sum, l) => sum + (l.price || 0), 0) /
        similarListings.length
      : null

  const isGoodPrice =
    averagePrice !== null &&
    moto.price > 0 &&
    similarListings.length >= 3 &&
    moto.price <= averagePrice * 0.9

  // Format price - Always USD
  const priceDisplay = moto.price > 0
    ? `$${moto.price.toLocaleString()}`
    : "CONSULTAR"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1], // expo.out
      }}
      className="group h-full w-full"
    >
      <Link href={`/producto/${moto.id}`} className="block h-full w-full">
        <article className="relative flex flex-col h-full bg-surface-card border border-border transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_30px_-5px_var(--accent-muted)] overflow-hidden">

          {/* === IMAGE COMPARTMENT === */}
          <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden bg-surface-elevated border-b border-border">
            <Image
              src={moto.images?.[0] || "/placeholder-moto.jpg"}
              alt={moto.title}
              fill
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-card/60 via-transparent to-transparent opacity-60" />

            {/* Status & meta badges - Top Left */}
            <div className="absolute top-0 left-0 flex flex-col gap-1 p-2">
              <div className="inline-flex items-center gap-1 rounded-full bg-surface-card/90 backdrop-blur-md px-3 py-1 border border-border text-[10px] font-bold tracking-widest uppercase text-white">
                <span>{categoryLabel}</span>
                {moto.condition === "nuevo" && (
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[9px] font-semibold text-accent">
                    Nuevo
                  </span>
                )}
              </div>

              {isGoodPrice && (
                <div className="inline-flex items-center rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white shadow-soft">
                  Buen precio
                </div>
              )}
            </div>

            {/* Favorite Action - Top Right */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                const next = !isFavorite
                setIsFavorite(next)
                if (next) {
                  toast({
                    title: "Publicación guardada en favoritos",
                    description: "Más adelante podrás gestionar tus favoritos desde tu cuenta.",
                  })
                }
              }}
              className="absolute top-0 right-0 p-2 text-white/70 hover:text-accent transition-colors z-20"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>

          {/* === TECH SPEC COMPARTMENT === */}
          <div className="flex flex-col flex-1 p-2 md:p-3 gap-1 md:gap-2">

            {/* Head */}
            <div className="space-y-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-heading text-xs md:text-base leading-tight text-white group-hover:text-accent transition-colors line-clamp-2">
                  {moto.title}
                </h3>
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-secondary group-hover:text-accent opacity-0 md:group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0" />
              </div>

              <div className="flex flex-wrap items-center gap-1 text-secondary text-[9px] md:text-[10px] uppercase tracking-wide">
                <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span>{moto.province || "Cuba"}</span>
                {moto.year && (
                  <>
                    <span className="mx-1 text-[8px] text-secondary/60">•</span>
                    <span>{moto.year}</span>
                  </>
                )}
                {moto.mileage && (
                  <>
                    <span className="mx-1 text-[8px] text-secondary/60">•</span>
                    <span>{moto.mileage}</span>
                  </>
                )}
              </div>
            </div>

            {/* Specs Grid (Mini Table) - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block mt-auto bg-surface-elevated/50 p-2 rounded-sm border border-white/[0.02]">
              {moto.category === 'moto' && moto.motoType === 'combustion' && (
                <>
                  <SpecRow icon={Settings} label="Motor" value={moto.displacement ? `${moto.displacement}` : '-'} />
                  <SpecRow icon={Layers} label="Año" value={moto.year || '-'} />
                </>
              )}
              {moto.category === 'moto' && moto.motoType === 'electrica' && (
                <>
                  <SpecRow icon={Zap} label="Potencia" value={moto.watts ? `${moto.watts}W` : '-'} />
                  <SpecRow icon={Battery} label="Batería" value={moto.amperage ? `${moto.amperage}Ah` : '-'} />
                </>
              )}
              {(moto.category === 'part' || moto.category === 'service') && (
                <SpecRow icon={Wrench} label="Tipo" value={moto.category === 'part' ? 'Repuesto' : moto.serviceType || 'Servicio'} />
              )}
            </div>

            {/* Footer / Price */}
            <div className="mt-auto md:mt-0 pt-1.5 md:pt-2 border-t border-border flex items-center justify-between">
              <div className="flex flex-col">
                <span className="hidden md:block text-[10px] text-secondary uppercase tracking-widest">Precio</span>
                <span className="font-mono text-sm md:text-lg text-accent font-medium">
                  {priceDisplay}
                </span>
              </div>

              {business && (
                <div className="px-1.5 py-0.5 md:px-2 md:py-1 bg-prussian/30 border border-prussian-light rounded-sm text-[8px] md:text-[10px] text-prussian-lighter uppercase font-bold tracking-wide">
                  PRO
                </div>
              )}
            </div>

          </div>
        </article>
      </Link>
    </motion.div>
  )
}
