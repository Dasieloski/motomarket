"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Image as ImageIcon, DollarSign, FileText, Camera, X, Wrench, Settings, Phone } from "lucide-react"
import Image from "next/image"

import { useAuth } from "@/contexts/auth-context"
import { PROVINCIAS_CUBA, type ProvinciaCuba, type ProductCondition } from "@/contexts/auth-context"
import { PremiumInput } from "@/components/ui/premium-input"
import { PremiumButton } from "@/components/ui/premium-button"
import { PremiumCard } from "@/components/ui/premium-card"
import { ProvinceSelect } from "@/components/ui/province-select"
import { ConditionToggle } from "@/components/ui/condition-toggle"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const listingSchema = z.object({
  category: z.enum(["moto", "part", "service"]),
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .min(0, "El precio debe ser mayor o igual a 0")
    .optional(),
  paymentMethods: z.array(z.enum(["transferencia_cup", "efectivo_cup", "pago_exterior"])).optional(),
  phone: z.string().min(8, "El teléfono es obligatorio y debe tener al menos 8 dígitos"),
  province: z.enum([...PROVINCIAS_CUBA] as [string, ...string[]], {
    required_error: "Selecciona la provincia",
  }),
  condition: z.enum(["nuevo", "de_uso"], { required_error: "Indica el estado del producto" }),
  motoType: z.enum(["electrica", "combustion"]).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.string().optional(),
  displacement: z.string().optional(),
  amperage: z.string().optional(),
  watts: z.string().optional(),
  mileage: z.string().optional(),
  partForBrand: z.string().optional(),
  partForModel: z.string().optional(),
  partType: z.string().optional(),
  serviceType: z.string().optional(),
  contact: z.string().optional(),
  location: z.string().optional(),
})

type ListingFormData = z.infer<typeof listingSchema>

function VenderForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams?.get("edit")
  const { user, listings, addListing, updateListing, isLoading } = useAuth()
  const [imageFilesMap, setImageFilesMap] = useState<Map<string, File>>(new Map())
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5
  const { toast } = useToast()

  const existingListing = editId ? listings.find((l) => l.id === editId) : null

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: existingListing
      ? {
          category: existingListing.category ?? "moto",
          title: existingListing.title,
          description: existingListing.description,
          price: existingListing.price,
          paymentMethods: existingListing.paymentMethods ?? [],
          phone: existingListing.phone,
          province: existingListing.province ?? "La Habana",
          condition: existingListing.condition ?? "de_uso",
          motoType: existingListing.motoType,
          brand: existingListing.brand,
          model: existingListing.model,
          year: existingListing.year,
          displacement: existingListing.displacement,
          amperage: existingListing.amperage,
          watts: existingListing.watts,
          mileage: existingListing.mileage,
          partForBrand: existingListing.partForBrand,
          partForModel: existingListing.partForModel,
          partType: existingListing.partType,
          serviceType: existingListing.serviceType,
          contact: existingListing.contact,
          location: existingListing.location,
        }
      : {
          category: "moto",
          province: "La Habana",
          condition: "de_uso",
          paymentMethods: [],
        },
  })

  const category = watch("category")
  const motoType = watch("motoType")
  const watchedTitle = watch("title")
  const watchedDescription = watch("description")
  const watchedPrice = watch("price")
  const watchedPaymentMethods = watch("paymentMethods")
  const watchedCurrency = watch("currency")
  const watchedProvince = watch("province")
  const watchedCondition = watch("condition")

  const handleNextStep = () => {
    let hasErrors = false

    // Paso 1: Validar categoría (siempre se puede avanzar)

    // Paso 2: Validar información básica
    if (currentStep === 2) {
      if (errors.title || errors.province || errors.condition) {
        hasErrors = true
      }
    }
    // Paso 3: Validar especificaciones según categoría
    else if (currentStep === 3) {
      if (category === "moto") {
        if (errors.brand || errors.model || errors.year || errors.motoType || errors.mileage) {
          hasErrors = true
        }
        if (motoType === "combustion" && errors.displacement) {
          hasErrors = true
        }
        if (motoType === "electrica" && (errors.amperage || errors.watts)) {
          hasErrors = true
        }
      } else if (category === "part") {
        if (errors.partForBrand || errors.partForModel || errors.partType) {
          hasErrors = true
        }
      } else if (category === "service") {
        if (errors.serviceType || errors.contact || errors.location) {
          hasErrors = true
        }
      }
    }
    // Paso 4: Validar descripción y precio
    else if (currentStep === 4) {
      if (errors.description || errors.phone) {
        hasErrors = true
      }
    }
    // Paso 5: No hay validación adicional (imágenes son opcionales)

    if (!hasErrors) {
      setCurrentStep((s) => Math.min(totalSteps, s + 1))
    }
  }

  useEffect(() => {
    if (existingListing && existingListing.images) {
      // Si hay imágenes existentes (URLs), crear previews
      setImagePreviews(existingListing.images)
    } else if (!editId) {
      // Cargar borrador si existe
      const draft = localStorage.getItem("motomarket_draft_listing")
      if (draft) {
        try {
          const parsed = JSON.parse(draft) as { form: ListingFormData; images: string[] }
          reset(parsed.form)
          setImagePreviews(parsed.images ?? [])
        } catch {
          // ignorar borrador corrupto
        }
      }
    }
  }, [existingListing, editId, reset])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/vender")
    }
  }, [user, isLoading, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newFilesMap = new Map(imageFilesMap)
    const newPreviews: string[] = []

    files.forEach((file) => {
      const preview = URL.createObjectURL(file)
      newFilesMap.set(preview, file)
      newPreviews.push(preview)
    })

    setImageFilesMap(newFilesMap)
    setImagePreviews([...imagePreviews, ...newPreviews])
  }

  const removeImage = (index: number) => {
    const previewToRemove = imagePreviews[index]
    
    // Revocar URL del objeto si es un preview local
    if (previewToRemove?.startsWith("blob:")) {
      URL.revokeObjectURL(previewToRemove)
    }

    // Remover del map si existe
    const newFilesMap = new Map(imageFilesMap)
    newFilesMap.delete(previewToRemove)
    setImageFilesMap(newFilesMap)

    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImagePreviews(newPreviews)
  }

  // Guardado de borrador automático
  useEffect(() => {
    if (editId) return
    const subscription = watch((value) => {
      try {
        const payload = {
          form: value as ListingFormData,
          images: imagePreviews,
        }
        localStorage.setItem("motomarket_draft_listing", JSON.stringify(payload))
      } catch {
        // ignorar errores de almacenamiento
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, editId, imagePreviews])

  const onSubmit = async (data: ListingFormData) => {
    if (imagePreviews.length === 0) {
      toast({
        variant: "destructive",
        title: "Faltan imágenes",
        description: "Agrega al menos una foto para publicar tu anuncio.",
      })
      return
    }

    setIsSubmitting(true)

    // Convertir archivos a URLs base64 para almacenamiento local (simulación)
    // En producción, esto se subiría a un servidor
    const imageUrls = await Promise.all(
      imagePreviews.map(async (preview) => {
        const file = imageFilesMap.get(preview)
        if (file) {
          // Es un archivo nuevo (blob)
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
        }
        // Es una URL existente
        return preview
      })
    )

    const basePayload = {
      ...data,
      images: imageUrls,
      status: existingListing?.status ?? "active",
      views: existingListing?.views ?? 0,
      province: data.province as ProvinciaCuba,
      condition: data.condition as ProductCondition,
      paymentMethods: (data.paymentMethods as any[]) ?? [],
    }

    if (editId && existingListing) {
      updateListing(editId, {
        ...basePayload,
      })
      toast({
        title: "Publicación actualizada",
        description: "Tus cambios se han guardado correctamente.",
      })
    } else {
      addListing({
        ...basePayload,
      })
      localStorage.removeItem("motomarket_draft_listing")
      toast({
        title: "Publicación creada",
        description: "Tu anuncio ya está visible en el listado.",
      })
    }

    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard")
    }, 800)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
        />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="font-body text-lg text-primary-secondary">
            Redirigiendo al login...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-surface overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-20 md:px-6 md:pt-32 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:text-left"
        >
          <h1 className="font-heading text-3xl font-bold text-primary md:text-5xl">
            {editId ? "Editar publicación" : "Vender mi moto"}
          </h1>
          <p className="mt-2 font-body text-sm text-primary-secondary md:text-base">
            Completa el formulario para publicar tu moto, pieza o servicio en Cuba.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <PremiumCard className="p-8">
              <div className="mb-6 space-y-2">
                <p className="font-body text-xs font-medium uppercase tracking-wide text-primary-muted">
                  Paso {currentStep} de {totalSteps}
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Paso 1: Tipo de publicación */}
                <div className={currentStep === 1 ? "space-y-3" : "hidden"}>
                  <p className="font-body text-sm font-medium text-primary-secondary">
                    ¿Qué quieres publicar?
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { id: "moto", label: "Moto", icon: <Settings className="h-4 w-4" /> },
                      { id: "part", label: "Piezas / accesorios", icon: <Wrench className="h-4 w-4" /> },
                      { id: "service", label: "Talleres / servicios", icon: <ImageIcon className="h-4 w-4" /> },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          const input = document.querySelector<HTMLInputElement>(
                            `#category-${option.id}`
                          )
                          input?.click()
                        }}
                        className={`flex items-center gap-2 rounded-input border px-3 py-2 text-left text-sm font-body transition-all duration-smooth ${category === option.id
                          ? "border-accent bg-surface-subtle text-primary"
                          : "border-border bg-surface-elevated text-primary-secondary hover:border-accent/60"
                          }`}
                      >
                        {option.icon}
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="hidden">
                    <input
                      id="category-moto"
                      type="radio"
                      value="moto"
                      {...register("category")}
                    />
                    <input
                      id="category-part"
                      type="radio"
                      value="part"
                      {...register("category")}
                    />
                    <input
                      id="category-service"
                      type="radio"
                      value="service"
                      {...register("category")}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {category === "moto" && (
                      <motion.p
                        key="hint-moto"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs font-body text-primary-secondary"
                      >
                        Para motos de combustión indica cilindraje y kilometraje. Para eléctricas, especifica
                        bien amperaje, watts y autonomía aproximada.
                      </motion.p>
                    )}
                    {category === "part" && (
                      <motion.p
                        key="hint-part"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs font-body text-primary-secondary"
                      >
                        Indica exactamente para qué moto sirve la pieza (marca y modelo) para evitar dudas al
                        comprador.
                      </motion.p>
                    )}
                    {category === "service" && (
                      <motion.p
                        key="hint-service"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs font-body text-primary-secondary"
                      >
                        Explica claramente qué tipo de servicio ofreces y cómo pueden contactarte en Cuba.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Paso 2: Información básica */}
                <div className={currentStep === 2 ? "space-y-6" : "hidden"}>
                  <div>
                  <PremiumInput
                    label="Título de la publicación"
                    placeholder="Ej: Yamaha R1 2024 en excelente estado"
                    icon={<FileText className="h-4 w-4" />}
                    error={errors.title?.message}
                    {...register("title")}
                  />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                  <ProvinceSelect
                    label="Provincia de Cuba *"
                    value={watchedProvince ?? "La Habana"}
                    onChange={(v) => setValue("province", v)}
                    error={errors.province?.message}
                  />
                  <ConditionToggle
                    label="Estado del producto *"
                    value={watchedCondition ?? "de_uso"}
                    onChange={(v) => setValue("condition", v)}
                    error={errors.condition?.message}
                  />
                  </div>
                </div>

                {/* Paso 3: Especificaciones */}
                <div className={currentStep === 3 ? "space-y-6" : "hidden"}>
                  {/* Campos específicos según tipo */}
                  <AnimatePresence mode="wait">
                  {category === "moto" && (
                    <motion.div
                      key="section-moto"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="mb-2 block font-body text-sm font-medium text-primary-secondary">
                          Tipo de moto
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              document
                                .querySelector<HTMLInputElement>("#motoType-electrica")
                                ?.click()
                            }}
                            className={`flex-1 rounded-input border px-3 py-2 text-sm font-body transition-all ${motoType === "electrica"
                              ? "border-accent bg-surface-subtle"
                              : "border-border bg-surface-elevated hover:border-accent/60"
                              }`}
                          >
                            Eléctrica
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              document
                                .querySelector<HTMLInputElement>("#motoType-combustion")
                                ?.click()
                            }}
                            className={`flex-1 rounded-input border px-3 py-2 text-sm font-body transition-all ${motoType === "combustion"
                              ? "border-accent bg-surface-subtle"
                              : "border-border bg-surface-elevated hover:border-accent/60"
                              }`}
                          >
                            Combustión
                          </button>
                        </div>
                        <div className="hidden">
                          <input
                            id="motoType-electrica"
                            type="radio"
                            value="electrica"
                            {...register("motoType")}
                          />
                          <input
                            id="motoType-combustion"
                            type="radio"
                            value="combustion"
                            {...register("motoType")}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <PremiumInput
                          label="Marca"
                          placeholder="Ej: Suzuki, Lifan..."
                          error={undefined}
                          {...register("brand")}
                        />
                        <PremiumInput
                          label="Modelo"
                          placeholder="Ej: GN 125, Wave, etc."
                          error={undefined}
                          {...register("model")}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <PremiumInput
                          label="Año"
                          placeholder="Ej: 2015"
                          error={undefined}
                          {...register("year")}
                        />
                        <AnimatePresence mode="wait">
                          {motoType === "combustion" && (
                            <motion.div
                              key="displacement"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="sm:col-span-1"
                            >
                              <PremiumInput
                                label="Cilindraje (cc)"
                                placeholder="Ej: 125"
                                error={undefined}
                                {...register("displacement")}
                              />
                            </motion.div>
                          )}
                          {motoType === "electrica" && (
                            <motion.div
                              key="amperage"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="sm:col-span-1"
                            >
                              <PremiumInput
                                label="Amperaje"
                                placeholder="Ej: 20Ah"
                                error={undefined}
                                {...register("amperage")}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <PremiumInput
                          label="Kilometraje"
                          placeholder="Ej: 18 000"
                          error={undefined}
                          {...register("mileage")}
                        />
                      </div>

                      <AnimatePresence>
                        {motoType === "electrica" && (
                          <motion.div
                            key="watts-section"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <PremiumInput
                              label="Potencia (watts)"
                              placeholder="Ej: 1500W"
                              error={undefined}
                              {...register("watts")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {category === "part" && (
                    <motion.div
                      key="section-part"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <PremiumInput
                          label="Marca de la moto"
                          placeholder="Para qué moto es (marca)"
                          error={undefined}
                          {...register("partForBrand")}
                        />
                        <PremiumInput
                          label="Modelo de la moto"
                          placeholder="Para qué moto es (modelo)"
                          error={undefined}
                          {...register("partForModel")}
                        />
                      </div>
                      <PremiumInput
                        label="Tipo de pieza / accesorio"
                        placeholder="Ej: Freno delantero, casco integral, luces LED..."
                        error={undefined}
                        {...register("partType")}
                      />
                    </motion.div>
                  )}

                  {category === "service" && (
                    <motion.div
                      key="section-service"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-4"
                    >
                      <PremiumInput
                        label="Tipo de servicio"
                        placeholder="Ej: Mecánica general, electricidad, pintura..."
                        error={undefined}
                        {...register("serviceType")}
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <PremiumInput
                          label="Contacto"
                          placeholder="Teléfono, WhatsApp, etc."
                          error={undefined}
                          {...register("contact")}
                        />
                        <PremiumInput
                          label="Ubicación"
                          placeholder="Municipio / provincia en Cuba"
                          error={undefined}
                          {...register("location")}
                        />
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>

                {/* Paso 4: Descripción y precio */}
                <div className={currentStep === 4 ? "space-y-6" : "hidden"}>
                  <div>
                  <label className="mb-2 block font-body text-sm font-medium text-primary-secondary">
                    Descripción
                  </label>
                  <textarea
                    {...register("description")}
                    className="h-32 w-full rounded-input border border-border bg-surface-elevated px-4 py-3 font-body text-[15px] text-primary placeholder:text-primary-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Describe tu moto, pieza o servicio en detalle..."
                  />
                  {errors.description && (
                    <p className="mt-2 font-body text-sm font-medium text-red-400">
                      {errors.description.message}
                    </p>
                  )}
                  </div>

                  <div>
                  <div className="grid gap-4 sm:grid-cols-1">
                    <PremiumInput
                      label="Precio (en USD)"
                      type="number"
                      placeholder="25000"
                      icon={<DollarSign className="h-4 w-4" />}
                      error={errors.price?.message}
                      {...register("price", { valueAsNumber: true })}
                    />
                  </div>

                  {/* Métodos de pago que acepta */}
                  <div>
                    <label className="mb-3 block font-body text-sm font-medium text-primary-secondary">
                      ¿Qué métodos de pago aceptas?
                    </label>
                    <div className="space-y-3">
                      {[
                        { id: "transferencia_cup", label: "Transferencia en CUP" },
                        { id: "efectivo_cup", label: "Efectivo en CUP" },
                        { id: "pago_exterior", label: "Pago en el exterior" },
                      ].map((method) => (
                        <label key={method.id} className="flex items-center gap-3 rounded-input border border-border bg-surface-elevated px-4 py-3 cursor-pointer hover:bg-surface-subtle transition-colors">
                          <input
                            type="checkbox"
                            value={method.id}
                            onChange={(e) => {
                              const current = watch("paymentMethods") || []
                              if (e.target.checked) {
                                setValue("paymentMethods", [...current, method.id as any])
                              } else {
                                setValue("paymentMethods", current.filter((m) => m !== method.id))
                              }
                            }}
                            className="h-4 w-4 rounded border-border bg-surface-elevated accent-accent"
                          />
                          <span className="font-body text-sm text-primary">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  </div>

                  {/* Teléfono obligatorio */}
                  <div>
                  <PremiumInput
                    label="Teléfono de contacto *"
                    type="tel"
                    placeholder="Ej: +53 5 1234567"
                    icon={<Phone className="h-4 w-4" />}
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: errors.phone ? 1 : 0 }}
                    className="mt-2 text-xs font-body text-primary-secondary"
                  >
                    Este número será visible en tu publicación para que los compradores te contacten.
                  </motion.p>
                  </div>
                </div>

                {/* Paso 5: Imágenes */}
                <div className={currentStep === 5 ? "space-y-6" : "hidden"}>
                  {/* Subida de imágenes local */}
                  <div>
                  <label className="mb-2 block font-body text-sm font-medium text-primary-secondary">
                    Imágenes
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <PremiumButton
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Camera className="h-4 w-4" />
                    Subir imágenes desde tu dispositivo
                  </PremiumButton>
                  {imagePreviews.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 grid grid-cols-3 gap-3"
                    >
                      {imagePreviews.map((preview, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <div className="relative aspect-square overflow-hidden rounded-input">
                            <Image
                              src={preview}
                              alt={`Imagen ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 33vw, 200px"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Eliminar imagen"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  <p className="mt-2 text-xs font-body text-primary-secondary">
                    Tip: las publicaciones con 5 o más fotos suelen recibir muchas más visitas.
                  </p>
                </div>
                </div>

                {/* Controles de navegación del wizard */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                    disabled={currentStep === 1}
                    className="rounded-input border border-border bg-surface-elevated px-4 py-2 text-sm font-body text-primary hover:bg-surface-subtle disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  {currentStep < totalSteps ? (
                    <PremiumButton
                      type="button"
                      onClick={handleNextStep}
                      className="bg-accent text-white hover:bg-accent/90"
                    >
                      Siguiente
                    </PremiumButton>
                  ) : (
                    <PremiumButton type="submit" isLoading={isSubmitting} className="min-w-[140px] bg-accent text-white hover:bg-accent/90">
                      {editId ? "Actualizar publicación" : "Publicar"}
                    </PremiumButton>
                  )}
                </div>
              </form>
            </PremiumCard>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-24 h-fit"
          >
            <PremiumCard className="p-8">
              <h2 className="mb-6 font-heading text-xl font-bold text-primary">
                Vista previa
              </h2>

              <div className="space-y-4">
                <div className="relative h-64 w-full overflow-hidden rounded-input bg-surface-subtle">
                  {imagePreviews.length > 0 ? (
                    <Image
                      src={imagePreviews[0]}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-primary-muted" />
                        <p className="mt-2 font-body text-sm text-primary-muted">
                          Agrega imágenes para ver la vista previa
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">
                    {watchedTitle || "Título de la publicación"}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-primary-secondary">
                    {watchedDescription || "La descripción de tu publicación aparecerá aquí..."}
                  </p>
                  <div className="mt-4">
                    <span className="font-heading text-2xl font-bold text-accent">
                      {typeof watchedPrice === "number" && !Number.isNaN(watchedPrice)
                        ? watchedCurrency === "CUP"
                          ? `₡${watchedPrice.toLocaleString()}`
                          : `$${watchedPrice.toLocaleString()}`
                        : "$0"}
                    </span>
                  </div>
                </div>

                {imagePreviews.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {imagePreviews.slice(1, 4).map((preview, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-input">
                        <Image
                          src={preview}
                          alt={`Imagen ${index + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 150px"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PremiumCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function VenderPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
          />
        </div>
      }
    >
      <VenderForm />
    </Suspense>
  )
}
