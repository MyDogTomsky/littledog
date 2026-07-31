"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-12">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Photo Area */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border-2 border-cyan-500/30 flex items-center justify-center overflow-hidden">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border border-border overflow-hidden">
                  <Image
                    src="/train_img.jpeg"
                    alt="profile"
                    width={208}
                    height={208}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Default Settings
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-card/80 border border-border flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-bold text-cyan-400/80">T</span>
                </div>
                */}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-card border border-cyan-500/30 rounded-full p-2">
                <span className="w-3 h-3 bg-emerald-400 rounded-full block animate-pulse" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                System Status: Active
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              Hi, I&apos;m{" "}
              <span className="text-cyan-400">Soo Young!</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              {/*Subtitles*/}
              {/*Cloud-Focused Software Developer*/}
            </p>

            <div className="flex items-center gap-2 text-muted-foreground mb-6 justify-center lg:justify-start">
              <MapPin className="h-4 w-4" />
              <span>United Kingdom & South Korea</span>
            </div>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              I build and deploy Python applications on AWS infrastructure. <br />
              This portfolio runs on React/FastAPI with Docker, CloudFront, and GitHub Actions.
            </p>

            {/* Terminal snippet */}
            <div className="bg-card/50 border border-border rounded-lg p-3 mb-8 font-mono text-sm backdrop-blur-sm max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-cyan-400">
                $ whoami{showCursor && <span className="ml-1 bg-cyan-400 text-background px-0.5">_</span>}
              </div>
              <div className="text-muted-foreground pl-2 mt-1">automates systems with Python & AWS</div>
              
              <div className="text-cyan-400 mt-3">
                $ why{showCursor && <span className="ml-1 bg-cyan-400 text-background px-0.5">_</span>}
              </div>
              <div className="text-muted-foreground pl-2 mt-1">reliability & productivity</div>
            </div>  

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <a href="https://github.com/MyDogTomsky" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Github className="mr-2 h-5 w-5" />
                  View GitHub
                </Button>
              </a>
              <a href="mailto:youngandtom2@gmail.com">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white w-full sm:w-auto">
                  <Mail className="mr-2 h-5 w-5" />
                  E-mail
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="#skills"
            className="text-muted-foreground hover:text-cyan-400 transition-colors animate-bounce"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
