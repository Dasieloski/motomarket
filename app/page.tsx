import dynamic from "next/dynamic"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SearchBar } from "@/components/search-bar"

const PromoBanner = dynamic(() => import("@/components/promo-banner").then((mod) => mod.PromoBanner))
const Categories = dynamic(() => import("@/components/categories").then((mod) => mod.Categories))
const BrandStory = dynamic(() => import("@/components/brand-story").then((mod) => mod.BrandStory))
const FeaturedListings = dynamic(() =>
  import("@/components/featured-listings").then((mod) => mod.FeaturedListings)
)
const TrustSection = dynamic(() => import("@/components/trust-section").then((mod) => mod.TrustSection))
const BusinessCta = dynamic(() => import("@/components/business-cta").then((mod) => mod.BusinessCta))
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer))

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
