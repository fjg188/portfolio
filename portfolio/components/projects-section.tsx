"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { SectionHeader } from "@/components/section-header"
import { asset } from "@/lib/asset"

type Project = {
  fig: string
  title: string
  description: string
  image?: string
  technologies: string[]
  links: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    fig: "01",
    title: "BirdSense",
    description:
      "A bird-feeder camera that spots and identifies species in real time. YOLO for detection, a PyTorch ViT classifier I trained (~92% on 200+ species), piped through AWS (Lambda · S3 · MongoDB) to a Next.js front-end.",
    image: "/home-page.png",
    technologies: [
      "Python",
      "PyTorch",
      "YOLO",
      "Transformers",
      "AWS Lambda",
      "MongoDB",
      "Next.js",
      "TypeScript",
    ],
    links: [
      { label: "Source", href: "https://github.com/fjg188/BirdSense" },
      { label: "Live", href: "https://birdsense.vercel.app/" },
    ],
  },
  {
    fig: "02",
    title: "Marble Mayhem",
    description:
      "A tilt-controlled marble maze on an FRDM board. Read the onboard accelerometer over I²C and stream state via UART to a Python GUI that procedurally generates mazes via recursive backtracking.",
    image: "/marble-mayhem.png",
    technologies: ["C", "Embedded", "I²C", "UART", "Python"],
    links: [
      { label: "Source", href: "https://github.com/fjg188/MarbleMayhem" },
      { label: "Demo", href: "https://youtu.be/zWesUXPY7sg" },
    ],
  },
  {
    fig: "03",
    title: "Automato",
    description:
      "Hackathon mobile app that turns short-form videos (TikToks, Reels, Shorts) into organized, searchable notes. Paste a link; the app handles the rest with Claude + OpenAI in the background.",
    technologies: ["React Native", "FastAPI", "Claude API", "OpenAI", "Supabase"],
    links: [
      { label: "Source", href: "https://github.com/dvala041/CBC_Hackathon" },
      { label: "Devpost", href: "https://devpost.com/software/reelknowledge" },
    ],
  },
  {
    fig: "04",
    title: "3-Caml",
    description:
      "A 3D physics sandbox for the classic three-body problem, built in OCaml as a final project for CS 3110 (Functional Programming). Rendered scenarios with custom 3D graphics and a simulation loop.",
    image: "/3-caml.png",
    technologies: ["OCaml", "Functional Programming", "3D Graphics", "Physics Sim"],
    links: [
      { label: "Source", href: "https://github.com/Anthony-PB/CS3110MP" },
      { label: "Video", href: "https://www.youtube.com/watch?v=-rssoBP_jrM" },
    ],
  },
]

function ProjectCard({
  project,
  className = "",
  imageAspect = "aspect-[16/10]",
  layout = "stacked",
  index,
  isVisible,
  delay,
}: {
  project: Project
  className?: string
  imageAspect?: string
  layout?: "stacked" | "side-by-side" | "text-only"
  index: number
  isVisible: boolean
  delay: number
}) {
  const hasImage = layout !== "text-only" && project.image

  return (
    <article
      className={`group relative flex flex-col border border-ink/25 bg-bone transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ink/80 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Top mono caption strip — always present */}
      <div className="flex items-baseline justify-between border-b border-rule px-4 py-2.5 sm:px-5">
        <span className="meta-lg text-ink">
          FIG.&nbsp;{project.fig}
          <span className="text-ink-3">&nbsp;&middot;&nbsp;</span>
          <span className="text-ink-3">{project.title.toUpperCase()}</span>
        </span>
        <span className="meta text-ink-4 num-tab">
          {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-1 ${layout === "side-by-side" ? "flex-col md:flex-row" : "flex-col"}`}>
        {/* Image */}
        {hasImage && (
          <div
            className={`relative ${imageAspect} overflow-hidden bg-bone-2 ${
              layout === "side-by-side" ? "md:flex-1 md:border-r md:border-rule" : "border-b border-rule"
            }`}
          >
            <Image
              src={asset(project.image as string)}
              alt={`${project.title} — figure ${project.fig}`}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Subtle paper grain via gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20"
              style={{
                background:
                  "radial-gradient(140% 100% at 50% 0%, transparent 55%, oklch(0.19 0.012 60 / 0.3) 100%)",
              }}
            />
          </div>
        )}

        {/* Text block */}
        <div
          className={`flex flex-1 flex-col p-4 sm:p-5 ${
            layout === "side-by-side" ? "md:max-w-md" : ""
          }`}
        >
          <h3 className="font-serif text-2xl sm:text-3xl text-ink leading-[1.05] tracking-[-0.015em]">
            {project.title}
            <span className="text-carnelian">.</span>
          </h3>
          <p className="mt-3 text-ink-2 text-sm sm:text-[0.9375rem] leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack — mono, dot-separated, no pills */}
          <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
            {project.technologies.map((tech, i) => (
              <span key={tech} className="meta text-ink-3 num-tab">
                {tech.toUpperCase()}
                {i < project.technologies.length - 1 && (
                  <span className="ml-1.5 text-ink-4">&middot;</span>
                )}
              </span>
            ))}
          </div>

          {/* Spacer pushes links to bottom */}
          <div className="flex-1" />

          {/* Links */}
          <div className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-2 border-t border-rule pt-4">
            {project.links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 px-2 py-1 text-ink transition-colors hover:text-carnelian"
              >
                <span className="meta-lg">
                  &rarr;&nbsp;{link.label.toLowerCase()}
                </span>
                <ArrowUpRight className="h-3 w-3 -translate-x-0.5 opacity-50 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                {i < project.links.length - 1 && (
                  <span className="ml-1 meta text-ink-4">&middot;</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation(0.05)

  return (
    <section
      id="projects"
      ref={ref}
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02"
          label="WORK & PROJECTS"
          title={
            <>
              Things I've <span className="italic text-carnelian serif-alt">built</span>
              <span className="text-carnelian">.</span>
            </>
          }
          meta={`${String(projects.length).padStart(2, "0")} ENTRIES`}
          isVisible={isVisible}
        >
          <span className="font-serif italic text-ink-2">
            A few of the things I've recently built either for school, hackathons, or just for fun.
            I'm always looking for cool projects from which I can learn a lot.
          </span>
        </SectionHeader>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {/* FEATURED: BirdSense, col-7 row-2 on lg */}
          <ProjectCard
            project={projects[0]}
            index={0}
            isVisible={isVisible}
            delay={500}
            className="col-span-12 lg:col-span-7 lg:row-span-2"
            imageAspect="aspect-[16/10]"
          />

          {/* Medium: Marble Mayhem, col-5 row-1 on lg */}
          <ProjectCard
            project={projects[1]}
            index={1}
            isVisible={isVisible}
            delay={620}
            className="col-span-12 sm:col-span-6 lg:col-span-5"
            imageAspect="aspect-[16/9]"
          />

          {/* Medium: Automato (text-only), col-5 row-1 on lg */}
          <ProjectCard
            project={projects[2]}
            index={2}
            isVisible={isVisible}
            delay={740}
            className="col-span-12 sm:col-span-6 lg:col-span-5"
            layout="text-only"
          />

          {/* Wide: 3-Caml, col-12 with side-by-side internal layout */}
          <ProjectCard
            project={projects[3]}
            index={3}
            isVisible={isVisible}
            delay={860}
            className="col-span-12"
            layout="side-by-side"
            imageAspect="aspect-[16/10] md:aspect-auto md:min-h-[260px]"
          />
        </div>
      </div>
    </section>
  )
}
