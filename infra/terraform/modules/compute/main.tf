
## Order: [1] EIP(for SSH) -> [2] EC2 (referencing AMI) 
## ** EC2: placed in one subnet. However, ALB: spans both subnets (multi-AZ requirement)

resource "aws_eip" "eip_for_domain_ec2" {
  instance = aws_instance.domain_ec2.id
  domain   = "vpc"
}

data "aws_ami" "ami_domain_ec2" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-arm64-server-*"]
  }

  filter {
    name   = "architecture" 
    values = ["arm64"]                          # ARM64 architecture supports t4g.small instance.
  }  

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "domain_ec2" {
  ami           = data.aws_ami.ami_domain_ec2.id
  instance_type = var.ec2_type                   # t4g.small
  vpc_security_group_ids = [var.app_sg_id]
  subnet_id = var.subnet_az1
  key_name = var.ssh_key_name

  tags = {
    Name = "domain-ec2"
  }
}