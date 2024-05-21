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

# # Setup pnpm to enable global installations
# RUN pnpm setup 

# # Setup pnpm to enable global installations
# RUN /bin/sh -c "pnpm setup"

# Set the PNPM_HOME environment variable and add it to the PATH
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH


# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
# RUN pnpm install --only=production
RUN pnpm install


# Install TypeScript globally to ensure the tsc command is available
RUN pnpm add -g typescript

# Copy the current directory contents into the container
COPY . .

# Install development dependencies
RUN pnpm install --shamefully-hoist

RUN pnpm run build

RUN ls -al # This will list all files in the current directory

# Make the entrypoint script executable and run it
COPY entrypoint.sh /app
RUN chmod +x /app/entrypoint.sh

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run your app using the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
