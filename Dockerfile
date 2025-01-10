# Use a Node.js base image for building the React app
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight Nginx image for serving the static files
FROM nginx:alpine

# Copy the built React app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server (standard HTTP port)
EXPOSE 80

# Optionally, if you want to use a custom nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]