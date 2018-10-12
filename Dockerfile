FROM node:8-slim

WORKDIR /usr/src/app

ADD package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD yarn start