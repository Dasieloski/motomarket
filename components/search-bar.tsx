"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const searchTerms = [
  "motos eléctricas",
  "piezas de freno",
  "talleres de mecánica",
  "motos de combustión",
  "cascos y accesorios",
  "Suzuki GN 125",
  "baterías para moto",
]

function Typewriter({ terms }: { terms: string[] }) {
  const [termIndex, setTermIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPausing, setIsPausing] = useState(false)

  const currentTerm = terms[termIndex] ?? terms[0]

  useEffect(() => {
    if (!currentTerm) return

    const delay = isPausing
      ? 1600
      : isDeleting
        ? 45
        : charIndex >= currentTerm.length
          ? 0
          : 90

    const timeout = setTimeout(
      () => {
        if (isPausing) {
          setIsPausing(false)
          setIsDeleting(true)
          return
        }
        if (isDeleting) {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1)
          } else {
            setIsDeleting(false)
            setTermIndex((i) => (i + 1) % terms.length)
          }
        } else {
          if (charIndex < currentTerm.length) {
            setCharIndex((c) => c + 1)
          } else {
            setIsPausing(true)
          }
        }
      },
      delay
    )

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, isPausing, currentTerm, termIndex, terms.length])

  const displayText = currentTerm.slice(0, charIndex)

  return (
    <span className="inline-block min-w-[2ch] text-left">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 bg-accent align-middle"
        aria-hidden
      >
        |
      </motion.span>
    </span>
  )
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/motos?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative overflow-hidden rounded-card border border-border bg-surface-elevated shadow-card transition-shadow duration-300 hover:shadow-card-hover md:rounded-[28px]"
        >
          {/* Borde superior sutil con acento */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          <div className="relative p-8 md:p-10">
            {/* Etiqueta y tipo animado */}
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="font-body text-xs font-medium uppercase tracking-wider text-accent">
                  Explora el mercado
                </span>
              </div>
              <p className="font-body text-sm text-primary-muted">
                Buscar{" "}
                <span className="font-display font-semibold text-primary">
                  <Typewriter terms={searchTerms} />
                </span>
              </p>
            </div>

            {/* Campo de búsqueda */}
            <form onSubmit={handleSubmit}>
              <motion.div
                className={`flex items-center gap-3 rounded-input border-2 bg-surface transition-all duration-300 md:rounded-2xl ${
                  isFocused
                    ? "border-accent bg-white shadow-[0_0_0_4px_rgba(26,54,93,0.08)]"
                    : "border-border bg-surface-subtle/50"
                }`}
                whileFocus="focused"
                layout
              >
                <div className="flex flex-1 items-center pl-5 md:pl-6">
                  <Search className="h-5 w-5 shrink-0 text-primary-muted md:h-6 md:w-6" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Escribe lo que buscas..."
                    className="h-14 w-full min-w-0 bg-transparent pl-3 pr-4 font-body text-[15px] text-primary placeholder:text-primary-muted focus:outline-none md:h-16 md:text-base"
                    aria-label="Buscar publicaciones"
                  />
                </div>
                <AnimatePresence mode="wait">
                  {searchQuery.trim() ? (
                    <motion.button
                      key="submit"
                      type="submit"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mr-2 shrink-0 rounded-input bg-accent px-5 py-3 font-body text-sm font-medium text-white shadow-soft transition-colors hover:bg-accent-hover md:mr-3 md:px-6 md:py-3.5"
                    >
                      Buscar
                    </motion.button>
                  ) : (
                    <motion.span
                      key="hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mr-4 hidden text-xs text-primary-muted md:block"
                    >
                      Enter para buscar
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>

            {/* Sugerencias rápidas (solo visibles en desktop) */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {searchTerms.slice(0, 4).map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term)
                  }}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 font-body text-xs text-primary-secondary transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
