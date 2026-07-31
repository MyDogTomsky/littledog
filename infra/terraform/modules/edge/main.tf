
# S3 / CloudFront / ALB systems structures

##    aws_s3_bucket -> aws_s3_bucket_public_access_block
## -> aws_cloudfront_origin_access_control -> aws_cloudfront_distribution (STATIC:S3 / BACKEND: ALB)
## -> (data)aws_iam_policy_document[GetObject] -> aws_s3_bucket_policy


## [1] For Static files / CloudFront 

resource "aws_s3_bucket" "domain_static" {
  bucket = "domain-static-storage-0925"

  tags = {
    Name        = "domain_static_storage_0925"
    Environment = "Production"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_public_block" {
  bucket = aws_s3_bucket.domain_static.id

  ## block_public settings
  restrict_public_buckets = true      
  block_public_policy     = true
  ignore_public_acls      = true      
  block_public_acls       = true      
}

resource "aws_cloudfront_origin_access_control" "cloudfront_oac" {
  name                              = "domain-static-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
  
  description                       = "OAC for Cloudfront"
}

data "aws_acm_certificate" "acm_cloudfront" {
  region = "us-east-1"
  domain   = "littledogtomsky.com"
  statuses = ["ISSUED"]
  types       = ["AMAZON_ISSUED"]
  
}

resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  
  price_class         = "PriceClass_100"      # America & Europe
  enabled             = true
  is_ipv6_enabled     = true
  
  default_root_object = "index.html"          # starting point: / -> HomePage
  aliases = ["test.littledogtomsky.com"]      # ["mysite.${local.my_domain}", "yoursite.${local.my_domain}"]
  ##                                          # Let's add the "*.littledogtomsky.com" after completing migration works
  
  
  origin {            
    origin_id                = "static-origin"        # routed(used) by default_cache_behavior
    domain_name              = aws_s3_bucket.domain_static.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_oac.id

  }

  origin {                  
    origin_id                = "backend-origin"       # routed(used) by ordered_cache_behavior
    domain_name              = var.alb_dns_name
  
    custom_origin_config{
      http_port = 80
      https_port = 443
      origin_protocol_policy = "https-only"           # In FastAPI, When CloudFront sends only HTTPS traffic to ALB
      origin_ssl_protocols = ["TLSv1.2"]
    }
  
  }

  default_cache_behavior {    # static files 

    target_origin_id = "static-origin"
    viewer_protocol_policy = "redirect-to-https"                        # HTTP -> HTTPS
    
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]               # CloudFront forwards [allowed method data] to origin (rest are rejected)
    #                                                           # ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]                          # Data with these method are cached at the edge
    
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"     # standard caching process[CachingOptimized]
    
    compress               = true
  
  }

  
  ordered_cache_behavior {    # ALB: /api/ | Checked before default_cache_behavior {}

    target_origin_id = "backend-origin" 
    viewer_protocol_policy = "redirect-to-https"            # When HTTP traffic comes, redirect to HTTPS.
    path_pattern     = "/api/*"                             # /api/ requests are caught here first and routed to backend
    
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE" ]      # Open for extended new API
    cached_methods   = ["GET", "HEAD"]                      # (general) responses of these methods can be cached at the edge
    ##                                                      # (This case) caching is off (CachingDisabled) so these methods are not used.

    cache_policy_id =  "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"               # How to handle caching in the Cloudfront layer.
    origin_request_policy_id =  "b689b0a8-53d0-40ab-baf2-68738e2966ac"      # Backend API needs traffic's METADATA (e.g., headers, cookies) for dynamic communication [client<>backend]
    ## At CloudFront, Cache policy: [CachingDisabled] | origin_request_policy: [AllViewerExceptHostHeader]

    compress               = true                           # for JSON compression
  }

  custom_error_response {
    error_code         = 403                # Forbidden
    response_code      = 200
    response_page_path = "/index.html" 
  }

  custom_error_response {
    error_code         = 404                # Not Found
    response_code      = 200
    response_page_path = "/index.html" 
  }

  restrictions {                      # No region restriction
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn       = data.aws_acm_certificate.acm_cloudfront.arn
    ssl_support_method        = "sni-only"          # How to deliver ACM certificate?
    minimum_protocol_version  = "TLSv1.2_2021"      # Minimum TLS version(Network Protocol)
  }

  tags = {
    Environment = "Production"
  }
}


data "aws_iam_policy_document" "static_bucket_policy" {
  statement {
    effect = "Allow"
    sid    = "AllowLogDeliveryWrite" 

    principals {                                    # Who is allowed to access
      type        = "Service"
      identifiers = ["logdelivery.elasticloadbalancing.amazonaws.com"]
    }

    condition {                                     # Which CloudFront? Only for the request through my distribution
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cloudfront_distribution.arn]
      test     = "StringEquals"
    }
    actions = ["s3:GetObject"]                               # 99.9%, CloudFront uses S3 to retrieve data.
    resources = ["${aws_s3_bucket.domain_static.arn}/*"]     # Only for Object, if need for Bucket, Add "bucket.arn"

  }
}


resource "aws_s3_bucket_policy" "static_bucket_policy" {
  bucket = aws_s3_bucket.domain_static.id                         # if doesn't work, use '.bucket' instead of '.id'
  policy = data.aws_iam_policy_document.static_bucket_policy.json
}

data "aws_route53_zone" "littledog_hosted_zone" {
  name         = "littledogtomsky.com"
}


resource "aws_route53_record" "a_alias_littedog" {
  zone_id = data.aws_route53_zone.littledog_hosted_zone.zone_id
  name    = "test.${data.aws_route53_zone.littledog_hosted_zone.name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cloudfront_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.cloudfront_distribution.hosted_zone_id
    evaluate_target_health = false

    ## When the traffic routes to ALB not Cloudfront, This "evaluate_target_health" -> true
  }
}
