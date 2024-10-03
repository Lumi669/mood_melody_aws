## Note below are run in checkDynamoDbExistence/

# 1. Delete function.zip if existed and want to re-zip

# 2. Delete node_modules and pnpm-lock.yaml file `rm -fr node_modules/ pnpm-lock.yaml`

# 3. Delete dist/ if existed `rm -fr dist`

# 4. run `pnpm install`

# 5. run `pnpm run build`

# 6. run `pnpm prune --prod`

# 7. run `zip -r function.zip dist/ node_modules package.json tsconfig.json`

# 8. upload the .zip file to aws s3

# 9. upload in aws lambda function from s3 again
