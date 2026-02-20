"use client"

import { Suspense, useMemo, useState, useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { motion, type MotionValue } from "framer-motion"
import * as THREE from "three"
import { MotoModel } from "./moto-model"


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
  scrollProgress: MotionValue<number>
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
  scrollProgress: MotionValue<number>
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
      logarithmicDepthBuffer: false,
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
          antialias: typeof window !== 'undefined' && window.devicePixelRatio <= 2,
        }}
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1 : 1}
        performance={{ min: 0.5, max: 0.8 }}
        frameloop="always"
        onCreated={({ gl, size }) => {
          gl.setSize(gl.domElement.clientWidth || size.width, gl.domElement.clientHeight || size.height, false)
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
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </motion.div>
      )}
    </div>
  )
}
