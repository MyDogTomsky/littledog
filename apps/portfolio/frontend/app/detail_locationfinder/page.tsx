import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/portfolio/navbar"
import { Footer } from "@/components/portfolio/footer"
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Database,
  Shield,
  GitBranch,
  Globe,
  Lock,
  CheckCircle2,
  XCircle,
} from "lucide-react"

const stack = [
  "AWS Lambda",
  "API Gateway",
  "DynamoDB",
  "AWS Cognito",
  "JavaScript",
  "Python",
  "REST API",
  "IAM",
]

const architecture = [
  {
    icon: <Lock className="h-5 w-5" />,
    title: "AWS Cognito",
    description:
      "User pool for authentication. JWT tokens issued on login, verified by API Gateway on every request.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "API Gateway",
    description:
      "HTTP POST endpoint at /request. CORS restricted to the web app origin. Lambda Proxy Integration enabled.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "AWS Lambda",
    description:
      "Executes the handler function on trigger. Processes unicorn dispatch, records to DynamoDB, returns 201.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "DynamoDB",
    description:
      "Stores each request and response. UnicornID used as partition key for fast lookup.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "IAM Roles & Policies",
    description:
      "Least-privilege policies assigned to IAM user and Lambda service role for cross-resource access.",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "config.js",
    description:
      "window._config holds Cognito pool IDs and API Gateway invoke URL — wires the frontend to the backend.",
  },
]

const statusCodes = [
  { code: "200", label: "Success", detail: "GET / UPDATE", color: "emerald" },
  { code: "201", label: "Created", detail: "POST — resource created in DynamoDB", color: "cyan" },
  { code: "301", label: "Redirect", detail: "Success redirect", color: "amber" },
  { code: "400", label: "Bad Request", detail: "Malformed request body", color: "red" },
  { code: "401", label: "Unauthorized", detail: "Missing or invalid JWT token", color: "red" },
  { code: "403", label: "Forbidden", detail: "Insufficient permissions", color: "red" },
  { code: "404", label: "Not Found", detail: "Resource does not exist", color: "red" },
  { code: "500", label: "Server Error", detail: "Lambda / DynamoDB error", color: "red" },
]

const requestFlow = [
  { label: "Browser", color: "cyan" },
  { label: "Cognito Auth", color: "amber" },
  { label: "API Gateway", color: "cyan" },
  { label: "Lambda", color: "emerald" },
  { label: "DynamoDB", color: "emerald" },
]

const colorMap: Record<string, string> = {
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  amber: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  red: "bg-red-500/10 border-red-500/30 text-red-400",
}

export default function WorkLessPage() {
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
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Done</Badge>
              <Badge variant="outline" className="border-border text-muted-foreground">2024</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Serverless{" "}
              <span className="text-cyan-400">REST API App</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A serverless web app with REST API architecture — unicorn dispatch with map
              interaction, user authentication via Cognito, and DynamoDB persistence.
            </p>

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
                      <span className={`font-mono text-sm px-3 py-1.5 rounded border ${colorMap[node.color]}`}>
                        {node.label}
                      </span>
                      {i < requestFlow.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 font-mono">
                  # JWT token verified at API Gateway before Lambda is invoked
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Architecture */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              Architecture Components
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

          {/* Lambda handler pattern */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              Lambda Handler Pattern
            </h2>
            <Card className="bg-card/50 border-border backdrop-blur-sm font-mono text-sm">
              <CardContent className="pt-6">
                <pre className="text-muted-foreground leading-7 overflow-x-auto">{`def handler(event, context):
    # event    — incoming request payload
    # context  — Lambda metadata (timeout, memory etc.)

    try:
        body = json.loads(event['body'])
        unicorn = dispatch_unicorn(body)

        # Record request + response in DynamoDB
        table.put_item(Item={
            'UnicornID': unicorn['id'],
            'request':   body,
            'response':  unicorn,
        })

        return { 'statusCode': 201, 'body': json.dumps(unicorn) }

    except Exception as e:
        return { 'statusCode': 500, 'body': str(e) }`}</pre>
              </CardContent>
            </Card>
          </section>

          {/* Status codes */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-400" />
              HTTP Status Codes Used
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {statusCodes.map((s) => (
                <div
                  key={s.code}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border"
                >
                  <span className={`font-mono text-sm px-2 py-0.5 rounded border shrink-0 ${colorMap[s.color]}`}>
                    {s.code}
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
                  I built this serverless app to understand the full REST API architecture on AWS.
                  At the start I configured IAM policies carefully — assigning least-privilege
                  roles to both the IAM user and the Lambda service role.
                </p>
                <p>
                  Cognito handles authentication: a user pool issues JWT tokens on login.
                  API Gateway verifies the Authorization header against the user pool before
                  forwarding any request to Lambda.
                </p>
                <p>
                  The Lambda Proxy Integration passes the raw request to the function and returns
                  the response directly — giving full control over headers and status codes.
                  A 201 confirms that data was both processed and persisted in DynamoDB.
                </p>
                <p>
                  The architecture is designed for extension: a GET endpoint could retrieve
                  historical unicorn requests from DynamoDB by UnicornID without touching the
                  existing POST flow.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border">
            <a href="/work-single">
              <Button variant="outline" className="border-border gap-2">
                <ArrowLeft className="h-4 w-4" />
                Prev: Cloud Portfolio
              </Button>
            </a>
            <a href="/#projects">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                All Projects
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
