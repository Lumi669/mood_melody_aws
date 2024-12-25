#!/bin/bash -x

if [ ! -d "/tmp/cache" ]; then
  echo "Creating /tmp/cache directory"
  mkdir -p /tmp/cache
fi

# Optionally print only non-sensitive environment variables
echo "Selected Environment Variables:"
echo "NODE_ENV=$NODE_ENV"
echo "PORT=$PORT"

echo "Starting Next.js server"
exec node server.js 2>&1 | tee /tmp/server.log
