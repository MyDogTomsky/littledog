
## Order: [1] VPC -> [2] Subnet -> [3] IGW -> [4] Route Table with Association 


resource "aws_vpc" "domain_vpc" {
  cidr_block       = var.vpc_cidr_block
  instance_tenancy = "default"           

  tags = {
    Name = "domain-vpc"     # resource tag: let's use '-' 
  }
}

resource "aws_subnet" "domain_subnet1_az1" {
  vpc_id     = aws_vpc.domain_vpc.id
  cidr_block = var.subnet_az1_cidr
  availability_zone = var.region_az1
  map_public_ip_on_launch = true            # indicating the subnet is for the public, 
  #                                         # public ip is assigned automatically for EC2 in this subnet

  tags = {
    Name = "domain-subnet1"
  }
}

# added attributes: availability_zone // map_public_ip_on_launch

resource "aws_subnet" "domain_subnet2_az2" {
  vpc_id     = aws_vpc.domain_vpc.id
  cidr_block = var.subnet_az2_cidr
  availability_zone = var.region_az2
  map_public_ip_on_launch = true
  
  tags = {
    Name = "domain-subnet2"
  }
}

resource "aws_internet_gateway" "domain_igw" {
  vpc_id = aws_vpc.domain_vpc.id

  tags = {
    Name = "domain-igw"
  }
}

resource "aws_route_table" "domain_rt" {
  vpc_id = aws_vpc.domain_vpc.id

  route {
    cidr_block = "0.0.0.0/0"            # to the internet
    gateway_id = aws_internet_gateway.domain_igw.id
  }

  tags = {
    Name = "domain-rt"
  }
}

resource "aws_route_table_association" "az1_rt" {
  subnet_id      = aws_subnet.domain_subnet1_az1.id
  route_table_id = aws_route_table.domain_rt.id
}

resource "aws_route_table_association" "az2_rt" {
  subnet_id      = aws_subnet.domain_subnet2_az2.id
  route_table_id = aws_route_table.domain_rt.id
}
