"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin } from "lucide-react"
import { PROVINCIAS_CUBA, type ProvinciaCuba } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface ProvinceSelectProps {
  value: ProvinciaCuba
  onChange: (value: ProvinciaCuba) => void
  error?: string
  label?: string
}

export function ProvinceSelect({ value, onChange, error, label = "Provincia" }: ProvinceSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="space-y-2">
      {label && (
        <label className="font-body text-sm font-medium text-primary-secondary flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {label}
        </label>
      )}
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-input border bg-surface-elevated px-4 font-body text-[15px] text-primary transition-all duration-smooth",
            error
              ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
              : open
                ? "border-accent shadow-[0_0_0_3px_rgba(26,54,93,0.1)]"
                : "border-border hover:border-primary/30"
          )}
          whileTap={{ scale: 0.99 }}
        >
          <span className="truncate">{value}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 text-primary-muted" />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-auto rounded-input border border-border bg-surface-elevated py-1 shadow-card"
            >
              {PROVINCIAS_CUBA.map((prov) => (
                <li key={prov}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(prov)
                      setOpen(false)
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-left font-body text-[15px] transition-colors",
                      value === prov
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-primary hover:bg-surface-subtle"
                    )}
                  >
                    {prov}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <p className="font-body text-sm font-medium text-red-400">{error}</p>
      )}
    </div>
  )
}
