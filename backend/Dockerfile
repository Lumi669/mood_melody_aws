

# # !!!!! Note this version works locally, not working for deploy to aws lambda
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

# # Verify the build output
# RUN echo "Contents of /app/dist:" && ls -la /app/dist






# !!!!!!!!Below version successfully deployed a working lambda function 
# NOTE: 1.  when build image, use `docker build --platform linux/amd64 -t mood-molody-aws-backend .` 
#     i.e add "--platform linux/amd64" in the aws ECR "View push commands" command
#     ref: https://repost.aws/knowledge-center/lambda-docker-image-error

# 2. NOTE: Docker file indicate the copied files should go to container's root
# 3. NOTE: Docker file should indicate the entrypoint


# Stage 1: Build the application
FROM public.ecr.aws/lambda/nodejs:18 AS build

# Install gcc-c++ and make
RUN yum install -y gcc-c++ make

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the application code
COPY . .

# Build the project
RUN pnpm run build

# Stage 2: Create the final image for AWS Lambda
FROM public.ecr.aws/lambda/nodejs:18

# Set the working directory
WORKDIR /var/task

# Copy the built artifacts and dependencies from the build stage
COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .


# Copy the database file

COPY moodmelodydatabase.db .

# Set the entrypoint and command
ENTRYPOINT ["/lambda-entrypoint.sh"]
CMD ["index.handler"]
