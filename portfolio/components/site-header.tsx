"use client"

import { ArrowUpRight } from "lucide-react"

const navItems = [
  { num: "01", id: "education", label: "Education" },
  { num: "02", id: "projects", label: "Projects" },
  { num: "03", id: "experience", label: "Experience" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bone/85 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:h-14 sm:px-6 lg:px-8">
        <a href="#index" className="group inline-flex items-baseline gap-2">
          <span className="meta-lg font-medium text-ink">FELIX GRIMM</span>
          <span className="meta hidden text-ink-4 sm:inline">
            &mdash;&nbsp;ENG.&nbsp;NOTEBOOK&nbsp;/&nbsp;REV.&nbsp;2026.05
          </span>
        </a>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="meta px-2 py-1.5 text-ink-3 transition-colors hover:text-carnelian"
            >
              <span className="text-ink-4">§</span>&nbsp;{item.num}
              <span className="hidden md:inline">&nbsp;{item.label}</span>
            </a>
          ))}
          <a
            href="https://github.com/fjg188"
            target="_blank"
            rel="noopener noreferrer"
            className="meta ml-1 inline-flex items-center gap-1 border-l border-rule pl-3 pr-1 py-1.5 text-ink-3 transition-colors hover:text-carnelian"
          >
            github
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </nav>
      </div>
    </header>
  )
}
