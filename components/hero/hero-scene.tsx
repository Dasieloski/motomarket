"use client"

import { Suspense, useMemo, useState, useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { PerformanceMonitor } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { MotoModel } from "./moto-model"

// Fondo hero: deep Prussian dark (NOT pure black)
const HERO_BG = "#0A0D14"

// Componente para detectar cuando el canvas está listo
function CanvasReady({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera } = useThree()
  const hasNotified = useRef(false)

  useEffect(() => {
    if (!hasNotified.current && gl && scene && camera) {
      // Esperar un frame para asegurar que todo está inicializado
      requestAnimationFrame(() => {
        hasNotified.current = true
        const timer = setTimeout(() => {
          onReady()
        }, 300)
        return () => clearTimeout(timer)
      })
    }
  }, [gl, scene, camera, onReady])

  return null
}

function SceneContent({
  scrollProgress,
  onLoaded,
}: {
  scrollProgress: number
  onLoaded: () => void
}) {
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    // Notificar cuando el modelo está listo después de asegurar render
    const timer = setTimeout(() => {
      onLoaded()
    }, 500)
    return () => clearTimeout(timer)
  }, [onLoaded])

  return (
    <>
      <CanvasReady onReady={onLoaded} />
      {/* Monitor de rendimiento para ajustar DPR dinámicamente */}
      <PerformanceMonitor
        onIncline={() => setDpr(1.5)}
        onDecline={() => setDpr(1)}
        onChange={({ factor }) => setDpr(Math.min(1.5, 1 + factor / 2))}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow={false} color="#ffffff" />
      <directionalLight position={[-3, 4, 3]} intensity={0.6} color="#FCA311" />
      <directionalLight position={[0, 2, -2]} intensity={0.3} color="#14213D" />
      <directionalLight position={[2, -1, 3]} intensity={0.2} color="#FCA311" />
      <group>
        <MotoModel scrollProgress={scrollProgress} />
      </group>
    </>
  )
}

interface HeroSceneProps {
  className?: string
  scrollProgress: number
  onModelLoaded?: () => void
}

export function HeroScene({
  className,
  scrollProgress,
  onModelLoaded,
}: HeroSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  const glConfig = useMemo(
    () => ({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance" as const,
      stencil: false,
      depth: true,
    }),
    []
  )

  const handleLoaded = () => {
    setIsLoaded(true)
    // Delay para fade-out suave del loader
    setTimeout(() => {
      setShowLoader(false)
      onModelLoaded?.()
    }, 400)
  }

  return (
    <div className={className} style={{ background: 'transparent', width: '100%', height: '100%' }}>
      <Canvas
        gl={{
          ...glConfig,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop="demand"
        onCreated={({ gl, size }) => {
          // Asegurar que el canvas tenga dimensiones correctas sin forzar render
          if (gl.domElement) {
            const width = gl.domElement.clientWidth || size.width
            const height = gl.domElement.clientHeight || size.height
            if (width > 0 && height > 0) {
              gl.setSize(width, height, false)
            }
          }
        }}
      >
        <Suspense fallback={null}>
          <SceneContent scrollProgress={scrollProgress} onLoaded={handleLoaded} />
        </Suspense>
      </Canvas>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#0A0D14]"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                initial={{ width: 0 }}
                animate={{ width: isLoaded ? 100 : 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-medium text-white/40">Cargando modelo 3D...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
