import React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Syne, Work_Sans } from "next/font/google"

import { ScrollProvider } from "@/components/scroll-provider"
import { AuthProvider } from "@/contexts/auth-context"
import "lenis/dist/lenis.css"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

// Mirabelle ahora se carga localmente, no desde Google Fonts

// Work Sans para texto de cuerpo - limpio y legible
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "MotoMarket Cuba - Compra y vende motos con confianza",
  description:
    "El marketplace premium de motos, piezas y servicios verificados en Cuba. Compra y vende con seguridad y estilo.",
}

export const viewport: Viewport = {
  themeColor: "#F6F7F9",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${syne.variable} ${workSans.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <AuthProvider>
          <ScrollProvider>{children}</ScrollProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
