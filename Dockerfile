FROM node:latest as build-stage
ENV VUE_APP_API_URL "http://192.168.5.233:8000/api/v2"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
