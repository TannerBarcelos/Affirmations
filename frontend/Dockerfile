# Stage 1 - Build App
FROM node:16-alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Deploy on Nginx
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD nginx -g 'daemon off;'