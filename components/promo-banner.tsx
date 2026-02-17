"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { PremiumCard } from "@/components/ui/premium-card"

interface PromoBannerProps {
    title: string
    description: string
    ctaText: string
    ctaLink: string
    image?: string // Optional background image
}

export function PromoBanner({
    title = "Ofertas de Verano",
    description = "Descubre las mejores motos eléctricas con precios rebajados por tiempo limitado.",
    ctaText = "Ver Ofertas",
    ctaLink = "/motos?filter=ofertas",
}: Partial<PromoBannerProps>) {
    return (
        <section className="relative py-8 md:py-12">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <PremiumCard className="relative overflow-hidden p-0">
                        {/* Dynamic Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-950/90 to-black z-0" />

                        {/* Decorative Tech Elements */}
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12">

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 mb-4">
                                    <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                                    <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
                                        FEATURED
                                    </span>
                                </div>
                                <h3 className="font-technical text-2xl md:text-4xl text-white mb-3">
                                    {title}
                                </h3>
                                <p className="font-body text-primary-secondary text-sm md:text-base max-w-xl">
                                    {description}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="shrink-0">
                                <Link href={ctaLink}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative flex items-center gap-2 overflow-hidden rounded-button bg-white px-6 py-3 font-body text-sm font-bold text-black transition-all hover:bg-neutral-200"
                                    >
                                        <span>{ctaText}</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </motion.button>
                                </Link>
                            </div>

                        </div>

                        {/* Bottom Tech Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
                    </PremiumCard>
                </motion.div>
            </div>
        </section>
    )
}
