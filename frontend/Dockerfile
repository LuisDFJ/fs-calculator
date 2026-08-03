# --- Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

ARG VITE_SERVER_API_URL=http://localhost:8080
ENV VITE_SERVER_API_URL=$VITE_SERVER_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime Stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
