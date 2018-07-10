FROM node:10.2.1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENTRYPOINT npm run start
