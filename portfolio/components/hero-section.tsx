"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Linkedin, Github, Mail } from "lucide-react"

const onFile = [
  { label: "Undergraduate Researcher",     org: "AIRLAB · Cornell Tech",          since: "2025—" },
  { label: "R&D Analyst",                  org: "Cornell DEBUT",                  since: "2025—" },
  { label: "B.S. Computer Science",        org: "Cornell · College of Engineering", since: "Class of '27" },
] as const

const contacts = [
  { label: "linkedin", href: "https://www.linkedin.com/in/grimm-felix/", icon: Linkedin },
  { label: "github",   href: "https://github.com/fjg188",                icon: Github },
  { label: "email",    href: "mailto:fjg45@cornell.edu",                 icon: Mail },
] as const

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 30)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section
      id="index"
      aria-label="Index"
      className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Top metadata strip ───────────────────────────────────────── */}
        <div
          className={`flex items-baseline justify-between gap-4 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="meta-lg text-ink">
            <span className="text-ink-3">§</span>&nbsp;00
            <span className="text-ink-3">&nbsp;&middot;&nbsp;</span>INDEX
          </span>
          <span className="meta text-ink-4 hidden sm:inline">
            ON FILE / REV.&nbsp;2026.05.08
          </span>
        </div>

        {/* Draw-on hairline */}
        <div
          aria-hidden
          className="mt-4 h-px origin-left bg-ink/35 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{ transform: loaded ? "scaleX(1)" : "scaleX(0)", transitionDelay: "100ms" }}
        />

        {/* ── Hero grid ───────────────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 lg:gap-y-0">
          {/* Left: identity + lede */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <p
              className={`meta-lg text-ink-3 transition-all duration-700 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              ENGINEER&nbsp;
              <span className="text-ink-4">/</span>&nbsp;RESEARCHER&nbsp;
              <span className="text-ink-4">/</span>&nbsp;CORNELL&nbsp;CS&nbsp;'27
            </p>

            {/* Massive serif name */}
            <h1
              className={`mt-6 font-serif text-[clamp(3.25rem,9.5vw,8rem)] leading-[0.92] tracking-[-0.025em] text-ink transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "320ms" }}
            >
              <span className="italic text-carnelian serif-alt">Felix</span>
              <br className="hidden sm:block" />{" "}
              <span className="text-ink">Grimm</span>
              <span
                className={`text-carnelian inline-block transition-opacity duration-300 ${
                  loaded ? "opacity-100 animate-caret-blink" : "opacity-0"
                }`}
                style={{ transitionDelay: "1100ms" }}
              >
                .
              </span>
            </h1>

            {/* Italic lede */}
            <p
              className={`mt-8 max-w-xl font-serif text-xl sm:text-2xl text-ink-2 leading-snug italic transition-all duration-1000 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: "560ms" }}
            >
              Building at the edge of software and physical systems&nbsp;&mdash; multi-agent
              learning, computer vision, embedded firmware, geospatial pipelines.
            </p>

            {/* Contact strip */}
            <div
              className={`mt-10 flex flex-wrap items-center gap-2 transition-all duration-700 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: "780ms" }}
            >
              {contacts.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group inline-flex items-center gap-2 border border-rule bg-bone px-3 py-2 text-ink transition-all hover:border-ink hover:bg-ink hover:text-bone"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="meta-lg">{label}</span>
                  <ArrowUpRight className="h-3 w-3 -translate-x-0.5 opacity-50 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: headshot + on-file column */}
          <div className="lg:col-span-5 lg:pl-4">
            {/* Headshot in bracketed frame */}
            <figure
              className={`relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:mx-0 lg:ml-auto transition-all duration-1000 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "440ms" }}
            >
              <div className="relative aspect-square border border-ink/40 bg-bone-2">
                {/* Image — wrapped so overflow-hidden doesn't clip the corner marks */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/headshot.jpeg"
                    alt="Felix Grimm"
                    width={400}
                    height={400}
                    priority
                    className="h-full w-full object-cover grayscale-[15%] contrast-[1.02]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-30"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 50% 0%, transparent 60%, oklch(0.19 0.012 60 / 0.12) 100%)",
                    }}
                  />
                </div>
                {/* Corner crosshair marks — sit just outside the frame */}
                <span aria-hidden className="pointer-events-none absolute -top-px -left-px h-2 w-2 border-l border-t border-ink" />
                <span aria-hidden className="pointer-events-none absolute -top-px -right-px h-2 w-2 border-r border-t border-ink" />
                <span aria-hidden className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-l border-b border-ink" />
                <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-r border-b border-ink" />
              </div>
              <figcaption className="meta mt-3 flex items-center justify-between text-ink-4">
                <span>FIG.&nbsp;00 &mdash; F.&nbsp;GRIMM</span>
                <span>ITHACA, NY</span>
              </figcaption>
            </figure>

            {/* ON FILE list */}
            <div
              className={`mt-10 transition-all duration-1000 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: "640ms" }}
            >
              <p className="meta text-ink-3">ON&nbsp;FILE</p>
              <ul className="mt-3 divide-y divide-rule border-y border-rule">
                {onFile.map((item, i) => (
                  <li
                    key={item.label}
                    className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-3 py-2.5 transition-all duration-700 ease-out"
                    style={{
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateX(0)" : "translateX(-6px)",
                      transitionDelay: `${720 + i * 90}ms`,
                    }}
                  >
                    <span className="meta text-ink-4 num-tab">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="font-serif text-base text-ink leading-tight">
                        {item.label}
                      </span>
                      <span className="meta ml-2 text-ink-3">{item.org}</span>
                    </span>
                    <span className="meta text-ink-4 num-tab">{item.since}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Footer metadata strip ───────────────────────────────────── */}
        <div
          className={`mt-16 flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-4 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <span className="meta text-ink-3">
            <span className="text-ink-4">LAT</span>&nbsp;42.4534°N&nbsp;
            <span className="text-ink-4 mx-1">/</span>&nbsp;
            <span className="text-ink-4">LON</span>&nbsp;76.4735°W
          </span>
          <span className="meta text-ink-4 hidden sm:inline">
            SCROLL&nbsp;FOR&nbsp;§&nbsp;01
            <span className="ml-2 inline-block animate-caret-blink">↓</span>
          </span>
        </div>
      </div>
    </section>
  )
}
