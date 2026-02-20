"use client"

import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

interface AnimatedIconProps extends Omit<HTMLMotionProps<"div">, "children"> {
    icon: React.ComponentType<any>
    size?: number | string
    color?: string
    strokeWidth?: number
    className?: string
    trigger?: "hover" | "click" | "loop" | "none"
}

/**
 * AnimatedIcon Component
 * Uses Framer Motion to animate Lucide icons.
 * Provides a "premium" feel with smooth micro-interactions.
 */
export function AnimatedIcon({
    icon,
    size = 24,
    color = "currentColor",
    strokeWidth = 1.5, // Thinner, more technical stroke
    className,
    trigger = "hover",
    ...motionProps
}: AnimatedIconProps) {
    const IconComponent = icon

    // Animation variants - Tech/Brutalist style (No wiggle, precise snapping)
    const variants = {
        hover: {
            scale: 1.1,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        },
        loop: {
            rotate: 360,
            transition: { duration: 3, repeat: Infinity, ease: "linear" as const }
        }
    }

    return (
        <motion.div
            className={`inline-flex items-center justify-center ${className}`}
            whileHover={trigger === "hover" ? "hover" : undefined}
            whileTap={trigger === "hover" || trigger === "click" ? "tap" : undefined}
            variants={variants}
            animate={trigger === "loop" ? "loop" : undefined}
            style={{
                width: typeof size === "number" ? `${size}px` : size,
                height: typeof size === "number" ? `${size}px` : size,
            }}
            {...motionProps}
        >
            <IconComponent
                size={size}
                color={color}
                strokeWidth={strokeWidth}
                className="shrink-0"
            />
        </motion.div>
    )
}
