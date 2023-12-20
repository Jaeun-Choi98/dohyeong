# Stage 1: Build React 프론트엔드
FROM node:latest as react-build
WORKDIR /app
COPY frontend/ ./
RUN npm install
RUN npm run build

# Stage 2: Build Go 백엔드
FROM golang:latest as go-build
WORKDIR /app
COPY backend/ ./
WORKDIR ./main
RUN go mod download && CGO_ENABLED=0 GOOS=linux go build -o goserve  

# Stage 3: Nginx를 사용하여 프론트엔드와 백엔드를 결합
FROM nginx:latest
USER root
