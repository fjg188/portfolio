import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6">
          {/* Left: identity */}
          <div>
            <p className="meta-lg text-ink">
              FELIX&nbsp;GRIMM
              <span className="text-ink-4">&nbsp;&middot;&nbsp;</span>
              <span className="text-ink-3">CORNELL&nbsp;CS&nbsp;'27</span>
            </p>
            <p className="meta mt-2 text-ink-4">
              Engineer / Researcher &mdash; Ithaca, NY
            </p>
          </div>

          {/* Middle: revision metadata */}
          <div className="sm:text-center">
            <p className="meta text-ink-3">
              REV.&nbsp;<span className="num-tab">2026.05.08</span>
            </p>
            <p className="meta mt-2 text-ink-4">
              SET IN FRAUNCES, GEIST, JETBRAINS&nbsp;MONO
            </p>
          </div>

          {/* Right: source link */}
          <div className="sm:text-right">
            <Link
              href="https://github.com/fjg188/portfolio-website"
              target="_blank"
              rel="noopener noreferrer"
              className="meta-lg inline-flex items-center gap-1 text-ink transition-colors hover:text-carnelian"
            >
              VIEW&nbsp;SOURCE
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <p className="meta mt-2 text-ink-4">
              Built with Next.js &amp; Tailwind
            </p>
          </div>
        </div>

        {/* Hairline + colophon */}
        <div className="mt-10 border-t border-rule pt-4">
          <p className="meta text-ink-4 num-tab">
            END&nbsp;OF&nbsp;DOCUMENT
            <span className="ml-2 inline-block animate-caret-blink">▮</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
