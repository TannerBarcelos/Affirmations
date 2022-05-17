# Stage 1 - Build App
FROM node:16-alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Deploy on Nginx to port 80 so HTTP traffic can route through
FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html