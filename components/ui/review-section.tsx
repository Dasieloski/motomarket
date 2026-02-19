"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, X } from "lucide-react"
import type { Review } from "@/contexts/auth-context"
import { PremiumButton } from "./premium-button"
import { PremiumCard } from "./premium-card"

interface ReviewSectionProps {
  reviews?: Review[]
  onAddReview: (review: Omit<Review, "id" | "createdAt">) => void
  isLoggedIn?: boolean
}

export function ReviewSection({ reviews = [], onAddReview, isLoggedIn = false }: ReviewSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [text, setText] = useState("")
  const [reviewerName, setReviewerName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!text.trim() || !reviewerName.trim()) {
      alert("Por favor completa todos los campos")
      return
    }

    setIsSubmitting(true)
    
    // Simular delay para enviar la reseña
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onAddReview({
      rating,
      text: text.trim(),
      reviewerName: reviewerName.trim(),
    })

    // Reset form
    setText("")
    setReviewerName("")
    setRating(5)
    setIsOpen(false)
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-4">
      {/* Rating Summary */}
      <div className="flex items-center gap-4">
        <div>
          <div className="text-3xl font-bold text-primary">
            {typeof averageRating === 'string' ? averageRating : averageRating}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(Number(averageRating))
                    ? "fill-accent text-accent"
                    : "text-border"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-primary-muted mt-1">
            {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <PremiumCard className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < review.rating
                                ? "fill-accent text-accent"
                                : "text-border"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-primary-muted">
                        {new Date(review.createdAt).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                    <p className="font-body text-sm font-medium text-primary">
                      {review.reviewerName}
                    </p>
                    <p className="font-body text-sm text-primary-secondary mt-2 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Review Button */}
      {isLoggedIn && (
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PremiumButton
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="w-full"
              >
                Dejar una reseña
              </PremiumButton>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="space-y-3 overflow-hidden"
            >
              <PremiumCard className="p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-primary-secondary mb-2">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Tu nombre o apodo"
                    className="w-full px-3 py-2 rounded-input border border-border bg-surface-elevated text-primary text-sm focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-secondary mb-2">
                    Calificación
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            value <= rating
                              ? "fill-accent text-accent"
                              : "text-border"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-secondary mb-2">
                    Tu reseña
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Comparte tu experiencia con esta publicación..."
                    maxLength={500}
                    className="w-full h-24 px-3 py-2 rounded-input border border-border bg-surface-elevated text-primary text-sm focus:border-accent focus:outline-none resize-none"
                  />
                  <p className="text-xs text-primary-muted mt-1">
                    {text.length}/500
                  </p>
                </div>

                <div className="flex gap-2">
                  <PremiumButton
                    type="submit"
                    isLoading={isSubmitting}
                    className="flex-1"
                  >
                    Publicar reseña
                  </PremiumButton>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-input border border-border hover:bg-surface-subtle text-primary-secondary transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </PremiumCard>
            </motion.form>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
