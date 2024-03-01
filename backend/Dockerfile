# FROM python:3.6-slim-buster

# WORKDIR /app

# COPY requirements.txt ./

# # RUN pip install -r requirements.txt
# # Use --no-cache-dir for pip install to minimize image size
# RUN pip install --no-cache-dir -r requirements.txt


# COPY . .


# EXPOSE 4000


# CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]


FROM python:3.6-slim-buster

WORKDIR /app

COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container
COPY . .

# Copy entrypoint script and grant execution permissions
COPY entrypoint.sh /app
RUN chmod +x /app/entrypoint.sh

# Expose the port the app runs on
EXPOSE 4000

ENTRYPOINT ["/app/entrypoint.sh"]
