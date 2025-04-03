




# !!!!!!!!Below version successfully deployed a working lambda function 
# NOTE: 1.  when build image, use `docker build --platform linux/amd64 -t mood-molody-aws-backend .` 
#     i.e add "--platform linux/amd64" in the aws ECR "View push commands" command
#     ref: https://repost.aws/knowledge-center/lambda-docker-image-error

# 2. NOTE: Docker file indicate the copied files should go to container's root
# 3. NOTE: Docker file should indicate the entrypoint





# Stage 1: Build with Amazon Linux 2023 and Node.js 20
FROM amazonlinux:2023 AS build

# Add NodeSource Node.js 20 repo and install
RUN curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - && \
    dnf install -y --allowerasing \
    nodejs \
    gcc-c++ \
    make \
    git \
    python3 \
    python3-devel \
    glibc-devel \
    libstdc++ \
    curl \
    tar \
    gzip \
    shadow-utils

# Set up environment variables
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Install dependencies (build better-sqlite3 against Node.js 20)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --config.allowed-build-dependencies=better-sqlite3

# Copy app and build
COPY . .
RUN pnpm run build

# Stage 2: Lambda runtime (Node.js 20)
FROM public.ecr.aws/lambda/nodejs:20

WORKDIR /var/task

COPY --from=build /app/dist ./
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/moodmelodydatabase.db ./

CMD ["index.handler"]
