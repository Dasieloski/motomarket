'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyAnimatedProps {
  children: React.ReactNode
  threshold?: number
  fallback?: React.ReactNode
}

/**
 * Lazy loads animated components only when they become visible.
 * Reduces initial bundle size and main thread work.
 */
export function LazyAnimated({ 
  children, 
  threshold = 0.1,
  fallback = null 
}: LazyAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}
