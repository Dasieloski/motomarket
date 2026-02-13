"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { PROVINCIAS_CUBA } from "@/contexts/auth-context"
import { BUSINESS_TYPES, PLANS } from "@/lib/business"
import type { PlanId } from "@/lib/business"

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

function RegistroEmpresarialContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading, registerBusiness, getBusinessByUserId } = useAuth()
  const planParam = searchParams.get("plan") as PlanId | null

  const [step, setStep] = useState<"form" | "plan">("form")
  const [name, setName] = useState("")
  const [type, setType] = useState("taller")
  const [province, setProvince] = useState("La Habana")
  const [phone, setPhone] = useState("")
  const [logo, setLogo] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(planParam && PLANS.some((p) => p.id === planParam) ? planParam : "basic")

  const isLoggedIn = !!user
  const existingBusiness = user ? getBusinessByUserId(user.id) : undefined

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?redirect=/registro-empresarial")
      return
    }
    if (!isLoading && user && existingBusiness) {
      router.replace("/dashboard")
    }
  }, [isLoading, user, existingBusiness, router])

  const handlePlanThenForm = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name.trim()) {
      setError("El nombre del negocio es obligatorio.")
      return
    }
    if (!phone.trim()) {
      setError("El WhatsApp es obligatorio.")
      return
    }
    setStep("plan")
  }

  const handleSelectPlanAndFinish = () => {
    if (!user) return
    const business = registerBusiness({
      name: name.trim(),
      slug: slugify(name.trim()) || `negocio-${Date.now()}`,
      type,
      province: province as (typeof PROVINCIAS_CUBA)[number],
      phone: phone.trim(),
      logo: logo.trim() || undefined,
      description: description.trim(),
      planId: selectedPlanId,
    })
    if (business) router.push("/dashboard")
  }

  if (isLoading || (!user && !isLoggedIn)) {
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

  if (!user) return null

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />

      <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <Link
            href="/para-negocios"
            className="font-body text-sm font-medium text-accent hover:underline"
          >
            ← Volver a Para Negocios
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">
            Crear cuenta empresarial
          </h1>
          <p className="mt-2 font-body text-primary-secondary">
            {step === "form"
              ? "Completa los datos de tu negocio."
              : "Elige tu plan y activa tu cuenta."}
          </p>
        </motion.div>

        {step === "form" ? (
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handlePlanThenForm}
            className="space-y-6 rounded-[24px] border border-border bg-surface-elevated p-6 shadow-soft md:p-8"
          >
            {error && (
              <p className="rounded-input bg-red-50 px-4 py-2 font-body text-sm text-red-600">
                {error}
              </p>
            )}
            <div>
              <label className="mb-2 block font-body text-sm font-medium text-primary">
                Nombre del negocio *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Taller El Rápido"
                className="w-full rounded-input border border-border bg-surface px-4 py-3 font-body text-primary"
              />
            </div>
            <div>
              <label className="mb-2 block font-body text-sm font-medium text-primary">
                Tipo *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-input border border-border bg-surface px-4 py-3 font-body text-primary"
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block font-body text-sm font-medium text-primary">
                Provincia *
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full rounded-input border border-border bg-surface px-4 py-3 font-body text-primary"
              >
                {PROVINCIAS_CUBA.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block font-body text-sm font-medium text-primary">
                WhatsApp *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+53 5 123 4567"
                className="w-full rounded-input border border-border bg-surface px-4 py-3 font-body text-primary"
              />
            </div>
            <div>
              <label className="mb-2 block font-body text-sm font-medium text-primary">
                Logo (URL)
              </label>
              <input
                type="url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-input border border-border bg-surface px-4 py-3 font-body text-primary"
              />
            </div>
            <div>
              <label className="mb-2 block font-body text-sm font-medium text-primary">
                Descripción breve
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Qué servicios o productos ofreces..."
                className="w-full rounded-input border border-border bg-surface px-4 py-3 font-body text-primary"
              />
            </div>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-button bg-accent py-3 font-body font-semibold text-white hover:bg-accent-hover"
              >
                Siguiente: elegir plan
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/para-negocios#planes"
                className="flex flex-1 items-center justify-center rounded-button border-2 border-border py-3 font-body font-medium text-primary-secondary hover:border-accent hover:text-accent"
              >
                Ver planes
              </Link>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 rounded-[24px] border border-border bg-surface-elevated p-6 shadow-soft md:p-8"
          >
            <p className="font-body text-primary-secondary">
              Resumen: <strong className="text-primary">{name}</strong> · {province}
            </p>
            <div>
              <label className="mb-3 block font-body text-sm font-medium text-primary">
                Elige tu plan
              </label>
              <div className="space-y-3">
                {PLANS.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex cursor-pointer items-center justify-between rounded-input border-2 p-4 transition-colors ${
                      selectedPlanId === plan.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <span className="font-body font-medium text-primary">{plan.name}</span>
                    <span className="font-display font-bold text-accent">
                      ${plan.priceMonthly}/mes
                    </span>
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={selectedPlanId === plan.id}
                      onChange={() => setSelectedPlanId(plan.id as PlanId)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={handleSelectPlanAndFinish}
                className="flex flex-1 items-center justify-center gap-2 rounded-button bg-accent py-3 font-body font-semibold text-white hover:bg-accent-hover"
              >
                Crear cuenta empresarial
                <Building2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="rounded-button border-2 border-border py-3 font-body font-medium text-primary-secondary hover:border-accent hover:text-accent"
              >
                Atrás
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default function RegistroEmpresarialPage() {
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
      <RegistroEmpresarialContent />
    </Suspense>
  )
}
