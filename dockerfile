FROM node:16.16.0
WORKDIR /usr/src/ged
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8080
CMD yarn dev
