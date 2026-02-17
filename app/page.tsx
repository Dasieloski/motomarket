import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SearchBar } from "@/components/search-bar"
import { PromoBanner } from "@/components/promo-banner" // Import
import { Categories } from "@/components/categories"
import { BrandStory } from "@/components/brand-story"
import { FeaturedListings } from "@/components/featured-listings"
import { TrustSection } from "@/components/trust-section"
import { BusinessCta } from "@/components/business-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <SearchBar />
      <PromoBanner
        title="Vende tu Moto en Minutos"
        description="Publica tu anuncio gratis y llega a miles de compradores en toda Cuba. Sistema seguro y verificado."
        ctaText="Publicar Ahora"
        ctaLink="/vender"
      />
      <Categories />
      <BrandStory />
      <FeaturedListings />
      <TrustSection />
      <BusinessCta />
      <Footer />
    </main>
  )
}
