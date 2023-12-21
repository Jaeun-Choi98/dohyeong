#!/bin/bash

# Nginx 실행
nginx -g 'daemon off;' &

# Go 서버 실행
/usr/share/nginx/html/api/goserve
