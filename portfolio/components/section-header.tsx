"use client"

import type { ReactNode } from "react"

type SectionHeaderProps = {
  number: string // "01"
  label: string // "EDUCATION"
  title: ReactNode // serif display headline
  meta?: ReactNode // right-aligned mono metadata (e.g. "04 ENTRIES")
  children?: ReactNode // serif italic intro / lede paragraph
  isVisible: boolean
}

export function SectionHeader({
  number,
  label,
  title,
  meta,
  children,
  isVisible,
}: SectionHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10">
      {/* Top mono strip: §·0X — LABEL ........ META */}
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <span
          className={`meta-lg text-ink transition-opacity duration-500 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-ink-3">§</span>&nbsp;{number}
          <span className="text-ink-3">&nbsp;&middot;&nbsp;</span>
          <span className="text-ink">{label}</span>
        </span>
        {meta && (
          <span
            className={`meta text-ink-4 transition-opacity duration-500 ease-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            {meta}
          </span>
        )}
      </div>

      {/* Hairline rule that draws on */}
      <div
        aria-hidden
        className="h-px bg-ink/35 origin-left will-change-transform transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] duration-700"
        style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)" }}
      />

      {/* Serif display title */}
      <h2
        className={`mt-8 font-serif text-5xl sm:text-6xl md:text-7xl text-ink leading-[0.95] tracking-[-0.02em] transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {title}
      </h2>

      {/* Optional lede */}
      {children && (
        <div
          className={`mt-6 max-w-2xl text-ink-2 text-base sm:text-lg leading-relaxed transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          {children}
        </div>
      )}
    </header>
  )
}
