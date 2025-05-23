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
ARG NEXT_PUBLIC_API_URL_2
ARG NEXT_PUBLIC_API_URL_3
ARG NEXT_PUBLIC_API_URL_4
ARG NEXT_PUBLIC_API_URL_5
ARG NEXT_PUBLIC_API_URL_6
ARG NEXT_PUBLIC_PERSONAL_EMAIL
ARG NEXT_PUBLIC_PERSONAL_PHONE


# Set the environment variables for build
ENV NEXT_PUBLIC_API_URL_0=${NEXT_PUBLIC_API_URL_0}
ENV NEXT_PUBLIC_API_URL_1=${NEXT_PUBLIC_API_URL_1}
ENV NEXT_PUBLIC_API_URL_2=${NEXT_PUBLIC_API_URL_2}
ENV NEXT_PUBLIC_API_URL_3=${NEXT_PUBLIC_API_URL_3}
ENV NEXT_PUBLIC_API_URL_4=${NEXT_PUBLIC_API_URL_4}
ENV NEXT_PUBLIC_API_URL_5=${NEXT_PUBLIC_API_URL_5}
ENV NEXT_PUBLIC_API_URL_6=${NEXT_PUBLIC_API_URL_6}
ENV NEXT_PUBLIC_PERSONAL_EMAIL=$NEXT_PUBLIC_PERSONAL_EMAIL
ENV NEXT_PUBLIC_PERSONAL_PHONE=$NEXT_PUBLIC_PERSONAL_PHONE



# Build the application
RUN pnpm run build

# Stage 2: Create the final image for AWS Lambda
FROM public.ecr.aws/docker/library/node:20.9.0-slim AS runner

# Install aws-lambda-adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter

# Expose port 7000 and set environment variables
ENV PORT=7000 NODE_ENV=production
ENV AWS_LWA_ENABLE_COMPRESSION=true

WORKDIR /app

# Copy static files and images from build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/run.sh ./run.sh
COPY --from=builder /app/server.js ./server.js  

# Install production dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile --prod

# Ensure the .next/cache directory is linked to /tmp/cache
RUN ln -s /tmp/cache ./.next/cache

# Configure the run command to start the server
RUN ["chmod", "+x", "./run.sh"]
CMD ["./run.sh"]
