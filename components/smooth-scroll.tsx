"use client"

import { useEffect } from "react"

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function SmoothScrollScript() {
  useEffect(() => {
    document.documentElement.classList.add("smooth-scroll")
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor || anchor.getAttribute("href") === "#") return
      const id = anchor.getAttribute("href")?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      if (typeof history !== "undefined" && id) {
        history.pushState(null, "", `#${id}`)
      }
      const start = window.scrollY
      const end = el.getBoundingClientRect().top + start
      const distance = end - start
      const duration = 800
      const startTime = performance.now()
      function tick(now: number) {
        const elapsed = now - startTime
        const t = Math.min(elapsed / duration, 1)
        const eased = easeInOutCubic(t)
        window.scrollTo(0, start + distance * eased)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [])
  return null
}
