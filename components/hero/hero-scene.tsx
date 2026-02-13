"use client"

import { Suspense, useMemo, useState, useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { motion } from "framer-motion"
import * as THREE from "three"
import { MotoModel } from "./moto-model"

// Fondo hero: blanco cálido
const HERO_BG = "#F5F5F3"

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
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} castShadow={false} />
      <directionalLight position={[-3, 4, 3]} intensity={0.4} />
      <directionalLight position={[0, 2, -2]} intensity={0.25} />
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
      alpha: false,
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
    <div className={className} style={{ background: HERO_BG, width: '100%', height: '100%' }}>
      <Canvas
        gl={{
          ...glConfig,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop="always"
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
        <color attach="background" args={[HERO_BG]} />
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
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#F5F5F3]"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/30">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-accent/60"
                initial={{ width: 0 }}
                animate={{ width: isLoaded ? 100 : 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-medium text-primary-muted">Cargando modelo 3D...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
