"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right"

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  amount?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  amount = 0.2,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount, margin: "-60px" })
  const offset = directionOffset[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.9, delay, ease: easeOutExpo },
            }
          : {}
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}
