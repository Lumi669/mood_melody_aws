#!/bin/sh
# Example of a Node.js entrypoint script

# Run database migrations (modify as needed for your setup)
echo "Running database migrations"
npx sequelize db:migrate

# Start the Node.js application on Heroku's assigned port or a default port
echo "Starting Node.js app on port $PORT"
exec node index.js --port=${PORT:-4000}
