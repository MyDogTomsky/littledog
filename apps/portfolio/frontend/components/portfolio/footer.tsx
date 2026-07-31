import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              system.status: online
            </span>
          </div>

          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#observability" className="hover:text-foreground transition-colors">Observability</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            {/*
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a> */}  
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://github.com/MyDogTomsky"  target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-400 transition-colors" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            
            <a href="mailto:youngandtom2@gmail.com" className="text-muted-foreground hover:text-cyan-400 transition-colors" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>Built with Next.js · FastAPI · Docker · AWS · Terraform </p>
        </div>
      </div>
    </footer>
  )
}
