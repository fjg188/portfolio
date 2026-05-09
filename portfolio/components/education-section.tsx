"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { SectionHeader } from "@/components/section-header"

const education = {
  degree: "Bachelor of Science in Computer Science",
  shortDegree: "B.S. Computer Science",
  institution: "Cornell University",
  college: "College of Engineering",
  location: "Ithaca, New York",
  period: "Aug 2023 — May 2027",
  gpa: "3.3 / 4.0",
  concentrations: ["Machine Learning", "Distributed and High Performance Computing", "Embedded Systems"],
  coursework: [
    "Applied High-Performance and Parallel Computing",
    "Analysis of Algorithms",
    "Foundations of AI Reasoning and Decision Making",
    "Introduction to Machine Learning",
    "Introduction to Deep Learning",
    "Discrete Structures",
    "Linear Algebra",
    "Embedded Systems",
    "Digital Logic and Computer Organization",
    "Object-Oriented Programming & Data Structures",
    "Probability and Statistics",
    "Foundations of Robotics",
    "Data Structures and Functional Programming",
  ],
} as const

export function EducationSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const half = Math.ceil(education.coursework.length / 2)
  const left = education.coursework.slice(0, half)
  const right = education.coursework.slice(half)

  return (
    <section
      id="education"
      ref={ref}
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      aria-label="Education"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          label="EDUCATION"
          title={
            <>
              Cornell <span className="italic text-carnelian serif-alt">University</span>
              <span className="text-carnelian">.</span>
            </>
          }
          meta="01 ENTRY"
          isVisible={isVisible}
        > 
        {/* could add something interesting here blurb thing if I want*/}
          <span className="font-serif italic text-ink-2">
            I've taken a lot of interesting and random courses at Cornell, like Intro to Wines and hands-on Horticulture.
            Here are some of the more technical and CS-focused courses I've taken and found super interesting.
          </span>
        </SectionHeader>
        {/* ── Body grid: degree details (left) / marginalia (right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
          {/* Left: degree title + college */}
          <div className="lg:col-span-7">
            <p
              className={`meta text-ink-4 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              DEGREE
            </p>
            <p
              className={`mt-2 font-serif text-2xl sm:text-3xl text-ink leading-tight transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: "560ms" }}
            >
              {education.shortDegree}
            </p>
            <p
              className={`meta-lg mt-3 text-ink-3 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: "620ms" }}
            >
              {education.college.toUpperCase()}
            </p>

            <div
              className={`mt-8 flex flex-wrap gap-x-2 gap-y-2 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: "720ms" }}
            >
              <span className="meta text-ink-4">CONCENTRATIONS</span>
              <span className="meta text-ink-4">/</span>
              {education.concentrations.map((c, i) => (
                <span key={c} className="meta-lg text-ink">
                  {c}
                  {i < education.concentrations.length - 1 && (
                    <span className="text-ink-4">&nbsp;&middot;</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Right: marginalia card */}
          <aside className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-rule">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4">
              {[
                { term: "PERIOD",   value: education.period,   delay: 540 },
                { term: "LOCATION", value: education.location, delay: 620 }
                //,{ term: "GPA",      value: education.gpa,      delay: 700 },
              ].map((row) => (
                <div
                  key={row.term}
                  className="contents transition-all"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(4px)",
                    transitionDuration: "700ms",
                    transitionDelay: `${row.delay}ms`,
                    transitionTimingFunction: "ease-out",
                  }}
                >
                  <dt className="meta self-center text-ink-4">{row.term}</dt>
                  <dd className="font-serif text-lg text-ink num-tab">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* ── Coursework: numbered hairline list ─────────────────────── */}
        <div className="mt-16">
          <div
            className={`flex items-baseline justify-between transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <span className="meta-lg text-ink">RELEVANT&nbsp;COURSEWORK</span>
            <span className="meta text-ink-4 num-tab">
              {String(education.coursework.length).padStart(2, "0")}&nbsp;COURSES
            </span>
          </div>

          <div
            aria-hidden
            className="mt-3 h-px origin-left bg-ink/35 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: isVisible ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: "850ms",
            }}
          />

          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
            {[left, right].map((col, colIdx) => (
              <ul
                key={colIdx}
                className="divide-y divide-rule"
              >
                {col.map((course, i) => {
                  const idx = colIdx === 0 ? i : i + half
                  return (
                    <li
                      key={course}
                      className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 py-3 transition-all"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateX(0)" : "translateX(-6px)",
                        transitionDuration: "650ms",
                        transitionDelay: `${950 + idx * 45}ms`,
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <span className="meta text-ink-4 num-tab">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink leading-snug">{course}</span>
                    </li>
                  )
                })}
              </ul>
            ))}
          </div>

          <div
            aria-hidden
            className="mt-0 h-px origin-left bg-rule"
            style={{
              transform: isVisible ? "scaleX(1)" : "scaleX(0)",
              transitionProperty: "transform",
              transitionDuration: "700ms",
              transitionDelay: `${950 + education.coursework.length * 45 + 100}ms`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
      </div>
    </section>
  )
}
