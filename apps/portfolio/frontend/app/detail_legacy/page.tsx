import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/portfolio/navbar"
import { Footer } from "@/components/portfolio/footer"
import {
  ArrowLeft,
  ArrowRight,
  Server,
  GitBranch,
  Globe,
  Shield,
  Activity,
  Cloud,
  Container,
  Layers,
} from "lucide-react"

const stack = [
  "React",
  "FastAPI",
  "Docker Compose",
  "Nginx",
  "CloudFront",
  "GitHub Actions",
  "Terraform",
  "EC2",
  "Route 53",
]

const architecture = [
  {
    icon: <Globe className="h-5 w-5" />,
    title: "CloudFront CDN",
    description: "Replaced ALB — lower cost, faster static delivery, HTTPS termination.",
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "EC2 t3.small",
    description: "Upgraded from t2.micro. Hosts all three containers on a single instance.",
  },
  {
    icon: <Container className="h-5 w-5" />,
    title: "Docker Compose",
    description: "Three containers: Next.js (3000), FastAPI (8000), Flask legacy (5000).",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Nginx Reverse Proxy",
    description: "Routes by domain — littledogtomsky.com → Next.js, test.* → Flask.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Security Groups",
    description: "Ingress restricted to CloudFront IPs. HTTPS enforced end-to-end.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "CloudWatch + S3 Logs",
    description: "HTTP status monitoring via Nginx logs. CloudWatch tracks host health.",
  },
]

const cicdSteps = [
  { step: "01", label: "Push to main", detail: "GitHub receives commit" },
  { step: "02", label: "GitHub Actions triggers", detail: "Replaces Jenkins (no EC2 memory cost)" },
  { step: "03", label: "Build Docker images", detail: "frontend + backend built in CI" },
  { step: "04", label: "Push to registry", detail: "Images pushed to GHCR / ECR" },
  { step: "05", label: "SSH deploy to EC2", detail: "docker compose pull && up -d" },
  { step: "06", label: "Health check", detail: "GET /health confirms containers live" },
]

const requestFlow = [
  { label: "Browser", color: "cyan" },
  { label: "CloudFront", color: "cyan" },
  { label: "Nginx (EC2)", color: "cyan" },
  { label: "Next.js :3000", color: "emerald" },
  { label: "FastAPI :8000", color: "emerald" },
  { label: "AWS Lambda", color: "amber" },
]

export default function WorkSinglePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Back link */}
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </a>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">In Progress</Badge>
              <Badge variant="outline" className="border-border text-muted-foreground">2025</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              React / FastAPI{" "}
              <span className="text-cyan-400">Cloud Portfolio</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Full rebuild of my portfolio — Flask + Bootstrap → React + FastAPI — with
              production-style Docker, CloudFront CDN, and GitHub Actions CI/CD.
            </p>

            {/* Stack badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-card border-border">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Request Flow */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-cyan-400" />
              Request Flow
            </h2>
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  {requestFlow.map((node, i) => (
                    <div key={node.label} className="flex items-center gap-2">
                      <span
                        className={`font-mono text-sm px-3 py-1.5 rounded border ${
                          node.color === "cyan"
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                            : node.color === "emerald"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {node.label}
                      </span>
                      {i < requestFlow.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 font-mono">
                  # Next.js renders UI → fetches data from FastAPI → Lambda handles Weather API
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Architecture */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Cloud className="h-5 w-5 text-cyan-400" />
              Infrastructure Design
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {architecture.map((item) => (
                <Card key={item.title} className="bg-card/50 border-border backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">{item.icon}</div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Container layout */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Container className="h-5 w-5 text-cyan-400" />
              Container Layout
            </h2>
            <Card className="bg-card/50 border-border backdrop-blur-sm font-mono text-sm">
              <CardContent className="pt-6">
                <pre className="text-muted-foreground leading-7 overflow-x-auto">{`EC2 t3.small
├── container: next-app     (port 3000)  ← React UI
├── container: fastapi-app  (port 8000)  ← API / data
└── container: flask-legacy (port 5000)  ← test.littledogtomsky.com

Nginx routing
├── littledogtomsky.com      → next-app
└── test.littledogtomsky.com → flask-legacy`}</pre>
              </CardContent>
            </Card>
          </section>

          {/* CI/CD */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-cyan-400" />
              CI/CD Pipeline
            </h2>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Replaced Jenkins with GitHub Actions — Jenkins ran on the same EC2 instance and
              consumed significant memory. GitHub Actions runs in the cloud, keeping the EC2
              free for serving traffic.
            </p>
            <div className="space-y-3">
              {cicdSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded px-2 py-1 shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What I learnt */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-4">What I Built & Learnt</h2>
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="pt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  I deployed and maintained this portfolio using AWS cloud services and CI/CD automation.
                  With Terraform I managed infrastructure as code — VPC, subnets, EC2, and Route 53 records.
                </p>
                <p>
                  Replacing ALB with CloudFront reduced cost and improved static asset delivery globally.
                  TLS certificates handle HTTP → HTTPS redirection via CNAME records.
                </p>
                <p>
                  The Weather API is served by an AWS Lambda function, called through API Gateway.
                  FastAPI fetches the response and forwards it to the React frontend, keeping the
                  Lambda re-usable and decoupled from the UI layer.
                </p>
                <p>
                  My aim is to keep extending the site — adding new APIs (movie data, currency),
                  while improving my cloud and DevOps skills with each iteration.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border">
            <a href="/#projects">
              <Button variant="outline" className="border-border gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Projects
              </Button>
            </a>
            <a href="/work-less">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                Next: Serverless REST App
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
