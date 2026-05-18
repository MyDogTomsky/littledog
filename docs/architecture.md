# Architecture

This project is a rebuild of the original Flask/Jenkins portfolio application.

The platform contains two applications:

- `legacy-flask`:       existing Flask/Bootstrap application served at `test.littledogtomsky.com`
- `main-react-fastapi`: React/FastAPI application served at `littledogtomsky.com`


- Legacy Architecture = ALB + EC2 + Nginx + Flask + Jenkins
- Target Architecture = CloudFront + EC2/Nginx + Docker Compose + GitHub Actions



## Key Changes
- Removed ALB to reduce fixed monthly cost       
- Replaced Jenkins with GitHub Actions          
- Split legacy and new applications             
- Kept Nginx as reverse proxy                   
- Planned CloudFront as edge entry point

## Repository Structure

```text

D:\domain\littledog\
├── apps\
│   ├── legacy-flask\
│   │   ├── web_app\
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   └── main-react-fastapi\
│       ├── frontend\
│       ├── backend\
│       └── README.md
│
├── infra\
│   └── terraform\
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       ├── data.tf
│       ├── terraform.tfvars.example
│       └── scripts\
│           └── bootstrap.sh 
│
├── configuration\
│   ├── nginx\
│   │   └── conf.d\
│   │       └── littledog.nginx.conf
│   │
│   └── docker\
│       └── daemon.json
│
├── scripts\
│   ├── legacy-jenkins-deploy.sh
│   ├── deploy.sh
│   └── reload-nginx.sh
│
├── docs\
│   ├── architecture.md
│   ├── deployment.md
│   ├── legacy-jenkins.md
│   ├── migration-plan.md
│   └── dev-log.md
│
├── docker-compose.yml
├── .gitignore
├── .dockerignore
└── README.md

```
`terraform.tfvars` is used locally and excluded from version control.

## Container Layout

The EC2 instance runs Nginx as the reverse proxy and Docker as the container runtime.

```text

EC2 host
├── Nginx reverse proxy
├── Docker runtime
│   ├── legacy-flask container       : internal port 5000
│   ├── main-fastapi-backend         : internal port 8000
│   └── main-react-frontend          : internal port 80

```        

## Target Architecture

```text

User
  ↓
Route 53
  ↓
CloudFront
  ↓
EC2 (public origin)
  ↓
Nginx reverse proxy
  ├─ test.littledogtomsky.com → legacy-flask:5000
  └─ littledogtomsky.com
       ├─ /api/* → main-fastapi-backend:8000
       └─ /*     → main-react-frontend:80

```

## Target Deployment Flow 

```text

GitHub push
  ↓
GitHub Actions
  ↓
build / test / push image
  ↓
EC2
  ↓
docker compose pull
  ↓  
docker compose up -d

```

## Legacy Architecture

```text

User
  ↓
Route 53
  ↓
Application Load Balancer
  ↓
EC2
  ↓
Nginx reverse proxy + rate limiting
  ↓
Flask Docker container
  ├─ renders Bootstrap/Jinja templates
  ├─ calls API Gateway
  │    ↓
  │  AWS Lambda
  │    ↓
  │  Weather API
  └─ uses CloudFront image/static references

```

## Legacy Deployment Flow       

```text

GitHub push
  ↓
GitHub Webhook
  ↓
Jenkins on EC2
  ↓
stop container → remove → build → run

```