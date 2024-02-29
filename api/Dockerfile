# syntax=docker/dockerfile:1.4

FROM node:18-alpine

RUN apk add --no-cache openssh-client 
RUN apk add --no-cache openssl
# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci
RUN ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key

RUN openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
RUN cat jwtRS256.key
RUN cat jwtRS256.key.pub

COPY . /usr/src/app

EXPOSE 4000

CMD [ "npm", "start" ]