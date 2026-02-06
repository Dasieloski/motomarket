import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "MotoMarket Cuba - Compra y vende motos con confianza",
  description:
    "El marketplace premium de motos, piezas y servicios verificados en Cuba. Compra y vende con seguridad y estilo.",
}

export const viewport: Viewport = {
  themeColor: "#f5f0eb",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
