"use client"

import { Suspense, useMemo, useState, useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { PerformanceMonitor } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { MotoModel } from "./moto-model"

const HERO_BG = "#0A0D14"

function CanvasReady({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera } = useThree()
  const hasNotified = useRef(false)

  useEffect(() => {
    if (!hasNotified.current && gl && scene && camera) {
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
    const timer = setTimeout(() => {
      onLoaded()
    }, 500)
    return () => clearTimeout(timer)
  }, [onLoaded])

  return (
    <>
      <CanvasReady onReady={onLoaded} />
      <color attach="background" args={[HERO_BG]} />
      <Suspense fallback={null}>
        <PerformanceMonitor onDecline={() => setDpr(1)} />
      </Suspense>
      <Suspense fallback={null}>
        <MotoModel scrollProgress={scrollProgress} />
      </Suspense>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
    </>
  )
}

export function CanvasRenderer({
  scrollProgress,
  onLoaded,
}: {
  scrollProgress: number
  onLoaded: () => void
}) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      camera={{
        position: [0, 0, 5],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      className="w-full h-full"
    >
      <SceneContent scrollProgress={scrollProgress} onLoaded={onLoaded} />
    </Canvas>
  )
}
