FROM node:20.11.0
LABEL Maintainer="Jeff Kranenburg <jwkranenburg@icloud.com>"
LABEL Description="HCS API Server V2"

WORKDIR /app

COPY ./package.json .

RUN npm i --silent

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]