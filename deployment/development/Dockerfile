FROM node:14-alpine
RUN apk add \
  bash \
  git
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm cache verify
RUN npm install --no-cache
COPY . /usr/src/app
CMD npm run start:inside-docker
