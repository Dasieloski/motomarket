import React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Syne, Work_Sans } from "next/font/google"

import { ScrollProvider } from "@/components/scroll-provider"
import localFont from "next/font/local"
import { AuthProvider } from "@/contexts/auth-context"
import "lenis/dist/lenis.css"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800"],
  preload: true,
})

// Work Sans para texto de cuerpo - limpio y legible
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
})

const tenada = localFont({
  src: "../public/fonts/Tenada.ttf",
  variable: "--font-tenada",
  display: "optional",
})

export const metadata: Metadata = {
  title: "MotoMarket Cuba - Compra y vende motos con confianza",
  description:
    "El marketplace premium de motos, piezas y servicios verificados en Cuba. Compra y vende con seguridad y estilo.",
}

export const viewport: Viewport = {
  themeColor: "#050505", /* Updated to match new surface color */
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${workSans.variable} ${tenada.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <AuthProvider>
          <ScrollProvider>{children}</ScrollProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
