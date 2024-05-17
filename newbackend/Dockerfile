# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Install pnpm
RUN apt-get update && apt-get install -y curl \
    && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN pnpm install --only=production

# Copy the current directory contents into the container
COPY . .

# Make the entrypoint script executable and run it
COPY entrypoint.sh /app
RUN chmod +x /app/entrypoint.sh

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run your app using the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
