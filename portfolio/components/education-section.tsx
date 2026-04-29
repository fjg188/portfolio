"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Cornell University, College of Engineering",
    location: "Ithaca, New York",
    period: "August 2023 - Expected May 2027",
    gpa: "3.3/4.0",
    coursework: [
      "Applied High-Performance and Parallel Computing",
      "Introduction to Analysis of Algorithms",
      "Foundations of AI Reasoning and Decision making",
      "Introduction to Machine Learning",
      "Introduction to Deep Learning",
      "Discrete Structures",
      "Linear Algebra",
      "Embedded Systems",
      "Digital Logic and Computer Organization",
      "Object-Oriented Programming and Data Structures",
      "Probability and Statistics",
      "Foundations of Robotics",
      "Data Structures and Functional Programming",
    ],
  },
]

export function EducationSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">Education</h2>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => {
            const half = Math.ceil(edu.coursework.length / 2)
            const courseworkRows = [edu.coursework.slice(0, half), edu.coursework.slice(half)]
            return (
              <Card
                key={index}
                className={`relative overflow-hidden hover:shadow-lg transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                {/* Left-side accent border */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent" aria-hidden />

                <CardHeader className="pl-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="p-3 bg-accent/10 rounded-xl shrink-0">
                        <GraduationCap className="h-7 w-7 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-2xl sm:text-3xl text-primary leading-tight">
                          {edu.degree}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-accent mt-2">
                          {edu.institution}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground shrink-0 sm:pt-2">
                      <Calendar className="mr-1.5 h-4 w-4" />
                      {edu.period}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pl-8 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Relevant Coursework
                  </h4>
                  <div className="space-y-2">
                    {courseworkRows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex flex-wrap gap-2">
                        {row.map((course, courseIndex) => (
                          <Badge
                            key={courseIndex}
                            variant="secondary"
                            className={`text-xs transition-all duration-700 ease-out ${
                              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                            }`}
                            style={{
                              transitionDelay: `${500 + rowIndex * 100 + courseIndex * 40}ms`,
                            }}
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
