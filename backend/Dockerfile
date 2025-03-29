




# !!!!!!!!Below version successfully deployed a working lambda function 
# NOTE: 1.  when build image, use `docker build --platform linux/amd64 -t mood-molody-aws-backend .` 
#     i.e add "--platform linux/amd64" in the aws ECR "View push commands" command
#     ref: https://repost.aws/knowledge-center/lambda-docker-image-error

# 2. NOTE: Docker file indicate the copied files should go to container's root
# 3. NOTE: Docker file should indicate the entrypoint


# Stage 1: Build the application
FROM public.ecr.aws/lambda/nodejs:18 AS build

# Install gcc-c++ and make
RUN yum install -y gcc-c++ make python3

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Allow native module scripts to run
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true

# Install dependencies with native builds
RUN pnpm install


# Copy the application code
COPY . .

# Build the project
RUN pnpm run build


# Stage 2: Final image
FROM public.ecr.aws/lambda/nodejs:18

RUN yum install -y gcc-c++ make python3

WORKDIR /var/task

COPY package.json pnpm-lock.yaml ./

# ✅ Enable pre/post scripts here too
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true

RUN npm install -g pnpm && pnpm install

# Rebuild better-sqlite3
RUN pnpm rebuild better-sqlite3

COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/moodmelodydatabase.db ./

CMD ["index.handler"]