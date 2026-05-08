import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Felix Grimm",
  jobTitle: "Software Engineer & Researcher",
  affiliation: "Cornell University",
  description:
    "Cornell CS '27. Building at the edge of software and physical systems — multi-agent reinforcement learning, computer vision, embedded systems, geospatial.",
  url: "https://fjg188.github.io/portfolio/",
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main role="main" aria-label="Portfolio content">
          <HeroSection />
          <EducationSection />
          <ProjectsSection />
          <ExperienceSection />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
