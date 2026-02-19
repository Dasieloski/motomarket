"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { PlanId, PlanStatus } from "@/lib/business"

export interface User {
  id: string
  name: string
  email: string
  businessId?: string
}

export type ListingCategory = "moto" | "part" | "service"
export type ListingStatus = "active" | "pending" | "sold"
export type ProductCondition = "nuevo" | "de_uso"

export const PROVINCIAS_CUBA = [
  "Pinar del Río",
  "Artemisa",
  "La Habana",
  "Mayabeque",
  "Matanzas",
  "Cienfuegos",
  "Villa Clara",
  "Sancti Spíritus",
  "Ciego de Ávila",
  "Camagüey",
  "Las Tunas",
  "Holguín",
  "Granma",
  "Santiago de Cuba",
  "Guantánamo",
  "Isla de la Juventud",
] as const

export type ProvinciaCuba = (typeof PROVINCIAS_CUBA)[number]

export type PaymentMethod = "transferencia_cup" | "efectivo_cup" | "pago_exterior"

export const PAYMENT_METHODS = {
  transferencia_cup: "Transferencia en CUP",
  efectivo_cup: "Efectivo en CUP",
  pago_exterior: "Pago en el exterior",
} as const

export interface Review {
  id: string
  rating: number // 1-5
  text: string
  reviewerName: string
  createdAt: string
}

// Función auxiliar para formatear precios en USD
export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString()}`
}

export interface MotoListing {
  id: string
  title: string
  description: string
  price: number // Siempre en USD
  paymentMethods: PaymentMethod[] // Métodos de pago que acepta el vendedor
  images: string[]
  userId: string
  createdAt: string
  category?: ListingCategory
  motoType?: "electrica" | "combustion"
  brand?: string
  model?: string
  year?: string
  displacement?: string
  amperage?: string
  watts?: string
  mileage?: string
  partForBrand?: string
  partForModel?: string
  partType?: string
  serviceType?: string
  contact?: string
  location?: string
  phone: string
  status?: ListingStatus
  views?: number
  province: ProvinciaCuba
  condition: ProductCondition
  /** Id del negocio si la publicación es de una cuenta empresarial */
  businessId?: string
  /** Publicación destacada (según plan) */
  isHighlighted?: boolean
  /** Reseñas de compradores */
  reviews?: Review[]
}

/** Perfil de negocio (cuenta empresarial) */
export interface BusinessProfile {
  id: string
  userId: string
  name: string
  slug: string
  type: string
  province: ProvinciaCuba
  phone: string
  logo?: string
  description: string
  planId: PlanId
  planStatus: PlanStatus
  planExpiresAt: string
  createdAt: string
  totalViews: number
  totalWhatsAppClicks: number
}

/** Listados de ejemplo para demo; incluidos en allListings para que la página de detalle los resuelva. */
export const DEMO_LISTINGS: MotoListing[] = [
  {
    id: "1",
    title: "Yamaha R1 2024",
    description: "Moto deportiva de alta gama, perfecta para pista y carretera. Estado impecable.",
    price: 25000,
    images: ["https://images.pexels.com/photos/163210/motorsports-racing-motorcycle-sport-163210.jpeg?auto=compress&cs=tinysrgb&w=800"],
    userId: "demo",
    createdAt: new Date().toISOString(),
    category: "moto",
    motoType: "combustion",
    phone: "+5351234567",
    province: "La Habana",
    condition: "de_uso",
    displacement: "1000cc",
    mileage: "12 000 km",
    year: "2024",
  },
  {
    id: "2",
    title: "Harley Davidson Sportster",
    description: "Clásica moto cruiser con estilo único. Ideal para viajes largos y ciudad.",
    price: 18000,
    images: ["https://images.pexels.com/photos/163210/motorsports-racing-motorcycle-sport-163210.jpeg?auto=compress&cs=tinysrgb&w=800"],
    userId: "demo",
    createdAt: new Date().toISOString(),
    category: "moto",
    motoType: "combustion",
    phone: "+5351234567",
    province: "Artemisa",
    condition: "de_uso",
    displacement: "883cc",
    year: "2020",
  },
  {
    id: "3",
    title: "Moto Eléctrica Lifan",
    description: "Moto eléctrica eficiente, perfecta para la ciudad. Batería de 20Ah, 1500W.",
    price: 12000,
    images: ["https://images.pexels.com/photos/163210/motorsports-racing-motorcycle-sport-163210.jpeg?auto=compress&cs=tinysrgb&w=800"],
    userId: "demo",
    createdAt: new Date().toISOString(),
    category: "moto",
    motoType: "electrica",
    phone: "+5351234567",
    province: "La Habana",
    condition: "nuevo",
    watts: "1500W",
    amperage: "20Ah",
  },
  {
    id: "4",
    title: "Frenos delanteros Suzuki GN 125",
    description: "Frenos delanteros originales para Suzuki GN 125. Estado nuevo.",
    price: 150,
    images: ["https://images.pexels.com/photos/163210/motorsports-racing-motorcycle-sport-163210.jpeg?auto=compress&cs=tinysrgb&w=800"],
    userId: "demo",
    createdAt: new Date().toISOString(),
    category: "part",
    phone: "+5351234567",
    province: "Mayabeque",
    condition: "nuevo",
    partForBrand: "Suzuki",
    partForModel: "GN 125",
  },
  {
    id: "5",
    title: "Taller de Mecánica General",
    description: "Servicio completo de mecánica para motos. Reparaciones, mantenimiento y más.",
    price: 0,
    images: ["https://images.pexels.com/photos/163210/motorsports-racing-motorcycle-sport-163210.jpeg?auto=compress&cs=tinysrgb&w=800"],
    userId: "demo",
    createdAt: new Date().toISOString(),
    category: "service",
    phone: "+5351234567",
    province: "La Habana",
    condition: "de_uso",
    serviceType: "Mecánica general",
  },
  {
    id: "6",
    title: "Triumph Bonneville T120",
    description: "Moto clásica británica con estilo retro. Elegancia y tradición en cada detalle.",
    price: 15000,
    images: ["https://images.pexels.com/photos/163210/motorsports-racing-motorcycle-sport-163210.jpeg?auto=compress&cs=tinysrgb&w=800"],
    userId: "demo",
    createdAt: new Date().toISOString(),
    category: "moto",
    motoType: "combustion",
    phone: "+5351234567",
    province: "La Habana",
    condition: "de_uso",
    displacement: "1200cc",
    year: "2022",
  },
]

interface AuthContextType {
  user: User | null
  listings: MotoListing[]
  allListings: MotoListing[]
  businesses: BusinessProfile[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  addListing: (listing: Omit<MotoListing, "id" | "userId" | "createdAt">) => void
  updateListing: (id: string, listing: Partial<MotoListing>) => void
  deleteListing: (id: string) => void
  incrementListingViews: (id: string, businessId?: string) => void
  registerBusiness: (data: Omit<BusinessProfile, "id" | "userId" | "createdAt" | "totalViews" | "totalWhatsAppClicks" | "planStatus" | "planExpiresAt"> & { planId: PlanId }) => BusinessProfile | null
  updateBusiness: (id: string, data: Partial<BusinessProfile>) => void
  getBusinessByUserId: (userId: string) => BusinessProfile | undefined
  getBusinessById: (id: string) => BusinessProfile | undefined
  getBusinessBySlug: (slug: string) => BusinessProfile | undefined
  incrementBusinessWhatsAppClick: (businessId: string) => void
  setBusinessPlan: (businessId: string, planId: PlanId) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEFAULT_PLAN_EXPIRY_DAYS = 30

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [listings, setListings] = useState<MotoListing[]>([])
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("motomarket_user")
    const storedListings = localStorage.getItem("motomarket_listings")
    const storedBusinesses = localStorage.getItem("motomarket_businesses")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedListings) {
      try {
        const parsed: MotoListing[] = JSON.parse(storedListings)
        const normalized = parsed.map((listing) => ({
          ...listing,
          status: listing.status ?? "active",
          views: listing.views ?? 0,
          phone: listing.phone ?? "",
          province: listing.province ?? "La Habana",
          condition: listing.condition ?? "de_uso",
        }))
        setListings(normalized)
      } catch {
        setListings([])
      }
    }

    if (storedBusinesses) {
      try {
        setBusinesses(JSON.parse(storedBusinesses))
      } catch {
        setBusinesses([])
      }
    }

    setIsLoading(false)
  }, [])

  // Guardar usuario en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("motomarket_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("motomarket_user")
    }
  }, [user])

  // Guardar listings y businesses en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("motomarket_listings", JSON.stringify(listings))
  }, [listings])

  useEffect(() => {
    localStorage.setItem("motomarket_businesses", JSON.stringify(businesses))
  }, [businesses])

  const login = useCallback(async (email: string, password: string) => {
    // Simulación de login - en producción esto sería una llamada API
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Verificar credenciales en localStorage
    const storedUsers = localStorage.getItem("motomarket_users")
    if (storedUsers) {
      const users: Array<{ email: string; password: string; name: string; id: string }> = JSON.parse(storedUsers)
      const foundUser = users.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        }
        setUser(userData)
        return { success: true }
      }
    }
    
    return { success: false, error: "Email o contraseña incorrectos" }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    // Simulación de registro - en producción esto sería una llamada API
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Verificar si el email ya existe
    const storedUsers = localStorage.getItem("motomarket_users")
    const users: Array<{ email: string; password: string; name: string; id: string }> = storedUsers ? JSON.parse(storedUsers) : []
    
    if (users.some(u => u.email === email)) {
      return { success: false, error: "Este email ya está registrado" }
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // En producción esto debería estar hasheado
    }
    
    users.push(newUser)
    localStorage.setItem("motomarket_users", JSON.stringify(users))
    
    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }
    
    setUser(userData)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    router.push("/")
  }, [router])

  const addListing = useCallback((listing: Omit<MotoListing, "id" | "userId" | "createdAt">) => {
    if (!user) return

    const newListing: MotoListing = {
      ...listing,
      id: `listing_${Date.now()}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      businessId: user.businessId,
    }

    setListings((prev) => [...prev, newListing])
  }, [user])

  const updateListing = useCallback((id: string, updates: Partial<MotoListing>) => {
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, ...updates } : listing
    ))
  }, [])

  const deleteListing = useCallback((id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id))
  }, [])

  const incrementListingViews = useCallback((id: string, businessId?: string) => {
    if (DEMO_LISTINGS.some((d) => d.id === id)) return
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, views: (listing.views ?? 0) + 1 } : listing
      )
    )
    if (businessId) {
      setBusinesses((prev) =>
        prev.map((b) =>
          b.id === businessId ? { ...b, totalViews: b.totalViews + 1 } : b
        )
      )
    }
  }, [])

  const registerBusiness = useCallback(
    (
      data: Omit<
        BusinessProfile,
        "id" | "userId" | "createdAt" | "totalViews" | "totalWhatsAppClicks" | "planStatus" | "planExpiresAt"
      > & { planId: PlanId }
    ): BusinessProfile | null => {
      if (!user) return null
      const id = `biz_${Date.now()}`
      const expires = new Date()
      expires.setDate(expires.getDate() + DEFAULT_PLAN_EXPIRY_DAYS)
      const business: BusinessProfile = {
        ...data,
        id,
        userId: user.id,
        planStatus: "active",
        planExpiresAt: expires.toISOString(),
        createdAt: new Date().toISOString(),
        totalViews: 0,
        totalWhatsAppClicks: 0,
      }
      setBusinesses((prev) => [...prev, business])
      setUser((u) => (u ? { ...u, businessId: id } : null))
      return business
    },
    [user]
  )

  const updateBusiness = useCallback((id: string, data: Partial<BusinessProfile>) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    )
  }, [])

  const getBusinessByUserId = useCallback(
    (userId: string) => businesses.find((b) => b.userId === userId),
    [businesses]
  )

  const getBusinessById = useCallback(
    (id: string) => businesses.find((b) => b.id === id),
    [businesses]
  )

  const getBusinessBySlug = useCallback(
    (slug: string) => businesses.find((b) => b.slug === slug),
    [businesses]
  )

  const incrementBusinessWhatsAppClick = useCallback((businessId: string) => {
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === businessId
          ? { ...b, totalWhatsAppClicks: b.totalWhatsAppClicks + 1 }
          : b
      )
    )
  }, [])

  const setBusinessPlan = useCallback((businessId: string, planId: PlanId) => {
    const expires = new Date()
    expires.setDate(expires.getDate() + DEFAULT_PLAN_EXPIRY_DAYS)
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === businessId
          ? { ...b, planId, planStatus: "active", planExpiresAt: expires.toISOString() }
          : b
      )
    )
  }, [])

  const userListings = listings.filter((l) => l.userId === user?.id)
  const allListings = [...DEMO_LISTINGS, ...listings]

  return (
    <AuthContext.Provider
      value={{
        user,
        listings: userListings,
        allListings,
        businesses,
        isLoading,
        login,
        register,
        logout,
        addListing,
        updateListing,
        deleteListing,
        incrementListingViews,
        registerBusiness,
        updateBusiness,
        getBusinessByUserId,
        getBusinessById,
        getBusinessBySlug,
        incrementBusinessWhatsAppClick,
        setBusinessPlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
