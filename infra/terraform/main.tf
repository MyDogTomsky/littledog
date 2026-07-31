# Provision the resource using AWS
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.region
}

## Five Modules: [ network (VPC, subnet, IGW, RT) / security (SG) / compute (EC2) / storage (S3, CloudFront) / alb ]

module "network" {
  source          = "./modules/network"
  vpc_cidr_block  = var.vpc_cidr_block
  subnet_az1_cidr = var.subnet_az1_cidr
  subnet_az2_cidr = var.subnet_az2_cidr

  region_az1 = var.region_az1
  region_az2 = var.region_az2

}

module "security" {
  source = "./modules/security"
  vpc_id = module.network.domain_vpc_id
}
  
module "compute" {  
  source        = "./modules/compute"
  ec2_type      = var.ec2_type
  app_sg_id     = module.security.app_sg_id
  subnet_az1    = module.network.subnet_az1
  ssh_key_name  = var.ssh_key_name
}


module "alb" {
  source = "./modules/alb"
  subnet_az1 = module.network.subnet_az1
  subnet_az2 = module.network.subnet_az2
  alb_sg = module.security.alb_sg_id

  vpc_id = module.network.domain_vpc_id
  ec2_id = module.compute.ec2_id
}

module "edge" {
  source = "./modules/edge"
  alb_dns_name = module.alb.alb_dns_name
}