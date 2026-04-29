"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Circle } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

type RoleColor = "purple" | "teal" | "blue"

type Experience = {
  title: string
  company: string
  location: string
  period: string
  type: string
  color: RoleColor
  description: string
  skills: string[]
}

const experiences: Experience[] = [
  {
    title: "Undergraduate Research Assistant",
    company: "AIRLAB (Artificial Intelligence Robotics Lab) - Cornell Tech",
    location: "Ithaca, NY",
    period: "February 2025 - Present",
    type: "Research",
    color: "blue",
    description:
      "Undergraduate Research Assistant on Multi-Agent Reinforcement Learning for human–robot collaboration in healthcare and beyond. Publication: https://arxiv.org/abs/2511.14135",
    skills: ["MARL", "benchmarking", "Machine Learning", "PyTorch"],
  },
  {
    title: "Research and Development Analyst",
    company: "Cornell DEBUT - Project Team",
    location: "Ithaca, NY",
    period: "September 2025 - Present",
    type: "Project Team",
    color: "blue",
    description:
      "Worked on a team developing a low cost ADHD diagnostic tool by integrating computer vision and wearable technology to track behavioral markers. Engineered a pupil-tracking pipeline using a DeepLabCut CNN to extract and derive biomarkers like velocity and vergence. Trained a logistic regression classifier using MLE to map these features to diagnostic probabilities.",
    skills: [
      "Product Development",
      "Wearable Technology",
      "Embedded Systems",
      "C/C++",
      "Computer Vision",
      "Machine Learning",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "VegaMX",
    location: "New York, NY",
    period: "June 2025 - August 2025",
    type: "Internship",
    color: "blue",
    description:
      "Modeled wildfire risk for critical infrastructure building a geospatial pipeline that fuses satellite (MODIS) and climate (GRIDMET) data with infrastructure asset locations. Computed pixel-level correlations (e.g., Spearman) between vegetation, temperature, wind, drought, and historical fire perimeters to generate features and prototype a risk-scoring function for buildings and electric-grid assets.",
    skills: [
      "Geospatial",
      "xarray",
      "NumPy",
      "GeoPandas",
      "Jupyter",
      "feature engineering",
      "CRS/projection handling",
      "data visualization",
      "Dask",
      "Zarr",
      "matplotlib",
    ],
  },
]

const colorStyles: Record<
  RoleColor,
  {
    pillBg: string
    pillText: string
    logoGlow: string
    pingBg: string
    accent: string
    placeholderIcon: string
    hoverGlow: string
  }
> = {
  purple: {
    pillBg: "bg-purple-400/10",
    pillText: "text-purple-400",
    logoGlow: "shadow-lg shadow-purple-500/30",
    pingBg: "bg-purple-400",
    accent: "text-purple-400",
    placeholderIcon: "text-purple-400/50",
    hoverGlow: "shadow-2xl shadow-purple-500/30",
  },
  teal: {
    pillBg: "bg-teal-400/10",
    pillText: "text-teal-400",
    logoGlow: "shadow-lg shadow-teal-500/30",
    pingBg: "bg-teal-400",
    accent: "text-teal-400",
    placeholderIcon: "text-teal-400/50",
    hoverGlow: "shadow-2xl shadow-teal-500/30",
  },
  blue: {
    pillBg: "bg-blue-400/10",
    pillText: "text-blue-400",
    logoGlow: "shadow-lg shadow-blue-500/30",
    pingBg: "bg-blue-400",
    accent: "text-blue-400",
    placeholderIcon: "text-blue-400/50",
    hoverGlow: "shadow-2xl shadow-blue-500/30",
  },
}

const MAX_TILT_DEG = 3

function ExperienceCard({
  experience,
  index,
  isVisible,
}: {
  experience: Experience
  index: number
  isVisible: boolean
}) {
  const c = colorStyles[experience.color]
  const isActive = experience.period.toLowerCase().includes("present")

  // Slide-in / spine-reach choreography
  const baseDelay = 400
  const cardDelay = baseDelay + index * 300
  const logoDelay = cardDelay - 50
  const connectorDelay = cardDelay - 100
  const slideDuration = 700

  // Hover/tilt state
  const perspectiveRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hasBeenHovered, setHasBeenHovered] = useState(false)
  const [interactionsEnabled, setInteractionsEnabled] = useState(false)
  const [canHover, setCanHover] = useState(true)

  // Detect hover-capable input (desktop pointer vs touch)
  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(mql.matches)
    update()
    mql.addEventListener?.("change", update)
    return () => mql.removeEventListener?.("change", update)
  }, [])

  // Only enable tilt/hover-reveal after slide-in completes, so nothing fights the entrance
  useEffect(() => {
    if (!isVisible) return
    const t = window.setTimeout(() => setInteractionsEnabled(true), cardDelay + slideDuration + 50)
    return () => window.clearTimeout(t)
  }, [isVisible, cardDelay])

  // Touch devices: reveal description by default and skip tilt entirely
  const showDescription = !canHover ? true : hasBeenHovered

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactionsEnabled || !canHover) return
    const el = perspectiveRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const xPx = e.clientX - rect.left
    const yPx = e.clientY - rect.top
    const xRel = (xPx - rect.width / 2) / (rect.width / 2)
    const yRel = (yPx - rect.height / 2) / (rect.height / 2)
    setTilt({ x: -yRel * MAX_TILT_DEG, y: xRel * MAX_TILT_DEG })
    setMouse({ x: xPx, y: yPx })
  }

  const handleMouseEnter = () => {
    if (!interactionsEnabled || !canHover) return
    setIsHovering(true)
    setHasBeenHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div className="relative pl-24 sm:pl-32">
      {/* Logo placeholder — centered on the spine */}
      <div
        className={`absolute left-0 sm:left-4 top-2 h-16 w-16 rounded-full bg-muted ring-1 ring-border flex items-center justify-center ${c.logoGlow} transition-all duration-700 ease-out z-10`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.5)",
          transitionDelay: `${logoDelay}ms`,
        }}
        aria-hidden
      >
        {/* TODO: replace with <Image> company logo */}
        <Circle className={`h-6 w-6 ${c.placeholderIcon}`} strokeWidth={1.5} />
      </div>

      {/* Horizontal connector — draws from spine to card */}
      <div
        className="absolute left-16 sm:left-20 top-10 h-px w-8 sm:w-12 origin-left bg-gradient-to-r from-border to-border/40 ease-out"
        style={{
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transitionProperty: "transform",
          transitionDuration: "500ms",
          transitionDelay: `${connectorDelay}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden
      />

      {/* Slide-in wrapper (entrance animation) */}
      <div
        className="transition-all ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(60px)",
          transitionDuration: `${slideDuration}ms`,
          transitionDelay: `${cardDelay}ms`,
        }}
      >
        {/* Perspective wrapper — measured for cursor position, never rotates */}
        <div
          ref={perspectiveRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
          className="will-change-transform"
        >
          {/* Tilt rotator — applies the rotateX/Y transform */}
          <div
            className="ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                isHovering ? 1.01 : 1
              })`,
              transformStyle: "preserve-3d",
              transitionProperty: "transform, box-shadow",
              transitionDuration: isHovering ? "150ms" : "400ms",
              willChange: "transform",
            }}
          >
            <Card className="relative overflow-hidden shadow-md transition-shadow duration-500 ease-out">
              {/* Hero image */}
              <div className="relative aspect-video overflow-hidden">
                {/* TODO: replace with role-specific hero image */}
                <Image
                  src="/portfolio/experience-placeholder.png"
                  alt={`${experience.company} hero image`}
                  width={800}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out"
                  style={{ transform: isHovering ? "scale(1.05)" : "scale(1)" }}
                />
                {/* Gradient overlay fading into card background */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none"
                  aria-hidden
                />
              </div>

              {/* Active role indicator */}
              {isActive && (
                <div className="absolute top-3 right-3 z-20 group">
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full ${c.pingBg} opacity-75`}
                    />
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${c.pingBg}`}
                    />
                  </span>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute top-full right-0 mt-2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
                  >
                    Currently active
                  </span>
                </div>
              )}

              <CardHeader>
                {/* Role type pill */}
                <div className="mb-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${c.pillBg} ${c.pillText}`}
                  >
                    {experience.type}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl text-primary">{experience.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-accent mt-1">
                      {experience.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {experience.period}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {experience.location}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Tags row: 3 + overflow when collapsed, all when revealed */}
                <div className="flex flex-wrap gap-2">
                  {(showDescription ? experience.skills : experience.skills.slice(0, 3)).map(
                    (skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs animate-fade-in-scale"
                      >
                        {skill}
                      </Badge>
                    ),
                  )}
                  {!showDescription && experience.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{experience.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>

              {/* Description reveal — animates height (grid trick) + opacity + translateY */}
              <div
                className="grid transition-[grid-template-rows] duration-500 ease-out"
                style={{
                  gridTemplateRows: showDescription ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <CardContent className="pt-0">
                    <div
                      className="border-t border-border/60 pt-4 pb-2 ease-out"
                      style={{
                        opacity: showDescription ? 1 : 0,
                        transform: showDescription ? "translateY(0)" : "translateY(-10px)",
                        transitionProperty: "opacity, transform",
                        transitionDuration: "400ms",
                        transitionDelay: showDescription ? "120ms" : "0ms",
                      }}
                    >
                      <p className="text-foreground leading-relaxed">{experience.description}</p>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>

            {/* Cursor-tracking spotlight border halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{
                padding: "1.5px",
                background: `radial-gradient(220px circle at ${mouse.x}px ${mouse.y}px, var(--accent), transparent 70%)`,
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                maskComposite: "exclude",
                opacity: isHovering ? 1 : 0,
                transition: "opacity 300ms ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My experience so far.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Spine track (full-height background) */}
          <div
            className="absolute left-8 sm:left-12 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border/30"
            aria-hidden
          />
          {/* Spine draw-on (gradient grows from top) */}
          <div
            className="absolute left-8 sm:left-12 top-0 w-0.5 -translate-x-1/2 overflow-hidden"
            style={{ bottom: 0 }}
            aria-hidden
          >
            <div
              className="w-full bg-gradient-to-b from-accent via-accent/70 to-muted/30 ease-out"
              style={{
                height: isVisible ? "100%" : "0%",
                transitionProperty: "height",
                transitionDuration: "1800ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                experience={experience}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
