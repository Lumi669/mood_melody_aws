#!/bin/bash

# Set the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

# Variables
BUCKET_NAME="mood-melody-aws-deployment"   # Replace with your S3 bucket name
FILE_PATH="${SCRIPT_DIR}/deployment-params.yaml"  # Local path to your .yaml file in the repository
S3_KEY="deployments/deployment-params.yaml"  # Path in S3 where the file will be stored

# Check if the file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "The user-provided path $FILE_PATH does not exist."
  echo "Failed to upload file to S3"
  exit 1
fi

# Upload the file to S3
aws s3 cp "$FILE_PATH" "s3://$BUCKET_NAME/$S3_KEY"

# Check if the upload was successful
if [ $? -eq 0 ]; then
  echo "File successfully uploaded to s3://$BUCKET_NAME/$S3_KEY"
else
  echo "Failed to upload file to S3"
  exit 1
fi
