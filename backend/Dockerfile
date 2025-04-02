




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


FROM amazonlinux:2023 AS build

# Install system dependencies using dnf (not yum!)
RUN dnf install -y \
  gcc-c++ \
  make \
  python3 \
  git \
  nodejs \
  npm

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true

# Install native dependencies like better-sqlite3
RUN pnpm install --config.allowed-build-dependencies=better-sqlite3

COPY . .
RUN pnpm run build


# Stage 2: Lambda runtime
FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /var/task

COPY --from=build /app/dist .
COPY --from=build /app/package.json ./
COPY --from=build /app/moodmelodydatabase.db ./
COPY --from=build /app/node_modules ./node_modules

CMD ["index.handler"]
