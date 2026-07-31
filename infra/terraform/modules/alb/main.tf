
## Order: [1] ALB -> [2] Target Group with Attachment -> [3] LB_Listener -> [4] Route53(Domain) Record
## Structure: ALB ─ listener(443) ─ target group(80) ─ EC2

##  80 listener  → redirect → 443                    :   (HTTP->HTTPS)
##  443 listener → decryption & forward → TG(80)  


resource "aws_lb_target_group" "domain_alb_tg" {
  name     = "domain-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    path = "/api/live"
    healthy_threshold   = 3
    unhealthy_threshold = 5
    interval            = 30
    timeout             = 5
    matcher             = "200"
  }

}

resource "aws_lb_target_group_attachment" "test" {
  target_group_arn = aws_lb_target_group.domain_alb_tg.arn
  target_id        = var.ec2_id
  port             = 80
}



resource "aws_s3_bucket" "domain_alb" {
  bucket = "domain-alb-logs-0925"

  tags = {
    Name        = "domain_alb_logs_0925"
    Environment = "Production"
  }
}

data "aws_iam_policy_document" "log_bucket_policy" {
  statement {
    effect = "Allow"
    sid    = "AllowLogDeliveryWrite" 

    principals {                                    # Who is allowed to access
      type        = "Service"
      identifiers = ["logdelivery.elasticloadbalancing.amazonaws.com"]
    }

    condition {                                     # Which CloudFront? Only for the request through my distribution
      variable = "AWS:SourceArn"
      values   = [aws_s3_bucket.domain_alb.arn]
      test     = "StringEquals"
    }
    actions = ["s3:GetObject", "s3:PutObject"]            # 99.9%, CloudFront uses S3 to retrieve data.
    resources = ["${aws_s3_bucket.domain_alb.arn}/alb-logs/AWSLogs/156460612806/*"]     # s3 arn/prefix/AWSLogs/MyaccountID/*(all objects)

  }
}
# reference: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html

resource "aws_s3_bucket_policy" "alb_bucket_policy" {
  bucket = aws_s3_bucket.domain_alb.id                         # if doesn't work, use '.bucket' instead of '.id'
  policy = data.aws_iam_policy_document.log_bucket_policy.json
}

resource "aws_lb" "domain_alb" {
  name               = "domain-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.alb_sg]
  subnets            = [var.subnet_az1, var.subnet_az2]         # Network Module

  enable_deletion_protection = false                            # Change to "true" -> in the end

  access_logs {
    bucket  = aws_s3_bucket.domain_alb.id   
    prefix  = "alb-logs"   
    enabled = true
  }

  tags = {
    Name = "domain-alb"
    Environment = "Production"
  }
}

data "aws_acm_certificate" "acm_alb" {
  region = "eu-west-1"
  domain   = "littledogtomsky.com"
  statuses = ["ISSUED"]
  types       = ["AMAZON_ISSUED"]
  
}

# HTTPS TO ALB
resource "aws_lb_listener" "alb_listener_https" {
  load_balancer_arn = aws_lb.domain_alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = data.aws_acm_certificate.acm_alb.arn
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.domain_alb_tg.arn
  }
}

## 80->443 HTTP TO HTTPS
resource "aws_lb_listener" "alb_listener_http" {
  load_balancer_arn = aws_lb.domain_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

