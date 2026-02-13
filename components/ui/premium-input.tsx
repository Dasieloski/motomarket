"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface PremiumInputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const PremiumInput = React.forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ className, label, error, icon, type = "text", ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    React.useEffect(() => {
      if (props.value || props.defaultValue) {
        setHasValue(true)
      }
    }, [props.value, props.defaultValue])

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="font-body text-sm font-medium text-primary-secondary">
            {label}
          </label>
        )}
        <motion.div
          className={cn(
            "relative flex items-center rounded-input border bg-surface-elevated transition-all duration-smooth",
            error
              ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
              : isFocused
                ? "border-accent shadow-[0_0_0_3px_rgba(26,54,93,0.1)]"
                : "border-border hover:border-primary/30",
            className
          )}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {icon && (
            <div className="absolute left-4 text-primary-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              "h-12 w-full rounded-input bg-transparent px-4 font-body text-[15px] text-primary placeholder:text-primary-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-11"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0)
              props.onChange?.(e)
            }}
            {...props}
          />
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-4 text-red-400"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M8 5V8M8 11H8.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-sm font-medium text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)
PremiumInput.displayName = "PremiumInput"

export { PremiumInput }
