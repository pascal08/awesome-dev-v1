#---------------
# Base
#---------------

FROM node:boron-alpine AS base

# Create app directory
RUN mkdir -p /node/api-server

WORKDIR /node/api-server

COPY . .

RUN npm install

#---------------
# Dev
#---------------

FROM base AS dev

CMD [ "node", ".", "api-server" ]

#---------------
# Prod
#---------------

FROM base AS prod

ENV NODE_ENV production

#COPY nginx/webapp.jeffreyarts.nl.crt /node/api-server/webapp.jeffreyarts.nl.crt
#COPY nginx/webapp.jeffreyarts.nl.key /node/api-server/webapp.jeffreyarts.nl.key

CMD [ "node", ".", "api-server" ]