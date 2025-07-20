# Stage 1: Build React app
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install deps
COPY package.json package-lock.json ./
RUN npm install

# ⛳️ COPY the .env file BEFORE build
COPY . .

# ✅ Ensure .env is present in /app and available during build
RUN ls -a && cat .env     # optional: for debug

# Build the app with Vite or CRA
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:1.25-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
