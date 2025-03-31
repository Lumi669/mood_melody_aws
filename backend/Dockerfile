
# ---------- Stage 1: Build ----------
FROM public.ecr.aws/lambda/nodejs:18 as build

# Install required packages, including Python 3.8 and dev tools
RUN yum install -y gcc-c++ make curl \
 && yum install -y yum-utils \
 && yum-config-manager --enable extras \
 && yum install -y python38 python38-devel glibc-devel libstdc++ \
 && ln -sf /usr/bin/python3.8 /usr/bin/python3 \
 && ln -sf /usr/bin/python3.8 /usr/bin/python \
 && ln -sf /usr/bin/python3.8 /usr/local/bin/python \
 && ln -sf /usr/bin/python3.8 /usr/local/bin/python3

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package.json pnpm-lock.yaml ./

# Set environment for node-gyp to detect Python
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true

# Debug output to verify Python installation
RUN python3 --version && which python3 && ls -l /usr/bin/python3

# Approve better-sqlite3 native build
RUN pnpm dlx pnpm@latest approve-builds better-sqlite3

# Install dependencies and rebuild native bindings
RUN pnpm install
RUN pnpm rebuild better-sqlite3

# Copy source code and build
COPY . .
RUN pnpm run build


# ---------- Stage 2: Final Lambda Image ----------
FROM public.ecr.aws/lambda/nodejs:18

# Working directory for Lambda
WORKDIR /var/task

# Copy production build and dependencies from build stage
COPY --from=build /app/dist ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/moodmelodydatabase.db ./

# Set Lambda entrypoint (change if your handler path is different)
CMD ["index.handler"]
