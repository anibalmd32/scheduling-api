FROM node:lts-alpine3.19
WORKDIR /scheduling-api
COPY . /scheduling-api
RUN npm i && npm run build
CMD [ "npm", "start" ]