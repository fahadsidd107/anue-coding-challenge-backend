# Use the official Node.js image as a base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application's port
EXPOSE 5000

# Set the command to start the application
CMD ["node", "dist/main"]
