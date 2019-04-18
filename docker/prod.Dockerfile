### STAGE 1: Build ###

# We label our stage as ‘node’
FROM node:8.11-alpine as node

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY ./ .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer --locale es


### STAGE 2: Setup ###

FROM nginx:1.12-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘node’ stage copy over the artifacts in dist folder to default nginx public folder
ADD nginx/nginx.conf /etc/nginx/nginx.conf
ADD nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=node /ng-app/dist /static_webpage

EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
