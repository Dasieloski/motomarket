"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

import { useAuth } from "@/contexts/auth-context"
import { PremiumInput } from "@/components/ui/premium-input"
import { PremiumButton } from "@/components/ui/premium-button"

const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido").min(1, "El email es requerido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { register: registerUser, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)

    const result = await registerUser(data.name, data.email, data.password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Error al registrarse")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-surface">
      <div className="flex min-h-screen items-center justify-center px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md"
        >
          <div className="rounded-card border border-border bg-surface-elevated p-8 shadow-card md:p-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-center"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-primary/20">
                <Sparkles className="h-7 w-7 text-accent" />
              </div>
              <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
                Crea tu cuenta
              </h1>
              <p className="mt-2 font-body text-[15px] text-primary-secondary">
                Únete a MotoMarket y comienza a vender
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-input border border-red-400 bg-red-50/50 p-4"
                >
                  <p className="font-body text-sm font-medium text-red-600">{error}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PremiumInput
                  label="Nombre completo"
                  type="text"
                  placeholder="Juan Pérez"
                  icon={<User className="h-4 w-4" />}
                  error={errors.name?.message}
                  {...register("name")}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <PremiumInput
                  label="Email"
                  type="email"
                  placeholder="tu@email.com"
                  icon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                  {...register("email")}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <PremiumInput
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  error={errors.password?.message}
                  {...register("password")}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <PremiumInput
                  label="Confirmar contraseña"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <PremiumButton
                  type="submit"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Crear cuenta
                  <ArrowRight className="h-4 w-4" />
                </PremiumButton>
              </motion.div>
            </form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-center"
            >
              <p className="font-body text-sm text-primary-secondary">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
