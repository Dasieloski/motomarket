"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"

export default function PerfilPage() {
  const { user } = useAuth()

  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-card border border-border bg-surface-elevated p-8 shadow-card"
        >
          <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
            Mi perfil
          </h1>
          <p className="mt-2 font-body text-sm text-primary-secondary">
            Zona de perfil. Próximamente podrás editar tus datos y preferencias.
          </p>
          {user && (
            <div className="mt-6 space-y-1 font-body text-sm text-primary-secondary">
              <p><span className="font-semibold">Nombre:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

