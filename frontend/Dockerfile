# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code and environment variables
COPY . .
COPY .env .env

# Build the React app
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:1.25-alpine

# Copy custom NGINX config
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built React files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 and start NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
