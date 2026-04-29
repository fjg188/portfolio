"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"


export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <Image
            src="/portfolio/headshot.jpeg"
            alt="Profile"
            width={160}
            height={160}
            className={`w-40 h-40 rounded-full mx-auto mb-8 border-4 border-accent/20 object-cover transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-6 transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Hey I&apos;m <span className="text-accent">Felix</span>!
          </h1>
        </div>

        <div
          className={`flex justify-center space-x-4 mb-8 transition-all duration-1000 ease-out delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            variant="outline"
            size="sm"
            className="border-muted-foreground/30 text-muted-foreground hover:text-primary hover:border-accent bg-transparent hover:scale-105 transition-all duration-200"
          >
            <Linkedin className="mr-2 h-4 w-4" />
            <Link href="https://www.linkedin.com/in/grimm-felix/" 
            target="_blank"
            rel="noopener noreferrer" 
            passHref>
            LinkedIn
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-muted-foreground/30 text-muted-foreground hover:text-primary hover:border-accent bg-transparent hover:scale-105 transition-all duration-200"
          >
            <Github className="mr-2 h-4 w-4" />
            <Link href="https://github.com/fjg188"
            target="_blank"
            rel="noopener noreferrer" 
            passHref>
            GitHub
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-muted-foreground/30 text-muted-foreground hover:text-primary hover:border-accent bg-transparent hover:scale-105 transition-all duration-200"
          >
            <Mail className="mr-2 h-4 w-4" />
            <Link href="mailto:fjg45@cornell.edu" passHref>
            Email
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
