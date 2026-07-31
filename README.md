# Code preparation:
Frontend: v0
Backend: Claude


# Cost Optimisation

Traffic Flow

ALB -> Target Group -> 

EC2 instance type: t2.micro (CPU: Single Core | MEM: 1G )

New EC2 instance type: t4g.small (CPU: Dual Core | MEM: 2G) / Currently, Free


# Resource Modulisation
# (1) Network: Network Architecture
# (2) Security: Security Group & Security-related Configuration
# (3) Compute: Server(EC2, AMI)
# (4) Storage: S3, CloudFront

Network: VPC / IGW / 