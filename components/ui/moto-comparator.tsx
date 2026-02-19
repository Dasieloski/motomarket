"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PremiumButton } from "./premium-button"
import { PremiumCard } from "./premium-card"
import type { MotoListing } from "@/contexts/auth-context"

interface MotoComparatorProps {
  currentMoto?: MotoListing
  allMotos: MotoListing[]
  isOpen: boolean
  onClose: () => void
}

export function MotoComparator({
  currentMoto,
  allMotos,
  isOpen,
  onClose,
}: MotoComparatorProps) {
  const [selectedMotos, setSelectedMotos] = useState<MotoListing[]>(
    currentMoto ? [currentMoto] : []
  )

  const addMoto = (moto: MotoListing) => {
    if (selectedMotos.find((m) => m.id === moto.id)) return
    if (selectedMotos.length < 4) {
      setSelectedMotos([...selectedMotos, moto])
    }
  }

  const removeMoto = (id: string) => {
    setSelectedMotos(selectedMotos.filter((m) => m.id !== id))
  }

  const getAvailableMotos = () => {
    return allMotos
      .filter((m) => m.id !== currentMoto?.id)
      .filter((m) => !selectedMotos.find((sm) => sm.id === m.id))
  }

  const getCategoryLabel = (moto: MotoListing): string => {
    if (moto.category === "moto")
      return moto.motoType === "electrica" ? "Eléctrica" : "Combustión"
    return moto.category === "part" ? "Pieza" : "Servicio"
  }

  const specs = [
    { key: "brand", label: "Marca" },
    { key: "model", label: "Modelo" },
    { key: "year", label: "Año" },
    { key: "condition", label: "Estado" },
    { key: "motoType", label: "Tipo" },
    { key: "displacement", label: "Cilindraje" },
    { key: "watts", label: "Potencia" },
    { key: "mileage", label: "Kilometraje" },
    { key: "province", label: "Provincia" },
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 m-0 backdrop-blur-sm"
        style={{ overscrollBehavior: 'contain' }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full max-w-7xl max-h-[95vh] bg-surface-elevated rounded-[24px] border border-border shadow-card flex flex-col"
        >
          <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-border bg-surface-elevated/95 backdrop-blur px-6 py-4 z-10">
            <h2 className="font-heading text-2xl font-bold text-primary">
              Comparador de Motos
            </h2>
            <button
              onClick={onClose}
              className="rounded-input p-2 hover:bg-surface-subtle text-primary-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 flex-1 min-h-0 overflow-auto">
            {/* Selected Motos Comparison */}
            {selectedMotos.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-bold text-primary mb-4">
                  Comparando {selectedMotos.length} {selectedMotos.length === 1 ? "moto" : "motos"}
                </h3>

                {/* Images */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {selectedMotos.map((moto) => (
                    <div key={moto.id} className="relative group">
                      <div className="aspect-video relative overflow-hidden rounded-lg border border-border">
                        <Image
                          src={moto.images?.[0] || "/placeholder.jpg"}
                          alt={moto.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeMoto(moto.id)}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="mt-2">
                        <p className="font-body text-sm font-medium text-primary truncate">
                          {moto.title}
                        </p>
                        <p className="font-heading text-lg font-bold text-accent">
                          {moto.currency === "CUP" ? "₡" : "$"}
                          {moto.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Specs Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {specs.map((spec) => (
                        <tr key={spec.key} className="border-b border-border hover:bg-surface-subtle transition-colors">
                          <td className="px-4 py-3 font-body font-medium text-primary-secondary bg-surface-subtle/50 w-32">
                            {spec.label}
                          </td>
                          {selectedMotos.map((moto) => (
                            <td
                              key={`${moto.id}-${spec.key}`}
                              className="px-4 py-3 font-body text-primary text-center"
                            >
                              {(moto as Record<string, any>)[spec.key] || "—"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* View Details Links */}
                <div className="flex gap-2 mt-6 flex-wrap">
                  {selectedMotos.map((moto) => (
                    <Link key={moto.id} href={`/producto/${moto.id}`}>
                      <PremiumButton size="sm" variant="outline">
                        {moto.title.substring(0, 20)}...
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </PremiumButton>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Add More Motos */}
            {selectedMotos.length < 4 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="h-5 w-5 text-accent" />
                  <span className="font-heading text-base font-bold text-accent">
                    Agregar moto para comparar
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getAvailableMotos().slice(0, 9).map((moto) => (
                    <motion.button
                      key={moto.id}
                      onClick={() => addMoto(moto)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-left group"
                    >
                      <PremiumCard className="p-3 h-full hover:border-accent/40 transition-all">
                        <div className="relative aspect-video overflow-hidden rounded mb-2">
                          <Image
                            src={moto.images?.[0] || "/placeholder.jpg"}
                            alt={moto.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <Plus className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <p className="font-body text-xs font-medium text-primary-muted">
                          {getCategoryLabel(moto)}
                        </p>
                        <p className="font-body text-sm font-medium text-primary line-clamp-2">
                          {moto.title}
                        </p>
                        <p className="font-heading text-base font-bold text-accent mt-1">
                          {moto.currency === "CUP" ? "₡" : "$"}
                          {moto.price.toLocaleString()}
                        </p>
                      </PremiumCard>
                    </motion.button>
                  ))}
                </div>

                {getAvailableMotos().length === 0 && (
                  <PremiumCard className="p-4 text-center">
                    <p className="text-primary-muted">
                      No hay más motos disponibles para comparar
                    </p>
                  </PremiumCard>
                )}
              </div>
            )}

            {selectedMotos.length >= 4 && (
              <PremiumCard className="p-4 text-center border-accent/20 bg-accent/5">
                <p className="text-primary">
                  ¡Máximo de 4 motos alcanzado! Elimina una para comparar otras.
                </p>
              </PremiumCard>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
