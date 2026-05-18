"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Cloud, Settings } from "lucide-react"

const skillCategories = [
  {
    title: "Languages",
    icon: <Code className="h-5 w-5" />,
    skills: ["Python", "JavaScript", "SQL"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: <Cloud className="h-5 w-5" />,
    skills: ["AWS EC2", "CloudFront", "ALB", "Route 53", "Nginx"],
  },
  {
    title: "Systems",
    icon: <Settings className="h-5 w-5" />,
    skills: ["FastAPI", "Flask", "Docker / Docker Compose", "CI/CD (GitHub Actions, Jenkins)", "Observability"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
            Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I use for cloud infrastructure, backend development, and DevOps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.title} className="bg-card/50 border-border backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm bg-card border-border hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                    >
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
