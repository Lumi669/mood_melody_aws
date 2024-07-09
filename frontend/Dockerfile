# Stage 1: Build the application
FROM public.ecr.aws/docker/library/node:20.9.0-slim AS builder

WORKDIR /app

# Copy the TypeScript configuration file and package management files to the working directory
COPY tsconfig.json ./
COPY package.json pnpm-lock.yaml ./

# Enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies using pnpm with frozen lockfile to ensure consistency
RUN pnpm install --frozen-lockfile

# Copy the rest of the application's source code to the working directory
COPY . .

# Set the Sharp path
ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp

# Build arguments for setting environment variables
ARG NEXT_PUBLIC_API_URL_0
ARG NEXT_PUBLIC_API_URL_1
# ARG NEXT_PUBLIC_API_URL_2
# ARG NEXT_PUBLIC_API_URL_3

# Set the environment variables for build

ENV NEXT_PUBLIC_API_URL_0=$NEXT_PUBLIC_API_URL_0
ENV NEXT_PUBLIC_API_URL_1=$NEXT_PUBLIC_API_URL_1
# ENV NEXT_PUBLIC_API_URL_2=$NEXT_PUBLIC_API_URL_2
# ENV NEXT_PUBLIC_API_URL_3=$NEXT_PUBLIC_API_URL_3

# Build the application
RUN pnpm run build

# Stage 2: Create the final image for AWS Lambda
FROM public.ecr.aws/docker/library/node:20.9.0-slim AS runner

# Install aws-lambda-adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.2 /lambda-adapter /opt/extensions/lambda-adapter

# Expose port 3000 and set environment variables
ENV PORT=3000 NODE_ENV=production
ENV AWS_LWA_ENABLE_COMPRESSION=true

WORKDIR /app

# Copy static files and images from build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/run.sh ./run.sh
RUN ln -s /tmp/cache ./.next/cache

# Configure the run command to start the server
RUN ["chmod", "+x", "./run.sh"]
CMD exec ./run.sh


# # Define the base image with Node.js 20.11.0
# FROM node:20.11.0-alpine as base

# # Install dependencies that might be required (libc6-compat in this case)
# RUN apk add --no-cache libc6-compat

# # Set the working directory for the application
# WORKDIR /app

# # Copy the TypeScript configuration file to the working directory
# COPY tsconfig.json ./

# # Copy package management files to the working directory
# COPY package.json pnpm-lock.yaml ./

# # Cache-busting argument
# ARG CACHEBUST=1

# # Enable corepack and prepare pnpm
# RUN corepack enable && corepack prepare pnpm@latest --activate

# # Set PNPM_HOME and PATH
# ENV PNPM_HOME=/usr/local/bin
# ENV PATH=${PATH}:${PNPM_HOME}

# # Install dependencies using pnpm with frozen lockfile to ensure consistency
# RUN pnpm install --frozen-lockfile


# # Copy the rest of the application's source code to the working directory
# COPY . .

# # Accept build arguments and set them as environment variables
# ARG NEXT_PUBLIC_API_URL_0
# ARG NEXT_PUBLIC_API_URL_1
# ARG NEXT_PUBLIC_API_URL_2
# ARG NEXT_PUBLIC_API_URL_3

# ENV NEXT_PUBLIC_API_URL_0=${NEXT_PUBLIC_API_URL_0}
# ENV NEXT_PUBLIC_API_URL_1=${NEXT_PUBLIC_API_URL_1}
# ENV NEXT_PUBLIC_API_URL_2=${NEXT_PUBLIC_API_URL_2}
# ENV NEXT_PUBLIC_API_URL_3=${NEXT_PUBLIC_API_URL_3}

# # Build the application
# RUN pnpm run build && ls -la ./out

# # Start a new stage from the base image to keep the production image clean and small
# FROM base as production


# # Set environment variables
# ENV NODE_ENV=production \
#     NEXT_TELEMETRY_DISABLED=1

# # Copy the build output to serve the app
# COPY --from=base /app/next.config.js ./
# COPY --from=base /app/public ./public
# COPY --from=base /app/.next ./.next
# COPY --from=base /app/out ./out
# COPY --from=base /app/node_modules ./node_modules
# COPY --from=base /app/package.json ./package.json

# # Expose the port Next.js runs on
# EXPOSE 3000

# # Define the command to run the app
# CMD ["pnpm", "run", "start"]
