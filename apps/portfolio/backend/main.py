from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# CORS configuration
# Permission to send/return traffic between frontend and backend

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],    #/frontend react
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/live")
def live():
    return {"status": "alive"}

@app.get("/api/ready")
def ready():
    return {"status": "ready"}


# Server status with sample data, which will be changed to the real-time data.

@app.get("/api/metrics/summary")
def metrics_summary():
    return {
        "cpu_percent": 42,
        "memory_percent": 65,
        "requests_per_min": 128,
        "uptime_seconds": 86400,
    }

@app.get("/api/logs/summary")
def logs_summary():
    return {
        "total": 1024,
        "by_level": {"info": 900, "warning": 100, "error": 24},
        "recent": [
            {"level": "info", "message": "service started"},
            {"level": "warning", "message": "high memory usage"},
            {"level": "error", "message": "failed to connect to db"},
        ],
    }