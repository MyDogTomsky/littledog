## Other modules(Security, Storage, Compute) need Network resource ID

### [1] Security: aws_security_group[sg_alb]
### [2] Compute: aws_instance[domain_ec2]

output "domain_vpc_id" {
    value = aws_vpc.domain_vpc.id
}

output "subnet_az1"  {
    value = aws_subnet.domain_subnet1_az1.id
}

output "subnet_az2" {
    value = aws_subnet.domain_subnet2_az2.id
}