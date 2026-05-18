"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Server, Mail, BarChart } from "lucide-react"

const heroProject = {
  title: "React/FastAPI Cloud Portfolio",
  description: "Modern portfolio rebuild with React frontend, FastAPI backend, and production-style observability.",
  status: "In Progress",
  statusColor: "cyan",
  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
  stack: ["React", "FastAPI", "Docker Compose", "Nginx", "CloudFront", "GitHub Actions"],
}

const secondaryProjects = [
  {
    title: "Legacy Flask Portfolio",
    description: "Original Flask/Bootstrap portfolio with Jenkins CI/CD.",
    status: "Done",
    statusColor: "emerald",
    icon: <Server className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
    stack: ["Flask", "Bootstrap", "EC2", "Jenkins"],
  },
  {
    title: "Python Mobile App",
    description: "Python app with SMTP email and image search.",
    status: "Done",
    statusColor: "emerald",
    icon: <Mail className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400&h=200&fit=crop",
    stack: ["Python", "SMTP", "Image Search"],
  },
  {
    title: "SQL/Data Analysis",
    description: "Data analysis with complex SQL queries and reporting.",
    status: "Done",
    statusColor: "emerald",
    icon: <BarChart className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    stack: ["SQL", "Data Validation", "Reporting"],
  },
]

const statusColors: Record<string, string> = {
  cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="pt-32 pb-20 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
            Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of cloud infrastructure, backend development, and data analysis work
          </p>
        </div>

        {/* Hero Project - Full Width */}
        <Card className="bg-card/50 border-border backdrop-blur-sm overflow-hidden mb-10 group cursor-pointer hover:border-cyan-500/30 transition-colors">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img
                src={heroProject.image}
                alt={heroProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent md:hidden" />
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={statusColors[heroProject.statusColor]}>
                  {heroProject.status}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-3">{heroProject.title}</h3>
              <p className="text-muted-foreground mb-6">
                {heroProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {heroProject.stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs bg-card border-border">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Button className="w-fit bg-cyan-600 hover:bg-cyan-700 text-white group/btn">
                View Case Study
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </div>
        </Card>

        {/* Secondary Projects - 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {secondaryProjects.map((project) => (
            <Card 
              key={project.title} 
              className="bg-card/50 border-border backdrop-blur-sm overflow-hidden group cursor-pointer hover:border-cyan-500/30 transition-colors"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute inset-0 bg-card/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{project.title}</h4>
                  <Badge className={`text-xs ${statusColors[project.statusColor]}`}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-card border-border">
                      {tech}
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
