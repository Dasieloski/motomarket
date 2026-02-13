"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

import { ProductCard } from "@/components/product-card"
import { PremiumCard } from "@/components/ui/premium-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { PROVINCIAS_CUBA } from "@/contexts/auth-context"
import type { ListingCategory, ProductCondition } from "@/contexts/auth-context"

const ITEMS_PER_PAGE = 6

export default function MotosPage() {
  const { allListings } = useAuth()
  const [selectedFilter, setSelectedFilter] = useState<ListingCategory | "all">("all")
  const [provinceFilter, setProvinceFilter] = useState<string>("all")
  const [conditionFilter, setConditionFilter] = useState<ProductCondition | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const allMotos = allListings

  const filteredMotos = allMotos.filter((moto) => {
    if (selectedFilter !== "all" && moto.category !== selectedFilter) return false
    if (provinceFilter !== "all" && (moto.province ?? "") !== provinceFilter) return false
    if (conditionFilter !== "all" && (moto.condition ?? "de_uso") !== conditionFilter) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filteredMotos.length / ITEMS_PER_PAGE))
  const paginatedMotos = filteredMotos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedFilter, provinceFilter, conditionFilter])

  const filters = [
    { id: "all" as const, label: "Todas" },
    { id: "moto" as const, label: "Motos" },
    { id: "part" as const, label: "Piezas" },
    { id: "service" as const, label: "Servicios" },
  ]

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:mb-12"
        >
          <h1 className="font-display text-3xl font-bold text-primary md:text-5xl">
            Ver todas las motos
          </h1>
          <p className="mt-3 font-body text-base text-primary-secondary md:text-lg">
            Explora todas las publicaciones disponibles
          </p>
        </motion.div>

        {/* Filtros desktop */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 hidden flex-wrap justify-center gap-3 md:flex"
        >
          {filters.map((f) => (
            <motion.button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-button border-2 px-5 py-2.5 font-body text-sm font-medium transition-all ${
                selectedFilter === f.id
                  ? "border-accent bg-accent text-white shadow-card"
                  : "border-border bg-surface-elevated text-primary-secondary hover:border-accent/60"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Botón filtros móvil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex justify-center md:hidden"
        >
          <motion.button
            onClick={() => setMobileFiltersOpen(true)}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-button border-2 border-border bg-surface-elevated px-5 py-2.5 font-body text-sm font-medium text-primary shadow-soft"
          >
            Filtros
          </motion.button>
        </motion.div>

        {/* Drawer filtros móvil */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileFiltersOpen(false)}
                className="fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm md:hidden"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-auto rounded-t-card border-t border-border bg-surface-elevated p-6 shadow-card md:hidden"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-primary">Filtros</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="rounded-input p-2 text-primary-muted hover:bg-surface-subtle"
                  >
                    Cerrar
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 font-body text-sm font-medium text-primary-secondary">Tipo</p>
                    <div className="flex flex-wrap gap-2">
                      {filters.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSelectedFilter(f.id)}
                          className={`rounded-input border px-3 py-1.5 text-sm font-body ${
                            selectedFilter === f.id
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border bg-surface text-primary-secondary"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-body text-sm font-medium text-primary-secondary">Provincia</p>
                    <select
                      value={provinceFilter}
                      onChange={(e) => setProvinceFilter(e.target.value)}
                      className="w-full rounded-input border border-border bg-surface-elevated px-4 py-2.5 font-body text-sm text-primary"
                    >
                      <option value="all">Todas</option>
                      {PROVINCIAS_CUBA.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="mb-2 font-body text-sm font-medium text-primary-secondary">Estado</p>
                    <div className="flex gap-2">
                      {(["all", "nuevo", "de_uso"] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setConditionFilter(c)}
                          className={`rounded-input border px-3 py-1.5 text-sm font-body ${
                            conditionFilter === c
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border bg-surface text-primary-secondary"
                          }`}
                        >
                          {c === "all" ? "Todos" : c === "nuevo" ? "Nuevo" : "De uso"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Filtros provincia y estado desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 hidden gap-4 md:flex md:flex-wrap md:justify-center"
        >
          <select
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
            className="rounded-input border border-border bg-surface-elevated px-4 py-2 font-body text-sm text-primary"
          >
            <option value="all">Todas las provincias</option>
            {PROVINCIAS_CUBA.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {(["all", "nuevo", "de_uso"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setConditionFilter(c)}
                className={`rounded-button border-2 px-4 py-2 font-body text-sm ${
                  conditionFilter === c
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface-elevated text-primary-secondary"
                }`}
              >
                {c === "all" ? "Estado: Todos" : c === "nuevo" ? "Nuevo" : "De uso"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid: 2 cols móvil, 2 tablet, 3 desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedFilter}-${provinceFilter}-${conditionFilter}-${currentPage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-3"
          >
            {paginatedMotos.map((moto, index) => (
              <ProductCard key={moto.id} moto={moto} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Paginación */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex items-center justify-center gap-2"
          >
            <motion.button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-input border border-border bg-surface-elevated px-4 py-2 font-body text-sm disabled:opacity-50"
            >
              Anterior
            </motion.button>
            <span className="font-body text-sm text-primary-secondary">
              Página {currentPage} de {totalPages}
            </span>
            <motion.button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-input border border-border bg-surface-elevated px-4 py-2 font-body text-sm disabled:opacity-50"
            >
              Siguiente
            </motion.button>
          </motion.div>
        )}

        {filteredMotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <PremiumCard className="p-12">
              <p className="font-body text-lg text-primary-secondary">
                No hay publicaciones en esta categoría aún.
              </p>
            </PremiumCard>
          </motion.div>
        )}

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
