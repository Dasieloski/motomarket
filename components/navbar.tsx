"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { AnimatedIcon } from "@/components/ui/animated-icon"
import {
  Compass,
  Star,
  Building2,
  FileText,
  ShieldCheck,
  Bike,
  PlusCircle,
  User,
  LogOut,
  LogIn,
  Menu,
  X
} from "lucide-react"

const homeLinks = [
  { label: "Explorar", href: "#categorias", icon: Compass },
  { label: "Destacados", href: "#destacados", icon: Star },
  { label: "Para Negocios", href: "/para-negocios", icon: Building2 },
  { label: "Nuestra historia", href: "#historia", icon: FileText },
  { label: "Confianza", href: "#confianza", icon: ShieldCheck },
]

const internalLinks = [
  { label: "Ver destacados", href: "/motos-destacadas", icon: Star },
  { label: "Para Negocios", href: "/para-negocios", icon: Building2 },
  { label: "Mi cuenta", href: "/dashboard", icon: User },
  { label: "Ver todas las motos", href: "/motos", icon: Bike },
  { label: "Publicar / Vender", href: "/vender", icon: PlusCircle },
]

const SCROLL_THRESHOLD = 60
const NAV_HIDE_THRESHOLD = 50
const easeSmooth = [0.4, 0, 0.2, 1] as const

export function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const isHome = pathname === "/"
  const navLinks = isHome ? homeLinks : internalLinks
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > SCROLL_THRESHOLD)
      if (y < SCROLL_THRESHOLD) setVisible(true)
      else if (y > lastScrollY && y - lastScrollY > NAV_HIDE_THRESHOLD) setVisible(false)
      else if (lastScrollY - y > 8) setVisible(true)
      setLastScrollY(y)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: 1,
        }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className={`fixed left-0 right-0 top-0 z-50 flex h-16 items-center md:h-20 transition-all duration-500 ${scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 md:px-10 lg:px-14">
          {/* Logo */}
          <Link
            href="/"
            className="font-logo moto-logo-animation text-xl font-semibold tracking-tight text-white transition-colors duration-300 hover:text-accent md:text-2xl lg:text-3xl"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeSmooth }}
            >
              MotoMarket
            </motion.span>
          </Link>

          {/* Actions & Hamburger Toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/vender" className="hidden sm:block">
              <motion.button
                className="inline-flex h-10 items-center rounded-button bg-accent px-5 font-body text-sm font-semibold text-black shadow-glow transition-all duration-smooth hover:bg-accent-hover hover:shadow-[0_0_35px_rgba(252,163,17,0.3)] md:h-11 md:px-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: easeSmooth }}
              >
                Vender
              </motion.button>
            </Link>

            <motion.button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center p-2 text-white transition-colors duration-smooth"
              aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? (
                <AnimatedIcon icon={X} size={32} color="white" />
              ) : (
                <AnimatedIcon icon={Menu} size={32} color="white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Full menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeSmooth }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="fixed right-0 top-0 bottom-0 z-50 flex w-[min(400px,100vw)] flex-col gap-8 border-l border-white/[0.06] bg-surface-elevated px-10 pt-28 pb-12 shadow-card"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="flex items-center gap-4 font-body text-xl font-medium text-white/80 transition-colors hover:text-accent"
                    >
                      <AnimatedIcon icon={link.icon} size={28} color="white" />
                      <span>{link.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-white/[0.06] pt-8">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex items-center gap-4 font-body text-xl font-medium text-white/80 transition-colors hover:text-accent">
                        <AnimatedIcon icon={User} size={28} color="white" />
                        <span>Mi cuenta</span>
                      </div>
                    </Link>
                    <Link href="/vender" onClick={() => setMobileOpen(false)}>
                      <motion.button
                        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-button bg-accent px-6 font-body text-[15px] font-semibold text-black shadow-glow"
                      >
                        Vender
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={() => {
                        logout()
                        setMobileOpen(false)
                      }}
                      className="mt-2 inline-flex h-12 w-full items-center justify-center gap-3 rounded-button border border-white/10 bg-white/[0.04] px-6 font-body text-[15px] font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
                    >
                      <AnimatedIcon icon={LogOut} size={20} color="white" />
                      <span>Cerrar sesión</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-4 font-body text-xl font-medium text-white/80 transition-colors hover:text-accent"
                    >
                      <AnimatedIcon icon={LogIn} size={28} color="white" />
                      <span>Iniciar sesión</span>
                    </Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)}>
                      <motion.button
                        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-button bg-accent px-6 font-body text-[15px] font-semibold text-black shadow-glow"
                      >
                        Registrarse
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
