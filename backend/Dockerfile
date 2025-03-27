




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

# Force rebuild native modules and This ensures native module works on Lambda
RUN pnpm install && \
    npm rebuild better-sqlite3 --build-from-source --platform=linux --arch=x64 --target=18.20.0

# Copy the application code
COPY . .

# Build the project
RUN pnpm run build


# Stage 2: Create the final image for AWS Lambda
FROM public.ecr.aws/lambda/nodejs:18

# Set the working directory
WORKDIR /var/task

# Copy the built artifacts and dependencies from the build stage
COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .


# Copy the database file
COPY --from=build /app/moodmelodydatabase.db ./ 

# Set the entrypoint and command
ENTRYPOINT ["/lambda-entrypoint.sh"]
CMD ["index.handler"]
