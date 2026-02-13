"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface PremiumButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button font-body font-medium transition-all duration-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      primary: "bg-primary text-white shadow-soft hover:bg-accent hover:shadow-card",
      secondary: "bg-surface-subtle text-primary hover:bg-border",
      outline: "border-2 border-border bg-transparent text-primary hover:bg-surface-subtle hover:border-accent",
      ghost: "bg-transparent text-primary hover:bg-surface-subtle",
    }
    
    const sizes = {
      sm: "h-10 px-5 text-sm",
      md: "h-12 px-7 text-[15px]",
      lg: "h-14 px-9 text-base",
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >
        {isLoading ? (
          <>
            <motion.div
              className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
            />
            <span>Cargando...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)
PremiumButton.displayName = "PremiumButton"

export { PremiumButton }
