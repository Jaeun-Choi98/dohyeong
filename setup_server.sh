#!/bin/bash

yum update -y 

if [ -x "$(command -v docker)" ]; then
    echo "docker exist"
else
    yum install -y yum-utils
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    systemctl start docker
    systemctl enable docker
    docker network create web_net
fi

exit 0
