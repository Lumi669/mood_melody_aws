#!/bin/sh
# Run database migrations
echo "Running Flask Migrate"
flask db upgrade

# Start the Flask application on Heroku's assigned port
echo "Starting Flask app on port $PORT"
exec flask run --host=0.0.0.0 --port=${PORT:-4000}
