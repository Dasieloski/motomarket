"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
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

const easeSmooth = [0.4, 0, 0.2, 1] as const

function ListingCard({
  listing,
  index,
}: {
  listing: (typeof listings)[0]
  index: number
}) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: easeSmooth }}
      className="group relative overflow-hidden rounded-card border border-white/[0.06] bg-surface-card shadow-soft transition-all duration-smooth hover:shadow-card hover:border-accent/20"
      whileHover={{ y: -6 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.image || "/placeholder.svg"}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-smooth group-hover:scale-[1.03]"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-card/60 to-transparent opacity-0 transition-opacity duration-smooth group-hover:opacity-100" />
        {listing.badge && (
          <span className="absolute left-4 top-4 rounded-badge border border-accent/20 bg-accent/15 px-3 py-1 font-sans text-xs font-medium tracking-wide text-accent backdrop-blur-sm">
            {listing.badge}
          </span>
        )}
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body text-lg font-medium text-white transition-colors duration-smooth group-hover:text-accent">
            {listing.title}
          </h3>
          {listing.verified && (
            <BadgeCheck className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
          )}
        </div>
        <p className="mt-2 font-display text-xl font-semibold text-white">
          {listing.price}
        </p>
        <div className="mt-3 flex items-center gap-4 font-body text-sm text-primary-secondary">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-accent/60 text-accent/60" />
            {listing.rating}
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export function FeaturedListings() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="destacados"
      ref={sectionRef}
      className="relative bg-surface py-24 md:py-32"
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
              SELECCION DESTACADA
            </span>
            <h2 className="mt-4 font-heading text-display font-semibold tracking-tight text-white">
              Anuncios destacados
            </h2>
          </div>
          <motion.a
            href="#"
            className="inline-flex items-center gap-1.5 font-body text-base font-medium text-accent transition-colors duration-smooth hover:text-accent-hover"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.4 }}
          >
            Ver todos
            <span className="text-lg">&#8594;</span>
          </motion.a>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {listings.map((listing, i) => (
            <ListingCard key={listing.title} listing={listing} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
