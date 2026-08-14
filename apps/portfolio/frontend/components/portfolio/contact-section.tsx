"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Github, Linkedin } from "lucide-react"


export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 bg-card/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
            Contact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground">
            Open to talk! Feel free to reach out with ideas, questions, or feedback {":)"}
          </p>
        </div>

        <Card className="bg-card/50 border-border backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:youngandtom2@gmail.com">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white w-full sm:w-auto">
                  <Mail className="mr-2 h-5 w-5" />
                  E-mail
                </Button>
              </a>
              
              <a href="https://github.com/MyDogTomsky" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-border w-full sm:w-auto">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/soo-young-kwon-3045b026a/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-border w-full sm:w-auto">
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Button>
              </a>  
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
