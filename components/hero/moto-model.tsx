"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type { Group } from "three"
import * as THREE from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

// Ruta al modelo principal de la moto (asegúrate de que exista en public/models3d/moto.glb)
const MODEL_PATH = "/models3d/moto.glb"

// Configurar DRACOLoader para soportar compresión
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/")
dracoLoader.preload()

interface MotoModelProps {
  scrollProgress: number
}

export function MotoModel({ scrollProgress }: MotoModelProps) {
  const groupRef = useRef<Group>(null)
  const baseRotationY = useRef(0) // rotación principal, lenta y constante
  const currentRotationY = useRef(0)
  const currentRotationX = useRef(0)
  const idlePhase = useRef(0)
  const [isModelReady, setIsModelReady] = useState(false)
  const [opacity, setOpacity] = useState(1) // Iniciar visible desde el principio
  const prevScrollProgress = useRef(scrollProgress)

  const { scene } = useGLTF(MODEL_PATH)
  const { invalidate } = useThree()

  // Clonar para no compartir estado entre instancias
  const clonedScene = useMemo(() => {
    const cloned = scene.clone()
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material = (child.material as THREE.Material).clone()
        if ("metalness" in child.material) {
          ; (child.material as any).metalness = Math.min(0.9, (child.material as any).metalness ?? 0.7)
        }
        if ("roughness" in child.material) {
          ; (child.material as any).roughness = Math.max(0.25, (child.material as any).roughness ?? 0.4)
        }
        // Desactivar sombras para mejor rendimiento
        child.frustumCulled = true
        if ("castShadow" in child) (child as any).castShadow = false
        if ("receiveShadow" in child) (child as any).receiveShadow = false

        // Configurar transparencia inicial si es necesario
        if ("transparent" in child.material) {
          ; (child.material as any).transparent = false
            ; (child.material as any).opacity = 1
        }
      }
    })
    return cloned
  }, [scene])

  // Marcar modelo listo cuando el clone existe
  useEffect(() => {
    if (clonedScene) {
      setIsModelReady(true)
    }
  }, [clonedScene])

  // Invalidar cuando cambia el scroll para render-on-demand
  useEffect(() => {
    if (Math.abs(scrollProgress - prevScrollProgress.current) > 0.001) {
      prevScrollProgress.current = scrollProgress
      invalidate()
    }
  }, [scrollProgress, invalidate])

  useFrame((_, delta) => {
    if (!groupRef.current || !isModelReady) return

    // Rotación principal lenta y constante (pieza de museo)
    const rotationSpeed = 0.18 // radianes por segundo, muy suave
    baseRotationY.current += rotationSpeed * delta

    // Scroll (equivalente a ScrollTrigger): ligero extra de rotación y zoom muy sutil
    const maxExtraRotation = 0.18 // ≈ 10° extra
    const scrollExtraY = scrollProgress * maxExtraRotation
    // Importante: en Three.js la cámara mira hacia -Z, por lo que el modelo
    // debe estar en valores negativos de Z para ser visible.
    const baseZ = -6.9
    const scrollOffsetZ = baseZ + scrollProgress * 0.4

    // Animación continua sutil: flotación muy ligera
    idlePhase.current += delta * 0.4
    const floatY = Math.sin(idlePhase.current) * 0.04
    const microTiltX = Math.sin(idlePhase.current * 0.4) * 0.015

    const targetYRotation = baseRotationY.current + scrollExtraY
    const targetXRotation = microTiltX

    // Lerp suave (feel cinematográfico)
    const lerp = 1 - Math.exp(-delta * 6)
    currentRotationY.current += (targetYRotation - currentRotationY.current) * lerp
    currentRotationX.current += (targetXRotation - currentRotationX.current) * lerp

    // Aplicar transformaciones
    groupRef.current.rotation.y = currentRotationY.current
    groupRef.current.rotation.x = currentRotationX.current

    // Posicionamiento: desplazada hacia la derecha y flotando suavemente
    const baseX = 1.1
    const baseY = -2.5
    groupRef.current.position.x = baseX
    groupRef.current.position.y = baseY + floatY
    groupRef.current.position.z = scrollOffsetZ

    // Invalidar para el siguiente frame (render continuo para animación suave)
    invalidate()
  })

  // Siempre renderizar el grupo cuando hay escena clonada (posición inicial = misma que useFrame)
  return (
    <group ref={groupRef} position={[1.1, -2.5, -6.9]} scale={6.5}>
      <primitive object={clonedScene} />
    </group>
  )
}
