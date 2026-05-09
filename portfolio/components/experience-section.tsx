"use client"

import { useEffect, useRef, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { SectionHeader } from "@/components/section-header"

type Experience = {
  title: string
  company: string
  shortCompany: string
  location: string
  period: string
  type: string
  description: string
  skills: string[]
}

const experiences: Experience[] = [
      {
    title: "Software Developer Intern",
    company: "Amazon · AWS",
    shortCompany: "AWS",
    location: "New York, NY",
    period: "May 2026 — Present",
    type: "Internship",
    description: "",
    skills: [
    ],
  },  
  {
    title: "R&D Analyst",
    company: "Cornell DEBUT · Project Team",
    shortCompany: "DEBUT",
    location: "Ithaca, NY",
    period: "Sep 2025 — Present",
    type: "Project Team",
    description:
      "Developing a low-cost ADHD diagnostic tool that fuses computer vision and wearable sensors. Engineered a pupil-tracking pipeline using a DeepLabCut CNN to derive biomarkers (velocity, vergence) and trained a logistic-regression classifier (MLE) mapping features to diagnostic probabilities.",
    skills: [
      "Product Development",
      "Wearable Tech",
      "Embedded Systems",
      "C/C++",
      "Computer Vision",
      "Machine Learning",
    ],
  },
  {
    title: "Undergraduate Research Assistant",
    company: "AIRLAB · Cornell Tech",
    shortCompany: "AIRLAB",
    location: "Ithaca, NY",
    period: "Feb 2025 — Present",
    type: "Research",
    description:
      "Multi-Agent Reinforcement Learning for human–robot collaboration in healthcare and beyond. Co-author on a recent publication at arxiv.org/abs/2511.14135.",
    skills: ["MARL", "Benchmarking", "Machine Learning", "PyTorch"],
  },

  {
    title: "Software Engineer Intern",
    company: "VegaMX",
    shortCompany: "VegaMX",
    location: "New York, NY",
    period: "Jun 2025 — Aug 2025",
    type: "Internship",
    description:
      "Modeled wildfire risk for critical infrastructure: built a geospatial pipeline fusing satellite (MODIS) and climate (GRIDMET) data with infrastructure asset locations. Computed pixel-level correlations (e.g., Spearman) between vegetation, temperature, wind, drought, and historical fire perimeters to generate features and prototype a risk-scoring function for buildings and electric-grid assets.",
    skills: [
      "Geospatial",
      "xarray",
      "NumPy",
      "GeoPandas",
      "Dask",
      "Zarr",
      "Feature Engineering",
      "Matplotlib",
    ],
  },
]

const MAX_TILT_DEG = 2

function ExperienceCard({
  experience,
  index,
  isVisible,
}: {
  experience: Experience
  index: number
  isVisible: boolean
}) {
  const isActive = experience.period.toLowerCase().includes("present")

  // Choreography
  const baseDelay = 400
  const cardDelay = baseDelay + index * 240
  const markerDelay = cardDelay - 80
  const connectorDelay = cardDelay - 120
  const slideDuration = 700

  // Hover/tilt state
  const perspectiveRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hasBeenHovered, setHasBeenHovered] = useState(false)
  const [interactionsEnabled, setInteractionsEnabled] = useState(false)
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(mql.matches)
    update()
    mql.addEventListener?.("change", update)
    return () => mql.removeEventListener?.("change", update)
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const t = window.setTimeout(
      () => setInteractionsEnabled(true),
      cardDelay + slideDuration + 50,
    )
    return () => window.clearTimeout(t)
  }, [isVisible, cardDelay])

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
    <div className="relative pl-16 sm:pl-24">
      {/* Spine marker — mono numbered ring */}
      <div
        className="absolute left-0 top-3 z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-ink/40 bg-bone transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.6)",
          transitionDelay: `${markerDelay}ms`,
        }}
        aria-hidden
      >
        <span className="meta-lg text-ink num-tab">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Horizontal connector — draws from spine to card */}
      <div
        className="absolute left-12 sm:left-14 top-9 h-px w-4 sm:w-10 origin-left bg-ink/30 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transitionProperty: "transform",
          transitionDuration: "500ms",
          transitionDelay: `${connectorDelay}ms`,
        }}
        aria-hidden
      />

      {/* Slide-in wrapper */}
      <div
        className="transition-all ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(40px)",
          transitionDuration: `${slideDuration}ms`,
          transitionDelay: `${cardDelay}ms`,
        }}
      >
        {/* Perspective wrapper */}
        <div
          ref={perspectiveRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px" }}
          className="will-change-transform"
        >
          {/* Tilt rotator */}
          <div
            className="relative ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                isHovering ? 1.005 : 1
              })`,
              transformStyle: "preserve-3d",
              transitionProperty: "transform",
              transitionDuration: isHovering ? "150ms" : "400ms",
              willChange: "transform",
            }}
          >
            <article className="relative border border-ink/25 bg-bone transition-colors duration-300 hover:border-ink/60">
              {/* Top metadata strip */}
              <header className="flex items-baseline justify-between gap-3 border-b border-rule px-5 py-3">
                <span className="meta-lg text-ink">
                  <span className="text-ink-3">TYPE</span>
                  <span className="text-ink-4">&nbsp;/&nbsp;</span>
                  {experience.type.toUpperCase()}
                </span>
                <span className="meta text-ink-4 num-tab">
                  {experience.period.toUpperCase()}
                </span>
              </header>

              {/* Active indicator — top right corner */}
              {isActive && (
                <div className="group/active absolute -top-2 -right-2 z-20">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-carnelian opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-carnelian ring-2 ring-bone" />
                  </span>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap border border-rule bg-bone px-2 py-1 meta text-ink shadow-[2px_2px_0_0_var(--ink)] opacity-0 transition-opacity duration-200 group-hover/active:opacity-100"
                  >
                    CURRENTLY ACTIVE
                  </span>
                </div>
              )}

              {/* Body */}
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-2xl sm:text-[1.75rem] text-ink leading-[1.1] tracking-[-0.015em]">
                      {experience.title}
                    </h3>
                    <p className="mt-1 text-ink-2 text-base">
                      {experience.company}
                    </p>
                  </div>
                  <p className="meta text-ink-4 shrink-0 sm:pt-2">
                    {experience.location.toUpperCase()}
                  </p>
                </div>

                {/* Skills row — mono dot-separated, with overflow when collapsed */}
                <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  {(showDescription ? experience.skills : experience.skills.slice(0, 4)).map(
                    (skill, i, arr) => (
                      <span key={skill} className="meta text-ink-3 num-tab">
                        {skill.toUpperCase()}
                        {i < arr.length - 1 && (
                          <span className="ml-1.5 text-ink-4">&middot;</span>
                        )}
                      </span>
                    ),
                  )}
                  {!showDescription && experience.skills.length > 4 && (
                    <span className="meta text-ink-4 num-tab">
                      &nbsp;+&nbsp;{experience.skills.length - 4}&nbsp;more
                    </span>
                  )}
                </div>

                {/* Description reveal — grid template rows trick */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{
                    gridTemplateRows: showDescription ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="mt-5 border-t border-rule pt-4 ease-out"
                      style={{
                        opacity: showDescription ? 1 : 0,
                        transform: showDescription ? "translateY(0)" : "translateY(-6px)",
                        transitionProperty: "opacity, transform",
                        transitionDuration: "400ms",
                        transitionDelay: showDescription ? "120ms" : "0ms",
                      }}
                    >
                      <p className="text-ink-2 text-sm sm:text-[0.9375rem] leading-relaxed">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover hint when collapsed (desktop only) */}
                {canHover && !showDescription && (
                  <p className="mt-4 meta text-ink-4 transition-opacity duration-300">
                    HOVER TO EXPAND&nbsp;
                    <span className="text-ink-3">↓</span>
                  </p>
                )}
              </div>
            </article>

            {/* Cursor-tracking spotlight halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                padding: "1px",
                background: `radial-gradient(180px circle at ${mouse.x}px ${mouse.y}px, var(--carnelian), transparent 70%)`,
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
  const { ref, isVisible } = useScrollAnimation(0.05)

  return (
    <section
      id="experience"
      ref={ref}
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      aria-label="Experience"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03"
          label="EXPERIENCE"
          title={
            <>
              Where I've <span className="italic text-carnelian serif-alt">been</span>
              <span className="text-carnelian">.</span>
            </>
          }
          meta={`${String(experiences.length).padStart(2, "0")} ROLES`}
          isVisible={isVisible}
        >
          {/* could add something interesting here blurb thing if I want*/}
          <span className="font-serif italic text-ink-2">
            Some of the places I have worked at in the past and present and what I did there.
            Im always looking for fun cool oppurtunities from which I can grow as a software engineer 
            and as a person.
          </span>
        </SectionHeader>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Spine track (full-height background) */}
          <div
            className="absolute left-6 sm:left-7 top-3 bottom-3 w-px bg-rule"
            aria-hidden
          />
          {/* Spine draw-on */}
          <div
            className="absolute left-6 sm:left-7 top-3 w-px overflow-hidden"
            style={{ bottom: "0.75rem" }}
            aria-hidden
          >
            <div
              className="w-full bg-gradient-to-b from-ink via-ink/60 to-rule ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                height: isVisible ? "100%" : "0%",
                transitionProperty: "height",
                transitionDuration: "1800ms",
                transitionDelay: "200ms",
              }}
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.shortCompany}
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
