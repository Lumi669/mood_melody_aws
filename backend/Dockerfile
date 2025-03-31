# ---------- Stage 1: Build ----------
FROM public.ecr.aws/lambda/nodejs:18 as build

RUN yum install -y gcc-c++ make curl \
    && yum install -y yum-utils \
    && yum-config-manager --enable extras \
    && yum install -y python38 python38-devel glibc-devel libstdc++ \
    && ln -sf /usr/bin/python3.8 /usr/bin/python3

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Set env vars before install
ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true
ENV PYTHON=/usr/bin/python3

RUN pnpm dlx pnpm@latest approve-builds better-sqlite3

# Install deps now that PYTHON is set
RUN pnpm install
RUN pnpm rebuild better-sqlite3

COPY . .
RUN pnpm run build

# ---------- Stage 2: Final Lambda Image ----------
FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /var/task

# No need to install or rebuild here
COPY --from=build /app/dist ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/moodmelodydatabase.db ./

CMD ["index.handler"]
