#!/bin/bash -x

if [ ! -d "/tmp/cache" ]; then
  echo "Creating /tmp/cache directory"
  mkdir -p /tmp/cache
fi

echo "Environment Variables:"
env

echo "Starting Next.js server"
exec node server.js 2>&1 | tee /tmp/server.log
