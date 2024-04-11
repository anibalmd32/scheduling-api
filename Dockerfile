# Base Stage
FROM node:lts-alpine3.19 AS base
ENV DIR /scheduling-api
WORKDIR $DIR

# Development Stage
FROM base AS development
ENV NODE_ENV=development
COPY package*.json $DIR
COPY tsconfig*.json $DIR
COPY src $DIR/src
RUN npm ci
CMD [ "npm", "run", "dev" ]

# Build Stage
FROM base AS build
RUN apk update && apk add --no-cache dumb-init
COPY package*.json $DIR
COPY tsconfig*.json $DIR
COPY src $DIR/src
RUN npm ci
RUN npm run build && \
	npm prune --production

# Production Stage
FROM base AS production
ENV USER=node
ENV NODE_ENV=production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist
USER $USER
CMD [ "node", "dist/app.js" ]