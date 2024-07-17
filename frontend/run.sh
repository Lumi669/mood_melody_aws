
#!/bin/bash -x

# Check if /tmp/cache exists, if not, create it
if [ ! -d "/tmp/cache" ]; then
  echo "Creating /tmp/cache directory"
  mkdir -p /tmp/cache
fi

# Log the environment variables
echo "Environment Variables:"
env

# Start the Next.js server
echo "Starting Next.js server"
exec node server.js
