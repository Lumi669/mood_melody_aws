
# # Use an official Node.js runtime as a parent image
# FROM node:18-slim

# # Set the working directory in the container
# WORKDIR /app

# # Install pnpm
# RUN apt-get update && apt-get install -y curl \
#     && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm \
#     && apt-get clean && rm -rf /var/lib/apt/lists/*

# # Set the SHELL environment variable
# ENV SHELL=/bin/sh

# # Set the PNPM_HOME environment variable and add it to the PATH
# ENV PNPM_HOME=/root/.local/share/pnpm
# ENV PATH=$PNPM_HOME:$PATH

# # Copy package.json and pnpm-lock.yaml (if available)
# COPY package.json pnpm-lock.yaml ./

# # Install dependencies
# RUN pnpm install

# # Install TypeScript globally to ensure the tsc command is available
# RUN pnpm add -g typescript

# # Copy the current directory contents into the container
# COPY . .

# # Install development dependencies
# RUN pnpm install --shamefully-hoist

# # Build the project
# RUN pnpm run build

# # Make the entrypoint script executable and run it
# COPY entrypoint.sh /app/entrypoint.sh
# RUN chmod +x /app/entrypoint.sh

# # Expose the port the app runs on
# EXPOSE 4000

# # Define the command to run your app using the entrypoint script
# ENTRYPOINT ["/app/entrypoint.sh"]


# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Install pnpm
RUN apt-get update && apt-get install -y curl \
    && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the SHELL environment variable
ENV SHELL=/bin/sh

# Set the PNPM_HOME environment variable and add it to the PATH
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Install TypeScript globally to ensure the tsc command is available
RUN pnpm add -g typescript

# Copy the current directory contents into the container
COPY . .

# Install development dependencies
RUN pnpm install --shamefully-hoist

# Build the project
RUN pnpm run build

# Verify the build output
RUN echo "Contents of /app/dist:" && ls -la /app/dist



# List contents of the dist directory to verify the build
RUN ls -la /app/dist

# Make the entrypoint script executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run your app using the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]


# Define the default command to run
CMD ["node", "dist/index.js"]
