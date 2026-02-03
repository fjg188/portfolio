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
      "Probablity and Statistics",
      "Foundation of Robotics",
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
          {/* Degree Information */}
          {education.map((edu, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-primary mb-1">{edu.degree}</CardTitle>
                      <CardDescription className="text-lg font-medium text-accent mb-2">
                        {edu.institution}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {edu.period}
                        </div>
                     {/*<div>GPA: {edu.gpa}</div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-primary mb-3">Relevant Coursework</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, courseIndex) => (
                      <Badge key={courseIndex} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
