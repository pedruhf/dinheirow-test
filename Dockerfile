FROM node:16-alpine

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN npm install

RUN npm run build

CMD ["node", "./api/server.js"]
