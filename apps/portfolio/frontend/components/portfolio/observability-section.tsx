"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Activity, Globe, BarChart3, FileSearch, AlertTriangle, XCircle, Cloud, Sun, CloudRain, Server } from "lucide-react"
import Image from "next/image"

type HealthStatus = "passing" | "degraded" | "failing" | "unavailable"
type EndpointStatus = 200 | 503 | 502 | "timeout" | "degraded"

const weatherData = [
  {
    city: "London",
    country: "UK",
    temp: 14,
    min: 11,
    max: 17,
    summary: "Partly Cloudy",
    icon: "cloud",
    image: "/london.jpg",
  },
  {
    city: "Rome",
    country: "Italy",
    temp: 24,
    min: 19,
    max: 28,
    summary: "Sunny",
    icon: "sun",
    image: "/roma-2.jpg",
  },
  {
    city: "Busan",
    country: "South Korea",
    temp: 18,
    min: 15,
    max: 21,
    summary: "Light Rain",
    icon: "rain",
    image: "/busan.jpg",
  },
]

const WeatherIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "sun":
      return <Sun className="h-8 w-8 text-amber-400" />
    case "rain":
      return <CloudRain className="h-8 w-8 text-blue-400" />
    default:
      return <Cloud className="h-8 w-8 text-slate-400" />
  }
}

export function ObservabilitySection() {
  const overallStatus: HealthStatus = "passing"

  return (
    <>
      <section id="observability" className="pt-32 pb-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
              Observability
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4"> System Health </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Monitoring Service Health, Endpoint Availability, <br /> Request Performance, and Nginx logs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 ">
            {/* Service Health */}
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cyan-400" />
                    <CardTitle className="text-base font-semibold">Service Health</CardTitle>
                  </div>
                  <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">GET /api/live · /api/health</code>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-sm"> 
                  <StatusRow label="Liveness" value="Alive" endpoint="/api/live" status="ok" />
                  <StatusRow label="Uptime" value="4d 12h 33m" status="ok" />
                  <StatusRow label="Service" value="system-monitor-api" />
                  <StatusRow label="Revision" value="abc123" />                  
                </div>

                <div className="text-xs text-muted-foreground mt-5 pt-5 border-t border-border space-y-2">
                  <p><strong className="text-foreground/80">Live</strong> = backend process responding</p>
                  <p><strong className="text-foreground/80">system-monitor-api</strong> reports uptime and revision.</p>
                </div>                  
              </CardContent>
            </Card>

            {/* Endpoint Checks: 3 Parts -> Frontend, Backend, Lambda funtion(API) */}
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-cyan-400" />
                    <CardTitle className="text-base font-semibold">Endpoint Checks</CardTitle>
                  </div>
                  <StatusBadge status={overallStatus} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-mono">
                  <EndpointRow endpoint="/" label="Frontend" status={200} latency="45ms" />
                  <EndpointRow endpoint="/api/health" label="Backend API" status={200} latency="12ms" />
                  <EndpointRow endpoint="AWS API Gateway, Lambda → Weather API" label="Weather Service" status={200} latency="124ms" external />
                </div>

                <div className="text-xs text-muted-foreground mt-5 pt-5 border-t border-border space-y-2">
                  <p><strong className="text-foreground/80">→</strong>&emsp;Checks availability, status code, and response latency</p>
                </div>
                {/*<p className="text-xs text-muted-foreground mt-5">*/}
                  
                  {/*Checks availability, status code, and response latency*/}
                {/*</p>*/}
              </CardContent>
            </Card>

            {/* Service Metrics */}
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-cyan-400" />
                    <CardTitle className="text-base font-semibold">Service Metrics</CardTitle>
                    {/* 
                    https://nginx.org/en/docs/http/ngx_http_log_module.html
                    */}
                  </div>
                  <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">GET /api/metrics</code>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-sm">
                  <MetricRow label="Requests" value="1,247" />
                  <MetricRow label="Request Success Rate" value="99%" valueClass="text-emerald-400" />
                  <MetricRow label="Median Latency" value="-ms" />
                  <MetricRow label="P95 Latency" value="18ms" />
                </div>
                <div className="text-xs text-muted-foreground mt-5 pt-5 border-t border-border space-y-2">
                  <p><strong className="text-foreground/80">→</strong>&emsp;Traffic window: last 24h, Last updated: 30s ago</p>
                </div>
                {/*<p className="text-xs text-muted-foreground mt-3">Traffic window: last 24h</p>
                <p className="text-xs text-muted-foreground">Last updated: 30s ago</p>*/}
              </CardContent>
            </Card>

            {/* Log Summary */}
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSearch className="h-5 w-5 text-cyan-400" />
                    <CardTitle className="text-base font-semibold">Nginx Log Summary</CardTitle>
                  </div>
                  <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">GET /api/logs/summary</code>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-sm">
                  <MetricRow label="Log Lines Analysed" value="Last 1,000 lines" />
                  <MetricRow label="4xx Responses" value="12" valueClass="text-amber-400" />
                  <MetricRow label="5xx Responses" value="1" valueClass="text-red-400" />
                  <MetricRow label="Suspicious Attempts" value="8" valueClass="text-amber-400" />
                  
                </div>
                <div className="text-xs text-muted-foreground mt-5 pt-5 border-t border-border space-y-2">
                  <p><strong className="text-foreground/80">→</strong>&emsp;Summary of Nginx access and error logs</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/*<p className="text-center text-xs text-muted-foreground mt-8">
            Values are realistic placeholders designed for live FastAPI integration
          </p>*/}
        </div>  
      </section>

          
      {/* Weather API Section */}

      <section id="weather-api" className="pt-32 pb-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
              Weather API
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">[In Progress] Real-time Weather</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real-time weather data via AWS API Gateway and Lambda
            </p>
          </div>

          

          <div className="grid md:grid-cols-3 gap-6">
            {weatherData.map((weather) => (
              <Card key={weather.city} className="bg-card/50 border-border backdrop-blur-sm overflow-hidden">
                <div className="relative h-96 overflow-hidden">
                  
                  <Image
                    src={weather.image}
                    alt={weather.city}
                    fill
                    className="w-full h-full object-cover object-center"
                  />
                  {/* default external link image
                  <img
                    src={weather.image}
                    alt={weather.city}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  */}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h4 className="text-xl font-bold text-white">{weather.city}</h4>
                    <p className="text-sm text-white/80">{weather.country}</p>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <WeatherIcon type={weather.icon} />
                      <div>
                        <p className="text-3xl font-bold">{weather.temp}°C</p>
                        <p className="text-sm text-muted-foreground">{weather.summary}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border pt-3">
                    <div>
                      <span className="text-muted-foreground">Min: </span>
                      <span className="font-mono">{weather.min}°C</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max: </span>
                      <span className="font-mono">{weather.max}°C</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
            }
          </div>

            {/* External API Status Panel */}
            <Card className="mt-6 bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="font-medium">External API Check</p>
                      <p className="text-xs text-muted-foreground">AWS API Gateway / Lambda</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Healthy</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span>Source: </span>
                      <span className="font-mono">openweathermap</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span>Latency: </span>
                      <span className="font-mono">127ms</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </section>
    </>  
    )
  }

function StatusBadge({ status }: { status: HealthStatus }) {
  const config = {
    passing: { label: "All Passing", className: "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" },
    degraded: { label: "Degraded", className: "border-amber-500/50 text-amber-400 bg-amber-500/10" },
    failing: { label: "Failing", className: "border-red-500/50 text-red-400 bg-red-500/10" },
    unavailable: { label: "Unavailable", className: "border-red-500/50 text-red-400 bg-red-500/10" },
  }

  return (
    <Badge variant="outline" className={`text-xs ${config[status].className}`}>
      {config[status].label}
    </Badge>
  )
}

function StatusRow({
  label,
  value,
  endpoint,
  status,
}: {
  label: string
  value: string
  endpoint?: string
  status?: "ok" | "degraded" | "down"
}) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex items-center gap-1.5">
        {status === "ok" && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
        <span className={status === "ok" ? "text-emerald-400 font-medium" : "text-foreground"}>{value}</span>
        {endpoint && <code className="text-xs text-muted-foreground ml-1">{endpoint}</code>}
      </div>
    </div>
  )
}

function EndpointRow({
  endpoint,
  label,
  status,
  latency,
  external,
}: {
  endpoint: string
  label: string
  status: EndpointStatus
  latency: string
  external?: boolean
}) {
  const getStatusDisplay = (status: EndpointStatus) => {
    if (status === 200) return { icon: CheckCircle2, text: "200 OK", color: "text-emerald-400" }
    if (status === 503) return { icon: XCircle, text: "503", color: "text-red-400" }
    if (status === 502) return { icon: XCircle, text: "502", color: "text-red-400" }
    if (status === "timeout") return { icon: XCircle, text: "Timeout", color: "text-red-400" }
    if (status === "degraded") return { icon: AlertTriangle, text: "Degraded", color: "text-amber-400" }
    return { icon: CheckCircle2, text: String(status), color: "text-emerald-400" }
  }

  const { icon: Icon, text, color } = getStatusDisplay(status)

  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-2">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        <span className="text-foreground/90 text-sm font-sans">{label}</span>
        <code className="text-xs text-muted-foreground">{endpoint}</code>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs ${color}`}>{text}</span>
        <span className="text-muted-foreground text-xs">{latency}</span>
      </div>
    </div>
  )
}

function MetricRow({
  label,
  value,
  valueClass = "text-foreground",
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  )
}
