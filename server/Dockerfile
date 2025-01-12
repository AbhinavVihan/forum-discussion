# Use the official Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json first to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . ./

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
