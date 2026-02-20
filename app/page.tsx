import dynamic from "next/dynamic"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SearchBar } from "@/components/search-bar"

const PromoBanner = dynamic(() => import("@/components/promo-banner").then((mod) => mod.PromoBanner), {
  loading: () => <div className="h-20 bg-surface" />,
})
const Categories = dynamic(() => import("@/components/categories").then((mod) => mod.Categories), {
  loading: () => <div className="h-60 bg-surface" />,
})
const BrandStory = dynamic(() => import("@/components/brand-story").then((mod) => mod.BrandStory), {
  loading: () => <div className="h-96 bg-surface" />,
})
const FeaturedListings = dynamic(() =>
  import("@/components/featured-listings").then((mod) => mod.FeaturedListings),
  {
    loading: () => <div className="h-96 bg-surface" />,
  }
)
const TrustSection = dynamic(() => import("@/components/trust-section").then((mod) => mod.TrustSection), {
  loading: () => <div className="h-64 bg-surface" />,
})
const BusinessCta = dynamic(() => import("@/components/business-cta").then((mod) => mod.BusinessCta), {
  loading: () => <div className="h-80 bg-surface" />,
})
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer), {
  loading: () => <div className="h-40 bg-surface" />,
})

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
