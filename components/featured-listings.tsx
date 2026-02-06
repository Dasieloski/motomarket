"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { MapPin, Star, BadgeCheck } from "lucide-react"

const listings = [
  {
    title: "Honda CB300R",
    price: "$4,500",
    location: "La Habana",
    rating: 4.9,
    verified: true,
    image: "/images/listing-1.jpg",
    badge: "Verificado",
  },
  {
    title: "Suzuki GN125",
    price: "$2,800",
    location: "Santiago de Cuba",
    rating: 4.7,
    verified: true,
    image: "/images/listing-2.jpg",
    badge: "Empresa",
  },
  {
    title: "Mishozuki Pro",
    price: "$1,200",
    location: "Camaguey",
    rating: 4.5,
    verified: false,
    image: "/images/listing-3.jpg",
    badge: null,
  },
  {
    title: "Yamaha XT250",
    price: "$3,600",
    location: "Villa Clara",
    rating: 4.8,
    verified: true,
    image: "/images/listing-4.jpg",
    badge: "Verificado",
  },
]

export function FeaturedListings() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="destacados" ref={ref} className="relative bg-foreground py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-background/50">
              Seleccion destacada
            </span>
            <h2 className="mt-4 text-balance text-3xl font-light tracking-tight text-background sm:text-4xl md:text-5xl">
              Anuncios destacados
            </h2>
          </div>
          <a
            href="#"
            className="shrink-0 text-sm font-medium text-background/70 transition-colors hover:text-background"
          >
            Ver todos &#8594;
          </a>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing, i) => (
            <motion.a
              key={listing.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                />
                {listing.badge && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
                      {listing.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-background">
                    {listing.title}
                  </h3>
                  {listing.verified && (
                    <BadgeCheck className="h-4 w-4 shrink-0 text-background/50" />
                  )}
                </div>
                <p className="mt-1 text-lg font-medium text-background/90">
                  {listing.price}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-background/50">
                    <MapPin className="h-3 w-3" />
                    {listing.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-background/50">
                    <Star className="h-3 w-3" />
                    {listing.rating}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
