"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "VegaMX",
    location: "New York, NY",
    period: "June 2025 - August 2025",
    description:
      "Modeled wildfire risk for critical infrastructure building a geospatial pipeline that fuses satellite (MODIS) and climate (GRIDMET) data with infastructure asset locations. Computed pixel-level correlations (e.g., Spearman) between vegetation, temperature, wind, drought, and historical fire perimeters to generate features and prototype a risk-scoring function for buildings and electric-grid assets.",
    skills: ["Geospatial", "xarray", "NumPy", "GeoPandas", "Jupyter", "feature engineering", "CRS/projection handling", "data visualization", "Dask", "Zarr", "matplotlib"],
  },
  {
    title: "Undegraduate Research Assistant",
    company: "AIRLAB (Artificial Intelligence Robotics Lab) - Cornell Tech",
    location: "Ithaca, NY",
    period: "February 2025 - Present",
    description:
      "Undergraduate Research Assistant on Multi-Agent Reinforcement Learning for human–robot collaboration in healthcare and beyond. You can see our most recent publication here: https://arxiv.org/abs/2511.14135",
    skills: ["MARL", "benchmarking", "Machine Learning", "PyTorch"],
  },
]

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
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl text-primary">{experience.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-accent">{experience.company}</CardDescription>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
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
                <p className="text-foreground mb-4 leading-relaxed">{experience.description}</p>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
