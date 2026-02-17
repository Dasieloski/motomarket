"use client"

import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import * as LucideIcons from "lucide-react"

interface AnimatedIconProps extends Omit<HTMLMotionProps<"div">, "children"> {
    icon: keyof typeof LucideIcons | React.ComponentType<any>
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
    strokeWidth = 2,
    className,
    trigger = "hover",
    ...motionProps
}: AnimatedIconProps) {
    const IconComponent = typeof icon === "string"
        ? (LucideIcons[icon as keyof typeof LucideIcons] as React.ComponentType<any>)
        : icon

    if (!IconComponent) {
        console.warn(`Icon "${icon}" not found in lucide-react`)
        return null
    }

    // Animation variants
    const variants = {
        hover: {
            scale: 1.15,
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.4, ease: "easeInOut" as const }
        },
        tap: {
            scale: 0.9,
            transition: { duration: 0.1 }
        },
        loop: {
            rotate: 360,
            transition: { duration: 2, repeat: Infinity, ease: "linear" as const }
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
