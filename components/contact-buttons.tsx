"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"

interface ContactButtonsProps {
  phone: string
  /** En cards el contenedor ya tiene separación; no añadir mt-4 */
  compact?: boolean
}

export function ContactButtons({ phone, compact }: ContactButtonsProps) {
  const cleanPhone = phone.replace(/\D/g, "")
  const whatsappUrl = `https://wa.me/${cleanPhone}`
  const telUrl = `tel:${phone}`

  return (
    <div className={compact ? "flex gap-2" : "mt-4 flex gap-2"}>
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-1 items-center justify-center gap-2 rounded-input bg-[#25D366] px-4 py-2.5 font-body text-sm font-medium text-white shadow-soft transition-all duration-smooth hover:bg-[#20BA5A] hover:shadow-card"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </motion.a>
      <motion.a
        href={telUrl}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-1 items-center justify-center gap-2 rounded-input border border-border bg-surface-elevated px-4 py-2.5 font-body text-sm font-medium text-primary transition-all duration-smooth hover:bg-surface-subtle hover:border-accent"
      >
        <Phone className="h-4 w-4" />
        Llamar
      </motion.a>
    </div>
  )
}
