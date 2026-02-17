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
      <PromoBanner />
      <Categories />
      <BrandStory />
      <FeaturedListings />
      <TrustSection />
      <BusinessCta />
      <Footer />
    </main>
  )
}
