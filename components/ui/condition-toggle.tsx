"use client"

import { motion } from "framer-motion"
import { Package, RefreshCw } from "lucide-react"
import type { ProductCondition } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface ConditionToggleProps {
  value: ProductCondition
  onChange: (value: ProductCondition) => void
  error?: string
  label?: string
}

const options: { value: ProductCondition; label: string; icon: typeof Package }[] = [
  { value: "nuevo", label: "Nuevo", icon: Package },
  { value: "de_uso", label: "De uso", icon: RefreshCw },
]

export function ConditionToggle({ value, onChange, error, label = "Estado del producto" }: ConditionToggleProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="font-body text-sm font-medium text-primary-secondary">
          {label}
        </label>
      )}
      <div className="flex rounded-input border border-border bg-surface-elevated p-1">
        {options.map((opt) => {
          const isSelected = value === opt.value
          const Icon = opt.icon
          return (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-2 rounded-input py-2.5 font-body text-sm font-medium transition-colors",
                isSelected ? "text-primary" : "text-primary-muted hover:text-primary-secondary"
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isSelected && (
                <motion.span
                  layoutId="condition-bg"
                  className="absolute inset-0 rounded-input bg-surface-subtle shadow-soft"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {opt.label}
              </span>
            </motion.button>
          )
        })}
      </div>
      {error && (
        <p className="font-body text-sm font-medium text-red-400">{error}</p>
      )}
    </div>
  )
}
