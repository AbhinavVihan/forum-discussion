# Stage 1: Build the React app
FROM node:16 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the custom nginx.conf to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the default.conf to /etc/nginx/conf.d/ directory
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the React build into the Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Ensure Nginx runs in the foreground
CMD ["nginx", "-g", "daemon off;"]