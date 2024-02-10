# Use an official Node runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (or package-lock.json if you use npm)
COPY package.json pnpm-lock.yaml ./

# Install any dependencies
RUN pnpm install

# Create a directory to serve as the FTP root
RUN mkdir -p /ftp && chmod -R 777 /ftp

# Copy the rest of your application's code
COPY . .

# Compile TypeScript to JavaScript
RUN pnpm run build

# Inform Docker the container listens on port 21 and the passive ports range
EXPOSE 21 30000-30009

# Run the app
CMD [ "node", "dist/index.js" ]