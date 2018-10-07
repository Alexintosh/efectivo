FROM node:8.12.0-alpine
RUN apk update && apk upgrade && apk add --no-cache bash git python make g++
WORKDIR /app
COPY package*.json ./
COPY index.js ./
COPY src ./
RUN npm install
RUN apk del bash git python make g++
CMD [ "npm", "start" ]
