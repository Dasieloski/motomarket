"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Eye,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PLANS } from "@/lib/business"

const ease = [0.4, 0, 0.2, 1] as const

const benefits = [
  {
    icon: TrendingUp,
    title: "Más visibilidad en búsquedas",
    description: "Aparece cuando compradores buscan motos, piezas o servicios en tu provincia.",
  },
  {
    icon: Star,
    title: "Badge de Negocio Verificado",
    description: "Genera confianza con el sello verificado en todas tus publicaciones.",
  },
  {
    icon: Building2,
    title: "Perfil empresarial personalizado",
    description: "Página propia con logo, descripción y catálogo de productos o servicios.",
  },
  {
    icon: BarChart3,
    title: "Estadísticas reales",
    description: "Vistas, clics en WhatsApp y contactos para medir el impacto de tu negocio.",
  },
  {
    icon: Zap,
    title: "Prioridad en resultados",
    description: "En planes Pro y Premium, tus anuncios destacan sobre publicaciones personales.",
  },
  {
    icon: Sparkles,
    title: "Publicaciones ilimitadas",
    description: "Sin límite de anuncios activos en planes Pro y Premium.",
  },
]

function BenefitCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof TrendingUp
  title: string
  description: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="rounded-[20px] border border-border bg-surface-elevated p-6 shadow-soft transition-shadow hover:shadow-card md:p-8"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-primary md:text-xl">
        {title}
      </h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-primary-secondary">
        {description}
      </p>
    </motion.div>
  )
}

export default function ParaNegociosPage() {
  const plansRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-sm font-medium uppercase tracking-widest text-accent"
          >
            Para negocios
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl"
          >
            Haz crecer tu tienda o taller en toda Cuba
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-primary-secondary md:text-xl"
          >
            Convierte visitas en llamadas reales por WhatsApp y aumenta tus ventas con
            herramientas profesionales.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="#planes">
              <motion.span
                className="inline-flex h-12 items-center gap-2 rounded-button bg-accent px-8 font-body text-base font-semibold text-white shadow-card transition-colors hover:bg-accent-hover"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver planes
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
            <Link href="/registro-empresarial">
              <motion.span
                className="inline-flex h-12 items-center gap-2 rounded-button border-2 border-accent bg-transparent px-8 font-body text-base font-semibold text-accent transition-colors hover:bg-accent/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Crear cuenta empresarial
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="border-t border-border bg-surface-elevated/50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
              Todo lo que tu negocio necesita
            </h2>
            <p className="mt-4 font-body text-lg text-primary-secondary">
              Herramientas pensadas para tiendas, talleres y distribuidores en Cuba
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <BenefitCard key={b.title} {...b} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" ref={plansRef} className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
              Planes para cada etapa
            </h2>
            <p className="mt-4 font-body text-lg text-primary-secondary">
              Elige el que mejor se adapte a tu negocio. Sin permanencia.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex flex-col rounded-[24px] border-2 bg-surface-elevated p-6 shadow-soft transition-all hover:shadow-card md:p-8 ${
                  plan.recommended
                    ? "border-accent shadow-card"
                    : "border-border hover:border-accent/50"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-body text-xs font-semibold text-white">
                    Recomendado
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-primary md:text-2xl">
                    {plan.name}
                  </h3>
                  <p className="mt-2 font-body text-sm text-primary-secondary">
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold text-accent md:text-4xl">
                      ${plan.priceMonthly}
                    </span>
                    <span className="font-body text-primary-muted">/mes</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f.text}
                      className={`flex items-center gap-2 font-body text-sm ${
                        f.included ? "text-primary-secondary" : "text-primary-muted line-through"
                      }`}
                    >
                      {f.included ? (
                        <Check className="h-4 w-4 shrink-0 text-accent" />
                      ) : (
                        <span className="h-4 w-4 shrink-0" />
                      )}
                      {f.text}
                    </li>
                  ))}
                </ul>
                <Link href={`/registro-empresarial?plan=${plan.id}`} className="mt-8 block">
                  <motion.span
                    className={`flex w-full items-center justify-center gap-2 rounded-button py-3 font-body font-semibold transition-colors ${
                      plan.recommended
                        ? "bg-accent text-white hover:bg-accent-hover"
                        : "border-2 border-border bg-surface text-primary hover:border-accent hover:bg-accent/10 hover:text-accent"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Elegir plan
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-border bg-surface-subtle/50 px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-[24px] border border-border bg-surface-elevated p-8 text-center shadow-soft md:p-12"
        >
          <Eye className="mx-auto h-12 w-12 text-accent" />
          <h2 className="mt-4 font-display text-2xl font-bold text-primary md:text-3xl">
            ¿Listo para vender más?
          </h2>
          <p className="mt-3 font-body text-primary-secondary">
            Crea tu cuenta empresarial en minutos y empieza a recibir contactos por WhatsApp.
          </p>
          <Link href="/registro-empresarial" className="mt-8 inline-block">
            <motion.span
              className="inline-flex h-12 items-center gap-2 rounded-button bg-accent px-8 font-body font-semibold text-white shadow-card hover:bg-accent-hover"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Comenzar ahora
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
