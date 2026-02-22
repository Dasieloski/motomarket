"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type { Group } from "three"
import * as THREE from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import type { MotionValue } from "framer-motion"

// Ruta al modelo principal de la moto (asegúrate de que exista en public/models3d/moto.glb)
const MODEL_PATH = "/models3d/moto.glb"

// Configurar DRACOLoader para soportar compresión
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/")
dracoLoader.preload()

// Caché para modelos cargados previos
const modelCache = new Map()

interface MotoModelProps {
  scrollProgress: MotionValue<number>
}

export function MotoModel({ scrollProgress }: MotoModelProps) {
  const groupRef = useRef<Group>(null)
  const baseRotationY = useRef(0)
  const currentRotationY = useRef(0)
  const currentRotationX = useRef(0)
  const idlePhase = useRef(0)
  const [isModelReady, setIsModelReady] = useState(false)
  const { scene } = useGLTF(MODEL_PATH)

  // Clonar para no compartir estado entre instancias - OPTIMIZADO
  const clonedScene = useMemo(() => {
    // Verificar caché primero
    if (modelCache.has(MODEL_PATH)) {
      return modelCache.get(MODEL_PATH).clone()
    }

    const cloned = scene.clone()
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        // Optimizaciones básicas sin modificar propiedades que podrían ser getters
        child.frustumCulled = true
        child.castShadow = false
        child.receiveShadow = false
        
        if (child.geometry) {
          child.geometry.computeBoundingSphere()
        }
      }
    })
    
    // Guardar en caché
    modelCache.set(MODEL_PATH, cloned)
    return cloned.clone()
  }, [scene])

  // Marcar modelo listo cuando el clone existe
  useEffect(() => {
    if (clonedScene) {
      setIsModelReady(true)
    }
  }, [clonedScene])

  useFrame((_, delta) => {
    if (!groupRef.current || !isModelReady) return

    // Limitar delta para evitar saltos
    const clampedDelta = Math.min(delta, 0.016) // 60fps max

    // Rotación principal lenta y constante
    const rotationSpeed = 0.18
    baseRotationY.current += rotationSpeed * clampedDelta

    // Scroll effect
    const maxExtraRotation = 0.18
    const scrollValue = scrollProgress.get()
    const scrollExtraY = scrollValue * maxExtraRotation
    const baseZ = -6.9
    const scrollOffsetZ = baseZ + scrollValue * 0.4

    // Animación continua sutil
    idlePhase.current += clampedDelta * 0.4
    const floatY = Math.sin(idlePhase.current) * 0.04
    const microTiltX = Math.sin(idlePhase.current * 0.4) * 0.015

    const targetYRotation = baseRotationY.current + scrollExtraY
    const targetXRotation = microTiltX

    // Lerp suave (cinematográfico)
    const lerp = 1 - Math.exp(-clampedDelta * 6)
    currentRotationY.current += (targetYRotation - currentRotationY.current) * lerp
    currentRotationX.current += (targetXRotation - currentRotationX.current) * lerp

    // Aplicar transformaciones
    groupRef.current.rotation.y = currentRotationY.current
    groupRef.current.rotation.x = currentRotationX.current

    // Posicionamiento
    const baseX = 1.1
    const baseY = -2.5
    groupRef.current.position.x = baseX
    groupRef.current.position.y = baseY + floatY
    groupRef.current.position.z = scrollOffsetZ
  })

  return (
    <group ref={groupRef} position={[1.1, -2.5, -6.9]} scale={6.5}>
      <primitive object={clonedScene} />
    </group>
  )
}
