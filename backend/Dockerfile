# ---------- Stage 1: Build ----------
FROM public.ecr.aws/lambda/nodejs:18 as build

# Install Python 3.8 and development tools
RUN yum install -y gcc-c++ make curl tar gzip \
 && curl -sL https://www.python.org/ftp/python/3.8.18/Python-3.8.18.tgz | tar xz \
 && cd Python-3.8.18 \
 && ./configure --enable-optimizations \
 && make -j$(nproc) \
 && make altinstall \
 && ln -sf /usr/local/bin/python3.8 /usr/bin/python3 \
 && ln -sf /usr/local/bin/python3.8 /usr/bin/python

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Set environment for native build
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true

# ✅ Debug check to confirm Python installed
RUN python3 --version && which python3 && ls -l /usr/bin/python3

# Approve native builds
RUN pnpm dlx pnpm@latest approve-builds better-sqlite3

# Install and rebuild native deps
RUN pnpm install
RUN pnpm rebuild better-sqlite3

# Copy source and build
COPY . .
RUN pnpm run build


# ---------- Stage 2: Final Lambda Image ----------
FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /var/task

# Copy built app and node_modules
COPY --from=build /app/dist ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/moodmelodydatabase.db ./

# Lambda entrypoint
CMD ["index.handler"]
