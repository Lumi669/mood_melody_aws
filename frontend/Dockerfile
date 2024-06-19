# FROM node:18-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # Copy configuration files
# COPY tsconfig.json ./

# # Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi


# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line in case you want to disable telemetry during the build.
# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN \
#   if [ -f yarn.lock ]; then yarn run build; \
#   elif [ -f package-lock.json ]; then npm run build; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# # Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV production
# # Uncomment the following line in case you want to disable telemetry during runtime.
# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# # Set the correct permission for prerender cache
# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000
# # set hostname to localhost
# ENV HOSTNAME "0.0.0.0"

# # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/next-config-js/output
# CMD ["node", "server.js"]


# Define the base image with Node.js 20.11.0
FROM node:20.11.0-alpine as base

# Install dependencies that might be required (libc6-compat in this case)
RUN apk add --no-cache libc6-compat

# Set the working directory for the application
WORKDIR /app

# Copy the TypeScript configuration file to the working directory
COPY tsconfig.json ./

# Install npx to force resolutions if necessary
RUN npm install -g npm-force-resolutions

# Copy package management files to the working directory
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Set the SHELL environment variable
ENV SHELL=/bin/sh

# Install pnpm and set up global bin directory
RUN corepack enable pnpm && \
    pnpm setup && \
    export PNPM_HOME="/root/.local/share/pnpm" && \
    export PATH="$PNPM_HOME/bin:$PATH"


# Ensure npm-force-resolutions is installed globally
RUN pnpm add -g npm-force-resolutions

# apply resolutions and Install dependencies based on the presence of the respective lock file
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npx npm-force-resolutions && npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npx npm-force-resolutions && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Copy the rest of the application's source code to the working directory
COPY . .

# Accept build arguments and set them as environment variables
ARG NEXT_PUBLIC_API_URL_0
ARG NEXT_PUBLIC_API_URL_1
ARG NEXT_PUBLIC_API_URL_2
ARG NEXT_PUBLIC_API_URL_3

ENV NEXT_PUBLIC_API_URL_0=${NEXT_PUBLIC_API_URL_0}
ENV NEXT_PUBLIC_API_URL_1=${NEXT_PUBLIC_API_URL_1}
ENV NEXT_PUBLIC_API_URL_2=${NEXT_PUBLIC_API_URL_2}
ENV NEXT_PUBLIC_API_URL_3=${NEXT_PUBLIC_API_URL_3}

# Build the application
RUN if [ -f yarn.lock ]; then yarn run build && ls -la ./out; \
    elif [ -f package-lock.json ]; then npm run build && ls -la ./out; \
    elif [ -f pnpm-lock.yaml ]; then pnpm run build && ls -la ./out; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Start a new stage from the base image to keep the production image clean and small
FROM base as production


# Set environment variables
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Copy the build output to serve the app
COPY --from=base /app/next.config.js ./
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/out ./out
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Define the command to run the app
CMD ["pnpm", "run", "start"]
