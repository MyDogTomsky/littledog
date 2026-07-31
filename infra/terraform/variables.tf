
# which region & Availability zones
variable "region" {
    type = string
    description = "AWS region"
}

variable "region_az1" {
    type = string
    description = "AWS region Availability Zone 1"  
}

variable "region_az2" {
    type = string
    description = "AWS region Availability Zone 2"  
}

# VPC 
variable "vpc_cidr_block" {
    type = string
    description = "CIDR block for VPC"
}

# Two Subnet (AZ1/ AZ2)
variable "subnet_az1_cidr" {
    type = string
    description = "CIDR block for the first subnet (AZ1)"
}

variable "subnet_az2_cidr" {
    type = string
    description = "CIDR block for the second subnet (AZ2)"
}

variable "ec2_type" {
    type = string
    description = "The type of EC2 instance"
}

variable "ssh_key_name" {
    type = string
    description = "The name of key pairs of SSH to route to EC2"
}
