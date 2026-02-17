"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { PremiumCard } from "@/components/ui/premium-card"

export interface PromoSlide {
    id: string
    image: string
    title?: string
    tag?: string
    link?: string
}

interface PromoBannerProps {
    slides?: PromoSlide[]
    autoPlayInterval?: number
}

const defaultSlides: PromoSlide[] = [
    {
        id: "1",
        image: "/images/promo-1.jpg",
        title: "Nuevos Modelos 2025",
        tag: "Lanzamiento",
        link: "/motos?filter=nuevas"
    },
    {
        id: "2",
        image: "/images/promo-2.jpg",
        title: "Ofertas de Verano",
        tag: "Descuentos",
        link: "/motos?filter=ofertas"
    },
    {
        id: "3",
        image: "/images/promo-3.jpg",
        title: "Accesorios Premium",
        tag: "Gear",
        link: "/motos?category=accesorios"
    },
]

export function PromoBanner({
    slides = defaultSlides,
    autoPlayInterval = 5000,
}: PromoBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, autoPlayInterval)

        return () => clearInterval(timer)
    }, [currentIndex, autoPlayInterval])

    const nextSlide = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    }

    // Fallback gradients if images are missing
    const getGradient = (index: number) => {
        const gradients = [
            "from-blue-900 via-slate-900 to-black",
            "from-purple-900 via-slate-900 to-black",
            "from-emerald-900 via-slate-900 to-black",
        ]
        return gradients[index % gradients.length]
    }

    const activeSlide = slides[currentIndex]

    // Wrapper for link or div
    const SlideContent = ({ children }: { children: React.ReactNode }) => {
        if (activeSlide.link) {
            return (
                <Link href={activeSlide.link} className="absolute inset-0 block cursor-pointer">
                    {children}
                </Link>
            )
        }
        return <div className="absolute inset-0">{children}</div>
    }

    return (
        <section className="relative py-6 md:py-12">
            <div className="container mx-auto px-3 md:px-6">
                <div className="relative">
                    <PremiumCard className="relative overflow-hidden p-0 aspect-[16/9] md:aspect-[3/1]">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={activeSlide.id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                                className="absolute inset-0"
                            >
                                <SlideContent>
                                    {/* Background Image or Fallback Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${getGradient(currentIndex)}`}>
                                        {activeSlide.image && !activeSlide.image.includes("promo-") && (
                                            <Image
                                                src={activeSlide.image}
                                                alt={activeSlide.title || "Promo"}
                                                fill
                                                className="object-cover opacity-60 mix-blend-overlay"
                                                onError={(e) => e.currentTarget.style.display = 'none'}
                                            />
                                        )}
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {activeSlide.tag && (
                                                <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 px-3 py-1 mb-2 backdrop-blur-sm">
                                                    <Sparkles className="w-3 h-3 text-accent" />
                                                    <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
                                                        {activeSlide.tag}
                                                    </span>
                                                </div>
                                            )}
                                            {activeSlide.title && (
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-technical text-2xl md:text-4xl text-white">
                                                        {activeSlide.title}
                                                    </h3>
                                                    {activeSlide.link && (
                                                        <ChevronRight className="w-6 h-6 text-white/50 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </SlideContent>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="absolute inset-0 z-10 flex items-center justify-between p-4 pointer-events-none">
                            <button
                                onClick={prevSlide}
                                className="pointer-events-auto p-2 rounded-full bg-black/20 backdrop-blur-md text-white/50 hover:text-white hover:bg-black/40 transition-all border border-white/5 hover:border-white/20"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="pointer-events-auto p-2 rounded-full bg-black/20 backdrop-blur-md text-white/50 hover:text-white hover:bg-black/40 transition-all border border-white/5 hover:border-white/20"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Indicators */}
                        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1)
                                        setCurrentIndex(index)
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Tech Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-30 z-20 pointer-events-none">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            </div>
                        </div>
                    </PremiumCard>
                </div>
            </div>
        </section>
    )
}
