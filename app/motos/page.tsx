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
import { PriceRangeSlider } from "@/components/ui/price-range-slider"
import { YearSelect } from "@/components/ui/year-select"
import { BrandSelect } from "@/components/ui/brand-select"
import { MileageSelect } from "@/components/ui/mileage-select"

const ITEMS_PER_PAGE = 6

export default function MotosPage() {
  const { allListings } = useAuth()
  const [selectedFilter, setSelectedFilter] = useState<ListingCategory | "all">("all")
  const [provinceFilter, setProvinceFilter] = useState<string>("all")
  const [conditionFilter, setConditionFilter] = useState<ProductCondition | "all">("all")

  // New Dynamic Filters
  const [motoTypeFilter, setMotoTypeFilter] = useState<"all" | "electrica" | "combustion">("all")
  const [wattsFilter, setWattsFilter] = useState<string>("all")
  const [displacementFilter, setDisplacementFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  // Filtros avanzados
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000])
  const [yearFilter, setYearFilter] = useState<number | "all">("all")
  const [brandFilter, setBrandFilter] = useState<string | "all">("all")
  const [mileageFilter, setMileageFilter] = useState<string | "all">("all")
  const [sortOrder, setSortOrder] = useState<string>("recent")
  const allMotos = allListings
  // Marcas demo (debería venir de la BD)
  const BRANDS = ["Suzuki", "Yamaha", "Lifan", "Honda", "Dayang", "Keller", "Riya", "Otra"]

  // Reset sub-filters when main filter changes
  useEffect(() => {
    setMotoTypeFilter("all")
    setWattsFilter("all")
    setDisplacementFilter("all")
  }, [selectedFilter])

  let filteredMotos = allMotos.filter((moto) => {
    // 1. Main Category Filter
    if (selectedFilter !== "all" && moto.category !== selectedFilter) return false

    // 2. Common Filters
    if (provinceFilter !== "all" && (moto.province ?? "") !== provinceFilter) return false
    if (conditionFilter !== "all" && (moto.condition ?? "de_uso") !== conditionFilter) return false

    // 3. Moto Specific Filters (Only applied if category is 'moto' or 'all')
    if (selectedFilter === "moto" || selectedFilter === "all") {
      if (motoTypeFilter !== "all") {
        if (moto.motoType !== motoTypeFilter) return false
        if (motoTypeFilter === "electrica" && wattsFilter !== "all") {
          if (moto.watts !== wattsFilter) return false
        }
        if (motoTypeFilter === "combustion" && displacementFilter !== "all") {
          if (moto.displacement !== displacementFilter) return false
        }
      }
      // Filtro por año
      if (yearFilter !== "all" && moto.year !== yearFilter) return false
      // Filtro por marca
      if (brandFilter !== "all" && moto.brand !== brandFilter) return false
      // Filtro por kilometraje
      if (mileageFilter !== "all") {
        if (mileageFilter === "<5000" && (!moto.mileage || moto.mileage >= 5000)) return false
        if (mileageFilter === "5000-20000" && (!moto.mileage || moto.mileage < 5000 || moto.mileage > 20000)) return false
        if (mileageFilter === ">20000" && (!moto.mileage || moto.mileage <= 20000)) return false
      }
      // Filtro por rango de precio
      if (moto.price < priceRange[0] || moto.price > priceRange[1]) return false
    }
    // 4. Search Query
    if (searchQuery.trim() && !moto.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })
  // Ordenamiento
  filteredMotos = filteredMotos.sort((a, b) => {
    if (sortOrder === "price-asc") return (a.price || 0) - (b.price || 0)
    if (sortOrder === "price-desc") return (b.price || 0) - (a.price || 0)
    if (sortOrder === "views-desc") return (b.views || 0) - (a.views || 0)
    if (sortOrder === "rating-desc") return (b.rating || 0) - (a.rating || 0)
    // Default: más recientes
    return (b.createdAt || 0) - (a.createdAt || 0)
  })

  // Options
  const WATTS_OPTIONS = ["1000W", "1500W", "2000W", "3000W"]
  const DISPLACEMENT_OPTIONS = ["50cc", "100cc", "125cc", "150cc", "250cc", "500cc+", "1000cc"]

  const totalPages = Math.max(1, Math.ceil(filteredMotos.length / ITEMS_PER_PAGE))
  const paginatedMotos = filteredMotos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedFilter, provinceFilter, conditionFilter, motoTypeFilter, wattsFilter, displacementFilter])

  const filters = [
    { id: "all" as const, label: "Todas" },
    { id: "moto" as const, label: "Motos" },
    { id: "part" as const, label: "Piezas" },
    { id: "service" as const, label: "Servicios" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return
      setShowBackToTop(window.scrollY > 400)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("La búsqueda por voz no es compatible con este navegador.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "es-ES"
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript
      if (transcript) {
        setSearchQuery(transcript)
      }
    }
    recognition.start()
  }

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 pt-24 md:px-6 md:py-20 md:pt-32 lg:py-28 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:mb-12"
        >
          <h1 className="font-heading text-3xl font-bold text-primary md:text-5xl">
            Ver todas las motos
          </h1>
          <p className="mt-3 font-body text-base text-primary-secondary md:text-lg">
            Explora todas las publicaciones disponibles
          </p>
        </motion.div>

        {/* Dynamic Desktop Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 hidden flex-col gap-4 md:flex"
        >
          {/* Row 1: Main Category & Common Filters + Avanzados */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`rounded-button border px-4 py-2 font-body text-sm font-medium transition-all ${selectedFilter === f.id
                    ? "border-accent bg-accent text-white shadow-glow-sm"
                    : "border-border bg-surface-elevated text-primary-secondary hover:border-accent/40"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="h-8 w-px bg-border/50" />
            <select
              value={provinceFilter}
              onChange={(e) => setProvinceFilter(e.target.value)}
              className="rounded-input border border-border bg-surface-elevated px-4 py-2 font-body text-sm text-primary focus:border-accent focus:outline-none"
            >
              <option value="all">Todas las provincias</option>
              {PROVINCIAS_CUBA.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="flex rounded-input border border-border bg-surface-elevated p-1">
              {(["all", "nuevo", "de_uso"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setConditionFilter(c)}
                  className={`rounded px-3 py-1 text-xs font-body transition-colors ${conditionFilter === c
                    ? "bg-accent text-white"
                    : "text-primary-secondary hover:text-primary"
                    }`}
                >
                  {c === "all" ? "Todos" : c === "nuevo" ? "Nuevo" : "De uso"}
                </button>
              ))}
            </div>
            {/* Filtros avanzados */}
            <div className="h-8 w-px bg-border/50" />
            <PriceRangeSlider min={0} max={20000} value={priceRange} onChange={setPriceRange} />
            <YearSelect min={2010} max={2026} value={yearFilter} onChange={setYearFilter} />
            <BrandSelect brands={BRANDS} value={brandFilter} onChange={setBrandFilter} />
            <MileageSelect value={mileageFilter} onChange={setMileageFilter} />
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="rounded-input border border-border bg-surface-elevated px-4 py-2 font-body text-sm text-primary focus:border-accent focus:outline-none"
            >
              <option value="recent">Más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="views-desc">Más vistas</option>
              <option value="rating-desc">Mejor valoración</option>
            </select>
          </div>

          <AnimatePresence mode="wait">
            {selectedFilter === "moto" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap justify-center gap-4 border-t border-border/30 pt-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary-muted uppercase tracking-wider font-bold">Motor:</span>
                  <div className="flex gap-2">
                    {(["all", "electrica", "combustion"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setMotoTypeFilter(t)}
                        className={`rounded-full border px-3 py-1 text-xs ${motoTypeFilter === t
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-primary-secondary hover:border-accent/40"}`}
                      >
                        {t === "all" ? "Cualquiera" : t === "electrica" ? "Eléctrica" : "Combustión"}
                      </button>
                    ))}
                  </div>
                </div>

                {motoTypeFilter === "electrica" && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                    <span className="text-xs text-primary-muted uppercase tracking-wider font-bold">Potencia:</span>
                    <select
                      value={wattsFilter}
                      onChange={(e) => setWattsFilter(e.target.value)}
                      className="rounded-input border border-border bg-surface-elevated px-3 py-1 text-xs text-primary focus:border-accent focus:outline-none"
                    >
                      <option value="all">Todas</option>
                      {WATTS_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </motion.div>
                )}

                {motoTypeFilter === "combustion" && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                    <span className="text-xs text-primary-muted uppercase tracking-wider font-bold">Cilindraje:</span>
                    <select
                      value={displacementFilter}
                      onChange={(e) => setDisplacementFilter(e.target.value)}
                      className="rounded-input border border-border bg-surface-elevated px-3 py-1 text-xs text-primary focus:border-accent focus:outline-none"
                    >
                      <option value="all">Todos</option>
                      {DISPLACEMENT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center gap-3 md:hidden"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full rounded-input border border-border bg-surface-elevated pl-4 pr-10 py-2.5 font-body text-sm text-primary placeholder:text-primary-muted focus:border-accent focus:outline-none"
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-primary-muted hover:text-primary"
              aria-label="Buscar por voz"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
                <path d="M19 10a7 7 0 0 1-14 0" />
                <line x1="12" x2="12" y1="19" y2="23" />
                <line x1="8" x2="16" y1="23" y2="23" />
              </svg>
            </button>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
          </div>

          <motion.button
            onClick={() => setMobileFiltersOpen(true)}
            whileTap={{ scale: 0.98 }}
            className="flex shrink-0 items-center justify-center rounded-button bg-surface-elevated border border-border px-3 py-2.5 text-primary shadow-soft"
            aria-label="Abrir filtros"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="21" y2="21" /><line x1="4" x2="20" y1="3" y2="3" /><line x1="10" x2="20" y1="14" y2="14" /><line x1="4" x2="14" y1="10" y2="10" /><line x1="16" x2="16" y1="21" y2="14" /><line x1="8" x2="8" y1="10" y2="3" /></svg>
          </motion.button>

          <button
            type="button"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="flex shrink-0 items-center justify-center rounded-button border border-border bg-surface-elevated px-3 py-2 text-primary text-xs font-body"
            aria-label="Cambiar vista"
          >
            {viewMode === "grid" ? "Lista" : "Grid"}
          </button>
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
                  <h2 className="font-heading text-lg font-bold text-primary">Filtros</h2>
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
                          className={`rounded-input border px-3 py-1.5 text-sm font-body ${selectedFilter === f.id
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border bg-surface text-primary-secondary"
                            }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedFilter === "moto" && (
                    <>
                      <div>
                        <p className="mb-2 font-body text-sm font-medium text-primary-secondary">Tipo de Motor</p>
                        <div className="flex gap-2">
                          {(["all", "electrica", "combustion"] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setMotoTypeFilter(t)}
                              className={`rounded-input border px-3 py-1.5 text-sm font-body ${motoTypeFilter === t
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border bg-surface text-primary-secondary"
                                }`}
                            >
                              {t === "all" ? "Todos" : t === "electrica" ? "Eléctrica" : "Combustión"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {motoTypeFilter === "electrica" && (
                        <div>
                          <p className="mb-2 font-body text-sm font-medium text-primary-secondary">Potencia</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setWattsFilter("all")}
                              className={`rounded-input border px-3 py-1.5 text-sm font-body ${wattsFilter === "all"
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border bg-surface text-primary-secondary"
                                }`}
                            >
                              Todas
                            </button>
                            {WATTS_OPTIONS.map((w) => (
                              <button
                                key={w}
                                type="button"
                                onClick={() => setWattsFilter(w)}
                                className={`rounded-input border px-3 py-1.5 text-sm font-body ${wattsFilter === w
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border bg-surface text-primary-secondary"
                                  }`}
                              >
                                {w}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {motoTypeFilter === "combustion" && (
                        <div>
                          <p className="mb-2 font-body text-sm font-medium text-primary-secondary">Cilindraje</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setDisplacementFilter("all")}
                              className={`rounded-input border px-3 py-1.5 text-sm font-body ${displacementFilter === "all"
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border bg-surface text-primary-secondary"
                                }`}
                            >
                              Todos
                            </button>
                            {DISPLACEMENT_OPTIONS.map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setDisplacementFilter(d)}
                                className={`rounded-input border px-3 py-1.5 text-sm font-body ${displacementFilter === d
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border bg-surface text-primary-secondary"
                                  }`}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

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
                          className={`rounded-input border px-3 py-1.5 text-sm font-body ${conditionFilter === c
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

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedFilter}-${provinceFilter}-${conditionFilter}-${motoTypeFilter}-${wattsFilter}-${displacementFilter}-${currentPage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-3 sm:gap-4 md:gap-5 lg:grid-cols-3"
                : "grid grid-cols-1 gap-4"
            }
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
            <h2 className="font-heading text-2xl font-bold text-primary">
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

      {/* Barra flotante inferior en móvil: filtros + volver arriba */}
      {filteredMotos.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] md:hidden">
          <div className="pointer-events-auto mx-auto mb-4 flex max-w-md items-center justify-center gap-3 rounded-full border border-border bg-surface-elevated px-4 py-2 shadow-soft">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-surface-subtle px-3 py-1.5 text-sm font-body text-primary hover:bg-surface"
              aria-label="Abrir filtros"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-muted"
              >
                <line x1="4" x2="20" y1="21" y2="21" />
                <line x1="4" x2="20" y1="3" y2="3" />
                <line x1="10" x2="20" y1="14" y2="14" />
                <line x1="4" x2="14" y1="10" y2="10" />
                <line x1="16" x2="16" y1="21" y2="14" />
                <line x1="8" x2="8" y1="10" y2="3" />
              </svg>
              <span>Filtros</span>
            </button>

            {showBackToTop && (
              <button
                type="button"
                onClick={handleScrollToTop}
                className="flex items-center justify-center rounded-full bg-accent px-3 py-1.5 text-sm font-body text-white shadow-card hover:bg-accent-hover"
                aria-label="Volver arriba"
              >
                ↑
              </button>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
