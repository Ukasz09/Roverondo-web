## Stage 1 - builder
FROM node:14-alpine as builder
RUN npm install npm@7
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . .
RUN npm run build:prod

## Stage 2 - nginx runner
FROM nginx:1.21-alpine
RUN apk add nginx-mod-http-headers-more

COPY --from=builder /usr/src/app/dist/roverondo /usr/share/nginx/html/
COPY --from=builder /usr/src/app/deployment/production/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80/tcp
