
## Traffic -> ALB(Ingress/Egress) -> APP(EC2)(Ingress/Egress)
## Order: [1] ALB -> [2] APP  


# [1] Load Balancer Security Group -> HTTP / HTTPS 

resource "aws_security_group" "sg_alb" {
  name        = "sg_alb"
  description = "Load Balancer[ALB] Security Group -> HTTP/HTTPS inbound, All outbound"
  vpc_id      = var.vpc_id

  tags = {
    Name = "sg-alb"
  }
}

resource "aws_vpc_security_group_ingress_rule" "alb_http" {
  security_group_id = aws_security_group.sg_alb.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_ingress_rule" "alb_https" {
  security_group_id = aws_security_group.sg_alb.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

resource "aws_vpc_security_group_egress_rule" "alb_outbound" {
  security_group_id            = aws_security_group.sg_alb.id
  referenced_security_group_id = aws_security_group.sg_app.id
  from_port                    = 80
  ip_protocol                  = "tcp"    # Offloaded HTTP traffic from ALB to App
  to_port                      = 80
  
  #cidr_ipv4         = "0.0.0.0/0"  -> Forwarding to the Internet
  #ip_protocol       = "-1"         -> Forwarding to the Internet
}


## ingress [cidr_ipv4]: incoming traffic ip address range
## egress  [cidr_ipv4]: outgoing traffic ip address range
## egress  [ip_protocol = -1]: All protocol is allowed.
## egress  [referenced_security_group_id -> application security]: After Load balancer, the traffic routes to Application.


# [2] Application[in EC2] Security Group -> HTTP // SSH

resource "aws_security_group" "sg_app" {
  name        = "sg_app"
  description = "App[EC2] Security Group -> HTTP/HTTPS/SSH inbound, All outbound"
  vpc_id      = var.vpc_id

  tags = {
    Name = "sg-app"
  }
}

resource "aws_vpc_security_group_ingress_rule" "app_http" {
  security_group_id             = aws_security_group.sg_app.id
  referenced_security_group_id  = aws_security_group.sg_alb.id
  from_port                     = 80
  ip_protocol                   = "tcp"
  to_port                       = 80
}


resource "aws_vpc_security_group_ingress_rule" "app_ssh" {
  security_group_id = aws_security_group.sg_app.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_egress_rule" "app_outbound" {
  security_group_id = aws_security_group.sg_app.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}