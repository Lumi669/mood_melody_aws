




# !!!!!!!!Below version successfully deployed a working lambda function 
# NOTE: 1.  when build image, use `docker build --platform linux/amd64 -t mood-molody-aws-backend .` 
#     i.e add "--platform linux/amd64" in the aws ECR "View push commands" command
#     ref: https://repost.aws/knowledge-center/lambda-docker-image-error

# 2. NOTE: Docker file indicate the copied files should go to container's root
# 3. NOTE: Docker file should indicate the entrypoint


# Stage 1: Build the application
FROM public.ecr.aws/lambda/nodejs:18 AS build

RUN yum install -y gcc-c++ make python3
RUN npm install -g pnpm

WORKDIR /app

# Copy lock files early
COPY package.json pnpm-lock.yaml ./

# Enable and approve native build scripts
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true
RUN pnpm dlx pnpm@latest approve-builds better-sqlite3
RUN pnpm install

# Copy rest of the app and build
COPY . .
RUN pnpm run build


# Stage 2: Final Lambda image
FROM public.ecr.aws/lambda/nodejs:18

# Install build tools
RUN yum install -y gcc-c++ make python3

WORKDIR /var/task

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Enable pre/post scripts
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true

# ✅ Approve better-sqlite3 build script
RUN pnpm dlx pnpm@latest approve-builds better-sqlite3

# ✅ Install dependencies
RUN pnpm install

# ✅ Rebuild native bindings
RUN pnpm rebuild better-sqlite3

# Copy build artifacts and node_modules
COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/moodmelodydatabase.db ./

CMD ["index.handler"]

