"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut, Star, User, Bike, Plus, Building2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import * as Tooltip from "@radix-ui/react-tooltip"

const homeLinks: Array<{ label: string; href: string; icon?: never }> = [
  { label: "Explorar", href: "#categorias" },
  { label: "Destacados", href: "#destacados" },
  { label: "Para Negocios", href: "/para-negocios" },
  { label: "Nuestra historia", href: "#historia" },
  { label: "Confianza", href: "#confianza" },
]

const internalLinks: Array<{ label: string; href: string; icon: typeof Star }> = [
  { label: "Ver destacados", href: "/motos-destacadas", icon: Star },
  { label: "Para Negocios", href: "/para-negocios", icon: Building2 },
  { label: "Mi cuenta", href: "/dashboard", icon: User },
  { label: "Ver todas las motos", href: "/motos", icon: Bike },
  { label: "Publicar / Vender mi moto", href: "/vender", icon: Plus },
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
        className={`fixed left-0 right-0 top-0 z-50 flex h-16 items-center md:h-20 transition-all duration-500 ${
          scrolled
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

          {/* Desktop links */}
          <div className="hidden items-center gap-5 md:flex md:gap-6 lg:gap-7">
            {isHome ? (
              navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav-link-underline font-body text-sm font-medium tracking-tight text-white/70 transition-colors duration-300 hover:text-white md:text-[15px]"
                >
                  {link.label}
                </Link>
              ))
            ) : (
              <Tooltip.Provider delayDuration={200}>
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Tooltip.Root key={link.label}>
                      <Tooltip.Trigger asChild>
                        <Link href={link.href}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-input p-2.5 text-white/50 transition-colors duration-smooth hover:bg-white/[0.06] hover:text-accent"
                          >
                            <Icon className="h-5 w-5" />
                          </motion.button>
                        </Link>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="bottom"
                          className="rounded-input bg-surface-elevated px-3 py-1.5 font-body text-xs font-medium text-white shadow-card border border-white/[0.06]"
                          sideOffset={5}
                        >
                          {link.label}
                          <Tooltip.Arrow className="fill-surface-elevated" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  )
                })}
              </Tooltip.Provider>
            )}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-5 md:flex lg:gap-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="font-body text-[15px] font-medium text-white/60 transition-colors duration-smooth hover:text-white"
                >
                  Mi cuenta
                </Link>
                <Link href="/vender">
                  <motion.button
                    className="inline-flex h-11 items-center rounded-button bg-accent px-6 font-body text-[15px] font-semibold text-black shadow-glow transition-all duration-smooth hover:bg-accent-hover hover:shadow-[0_0_35px_rgba(252,163,17,0.3)] md:h-12 md:px-7"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.4, ease: easeSmooth }}
                  >
                    Vender mi moto
                  </motion.button>
                </Link>
                <motion.button
                  onClick={logout}
                  className="inline-flex h-11 items-center rounded-button border border-white/10 bg-white/[0.04] px-4 font-body text-[15px] font-medium text-white/60 transition-all duration-smooth hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: easeSmooth }}
                >
                  <LogOut className="h-4 w-4" />
                </motion.button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-body text-[15px] font-medium text-white/60 transition-colors duration-smooth hover:text-white"
                >
                  Iniciar sesion
                </Link>
                <Link href="/register">
                  <motion.button
                    className="inline-flex h-11 items-center rounded-button bg-accent px-6 font-body text-[15px] font-semibold text-black shadow-glow transition-all duration-smooth hover:bg-accent-hover hover:shadow-[0_0_35px_rgba(252,163,17,0.3)] md:h-12 md:px-7"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.4, ease: easeSmooth }}
                  >
                    Registrarse
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <motion.button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white transition-colors duration-smooth md:hidden"
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
            whileTap={{ scale: 0.95 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeSmooth }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="fixed right-0 top-0 bottom-0 z-50 flex w-[min(300px,88vw)] flex-col gap-8 border-l border-white/[0.06] bg-surface-elevated px-8 pt-28 pb-12 shadow-card md:hidden"
            >
              {navLinks.map((link, i) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="flex items-center gap-3 font-body text-[17px] font-medium text-white/80 transition-colors hover:text-accent"
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span>{link.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-[17px] font-medium text-white/80 transition-colors hover:text-accent"
                  >
                    Mi cuenta
                  </Link>
                  <Link href="/vender" onClick={() => setMobileOpen(false)}>
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-button bg-accent px-6 font-body text-[15px] font-semibold text-black shadow-glow"
                    >
                      Vender mi moto
                    </motion.button>
                  </Link>
                  <motion.button
                    onClick={() => {
                      logout()
                      setMobileOpen(false)
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-button border border-white/10 bg-white/[0.04] px-6 font-body text-[15px] font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesion
                  </motion.button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-[17px] font-medium text-white/80 transition-colors hover:text-accent"
                  >
                    Iniciar sesion
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-button bg-accent px-6 font-body text-[15px] font-semibold text-black shadow-glow"
                    >
                      Registrarse
                    </motion.button>
                  </Link>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
