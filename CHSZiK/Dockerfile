FROM node:18.10-alpine as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install ng2-pdf-viewer
COPY . .
RUN npm run build

#STAGE 2
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/chszi-k /usr/share/nginx/html
