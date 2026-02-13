/**
 * Tipos y constantes para la sección Para Negocios.
 * Estructura preparada para monetización (pago no implementado aún).
 */

export const BUSINESS_TYPES = [
  { id: "taller", label: "Taller" },
  { id: "tienda", label: "Tienda" },
  { id: "distribuidor", label: "Distribuidor" },
  { id: "servicio", label: "Servicio" },
] as const

export type BusinessTypeId = (typeof BUSINESS_TYPES)[number]["id"]

export const PLAN_IDS = ["basic", "pro", "premium"] as const
export type PlanId = (typeof PLAN_IDS)[number]

export type PlanStatus = "active" | "inactive" | "cancelled"

export interface PlanFeature {
  text: string
  included: boolean
}

export interface PlanConfig {
  id: PlanId
  name: string
  priceMonthly: number
  description: string
  features: PlanFeature[]
  recommended?: boolean
  maxListings: number | null // null = ilimitado
  priorityInSearch: boolean
  advancedStats: boolean
  verifiedBadge: boolean
  highlightedBadge: boolean
  homepageSpotlight: boolean
  promotionalBanner: boolean
  prioritySupport: boolean
}

export const PLANS: PlanConfig[] = [
  {
    id: "basic",
    name: "Básico",
    priceMonthly: 299,
    description: "Ideal para empezar a vender en línea",
    recommended: false,
    maxListings: 20,
    priorityInSearch: false,
    advancedStats: false,
    verifiedBadge: true,
    highlightedBadge: false,
    homepageSpotlight: false,
    promotionalBanner: false,
    prioritySupport: false,
    features: [
      { text: "Hasta 20 publicaciones activas", included: true },
      { text: "Perfil empresarial", included: true },
      { text: "Estadísticas básicas", included: true },
      { text: "Badge de negocio verificado", included: true },
      { text: "Prioridad en resultados", included: false },
      { text: "Estadísticas avanzadas", included: false },
      { text: "Destacado en homepage", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 599,
    description: "Para negocios que quieren crecer",
    recommended: true,
    maxListings: null,
    priorityInSearch: true,
    advancedStats: true,
    verifiedBadge: true,
    highlightedBadge: true,
    homepageSpotlight: false,
    promotionalBanner: false,
    prioritySupport: false,
    features: [
      { text: "Publicaciones ilimitadas", included: true },
      { text: "Prioridad en resultados", included: true },
      { text: "Estadísticas avanzadas", included: true },
      { text: "Badge destacado", included: true },
      { text: "Perfil empresarial", included: true },
      { text: "Destacado en homepage", included: false },
      { text: "Soporte prioritario", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    priceMonthly: 999,
    description: "Máxima visibilidad y soporte",
    recommended: false,
    maxListings: null,
    priorityInSearch: true,
    advancedStats: true,
    verifiedBadge: true,
    highlightedBadge: true,
    homepageSpotlight: true,
    promotionalBanner: true,
    prioritySupport: true,
    features: [
      { text: "Publicaciones ilimitadas", included: true },
      { text: "Destacado automático en homepage", included: true },
      { text: "Banner promocional opcional", included: true },
      { text: "Soporte prioritario", included: true },
      { text: "Máxima visibilidad", included: true },
      { text: "Estadísticas avanzadas", included: true },
      { text: "Badge destacado", included: true },
    ],
  },
]

export function getPlanById(id: PlanId): PlanConfig | undefined {
  return PLANS.find((p) => p.id === id)
}
