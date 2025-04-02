




# !!!!!!!!Below version successfully deployed a working lambda function 
# NOTE: 1.  when build image, use `docker build --platform linux/amd64 -t mood-molody-aws-backend .` 
#     i.e add "--platform linux/amd64" in the aws ECR "View push commands" command
#     ref: https://repost.aws/knowledge-center/lambda-docker-image-error

# 2. NOTE: Docker file indicate the copied files should go to container's root
# 3. NOTE: Docker file should indicate the entrypoint


# # Stage 1: Build the application
# FROM public.ecr.aws/lambda/nodejs:18 AS build

# # Install native build tools
# RUN yum install -y gcc-c++ make python3

# # Install pnpm
# RUN npm install -g pnpm

# # Set working directory
# WORKDIR /app

# # Copy lock files and package manifest
# COPY package.json pnpm-lock.yaml ./

# # Enable build scripts and allow better-sqlite3
# ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true
# RUN pnpm install --config.allowed-build-dependencies=better-sqlite3

# # Copy the rest of the code
# COPY . .

# # Build the app
# RUN pnpm run build

# # Stage 2: Final runtime image
# FROM public.ecr.aws/lambda/nodejs:18

# # Install native build tools for Lambda
# RUN yum install -y gcc-c++ make python3

# # Set working directory
# WORKDIR /var/task

# # Copy package files
# COPY package.json pnpm-lock.yaml ./

# # Enable build scripts and allow native bindings
# ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true
# RUN npm install -g pnpm
# RUN pnpm install --config.allowed-build-dependencies=better-sqlite3
# RUN pnpm rebuild better-sqlite3
# RUN pnpm approve-builds

# # Copy build output and node_modules from build stage
# COPY --from=build /app/dist .
# COPY --from=build /app/node_modules ./node_modules

# # Copy SQLite DB file
# COPY --from=build /app/moodmelodydatabase.db ./

# # Lambda entrypoint
# CMD ["index.handler"]


# Stage 1: Build non-native app files
FROM public.ecr.aws/lambda/nodejs:18 AS build

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only manifest and lock file
COPY package.json pnpm-lock.yaml ./

# Install JS-only dependencies (no native builds needed yet)
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true
RUN pnpm install --prod=false --config.allowed-build-dependencies=better-sqlite3

# Copy app source
COPY . .

# Build the app (output to /app/dist)
RUN pnpm run build


# Stage 2: Runtime image (with better-sqlite3 built inside it)
FROM public.ecr.aws/lambda/nodejs:18

# Install native build tools needed for better-sqlite3
RUN yum install -y gcc-c++ make python3

# Set working directory
WORKDIR /var/task

# Install pnpm
RUN npm install -g pnpm

# Copy only manifest and lock file
COPY package.json pnpm-lock.yaml ./

# Set this env var to allow postinstall scripts
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true

# Allow scripts (globally in Docker; safe in CI)
RUN pnpm config set allow-scripts true

# Install production dependencies (postinstall runs now)
RUN pnpm install --prod

# Copy built files and SQLite DB (no node_modules)
COPY --from=build /app/dist .
COPY --from=build /app/moodmelodydatabase.db ./

# Lambda entrypoint
CMD ["index.handler"]
