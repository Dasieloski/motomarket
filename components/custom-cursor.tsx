"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const dotXSpring = useSpring(dotX, springConfig)
  const dotYSpring = useSpring(dotY, springConfig)

  useEffect(() => {
    // Solo mostrar en desktop
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return
    }

    setIsVisible(true)

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Detectar elementos interactivos
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button'], [tabindex], [href]"
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [cursorX, cursorY, dotX, dotY])

  if (!isVisible || (typeof window !== "undefined" && window.innerWidth <= 768)) {
    return null
  }

  return (
    <>
      <motion.div
        className={`custom-cursor ${isHovering ? "hover" : ""} ${isClicking ? "click" : ""}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          left: 0,
          top: 0,
        }}
      />
      <motion.div
        className="cursor-dot"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          left: 0,
          top: 0,
        }}
      />
    </>
  )
}
