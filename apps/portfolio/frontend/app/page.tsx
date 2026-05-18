import { Navbar } from "@/components/portfolio/navbar"
import { HeroSection } from "@/components/portfolio/hero-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { ObservabilitySection } from "@/components/portfolio/observability-section"
import { FeaturedProjects } from "@/components/portfolio/featured-projects"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        <SkillsSection />
        <ObservabilitySection />
        <FeaturedProjects />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  )
}
