"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"

const projects = [
  {
    title: "BirdSense",
    description:
      "I built BirdSense, a bird-feeder camera that spots and identifies birds and their species in real time. It runs YOLO for detection and a PyTorch ViT for classification I trained, (\~92% on 200+ species), piping results through AWS (Lambda, S3, MongoDB) to a web app to display the results.",
    image: "/portfolio/home-page.png",
    technologies: ["Python", "Next.js", "MongoDB", "AWS", "PyTorch", "YOLO", "TypeScript", "machine learning", "computer vision", "React", "web development", "REST API", "transformers"],
    githubUrl: "https://github.com/fjg188/BirdSense",
    liveUrl: "https://birdsense.vercel.app/",
  },
  {
    title: "Marble Mayhem",
    description:
      "My and a friend built a tilt-controlled marble maze game on a FRDM board, we read the onboard accelerometer over I²C and stream state via UART. On the PC side, we created a Python GUI that procedurally generates mazes through recursive backtracking and simulates 2-D physics of the marble.",
    image: "/portfolio/marble-mayhem.png",
    technologies: ["C", "Embedded programming", "Python", "IMU sensors", "I²C", "UART", "Real-time/interrupt-driven firmware", "microcontrollers", "serial communication"],
    githubUrl: "https://github.com/fjg188/MarbleMayhem",
    liveUrl: "https://youtu.be/zWesUXPY7sg",
  },
  {
    title: "Lost at Cornell",
    description:
      " I built a RESTful API backend for a swift IOS client for a lost and found app for the Cornell University Community. deployed onto google cloud VM using Docker and Flask. ",
    image: "/portfolio/lost-Cornell.png",
    technologies: ["Python", "Docker", "Flask", "REST API", "SQL", "Google Cloud", "backend development","unit testing"],
    githubUrl: "https://github.com/fjg188/backend--Lost-at-Cornell",
    liveUrl: "https://youtube.com/shorts/L-FY_Z3aT5c?feature=share",
  },
]

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-lg transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.image || "/portfolio-website/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button size="sm" className="bg-accent hover:bg-accent/90" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
