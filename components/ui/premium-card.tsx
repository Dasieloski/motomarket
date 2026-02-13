"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface PremiumCardProps extends React.ComponentProps<"div"> {
  hover?: boolean
  delay?: number
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, hover = true, delay = 0, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
        whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
        className={cn(
          "rounded-card border border-border bg-surface-elevated shadow-card transition-all duration-smooth",
          hover && "hover:shadow-card-hover",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
PremiumCard.displayName = "PremiumCard"

export { PremiumCard }
