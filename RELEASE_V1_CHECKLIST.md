# Mood Melody v1 Checklist

## Code And Tests

- `git status` is clean
- backend checks pass:
  - `cd backend`
  - `pnpm test`
  - `pnpm test:coverage`
  - `pnpm build`
- frontend checks pass:
  - `cd frontend`
  - `pnpm test`
  - `pnpm test:coverage`
  - `pnpm test:e2e`
  - `pnpm build`

## GitHub Actions Secrets

- `AWS_REGION`
- `AWS_ACCOUNT_ID`
- `NEXT_PUBLIC_PERSONAL_EMAIL`
- `NEXT_PUBLIC_PERSONAL_PHONE`

## Backend Runtime Config

Check the backend Lambda/container environment in AWS:

- `AWS_REGION`
- `DYNAMO_DB_TABLE_NAME`
- `GA4_PROPERTY_ID`
- `NUMVERIFY_API_PARAM_NAME` if Lambda uses SSM for NumVerify

Check required SSM parameters exist:

- `/mood-melody/GA4_SERVICE_ACCOUNT_JSON`
- `github-token-mood-melody`
- NumVerify parameter referenced by `NUMVERIFY_API_PARAM_NAME`

## Frontend Runtime Config

Confirm the frontend build receives production values for:

- `NEXT_PUBLIC_API_URL_0`
- `NEXT_PUBLIC_API_URL_1`
- `NEXT_PUBLIC_API_URL_2`
- `NEXT_PUBLIC_API_URL_3`
- `NEXT_PUBLIC_API_URL_4`
- `NEXT_PUBLIC_API_URL_5`
- `NEXT_PUBLIC_API_URL_6`
- `NEXT_PUBLIC_PERSONAL_EMAIL`
- `NEXT_PUBLIC_PERSONAL_PHONE`

`BACKEND_API_URL` from the backend-triggered frontend workflow should point to the production backend URL.

## AWS Infrastructure

- backend ECR repo exists: `mood-melody-aws`
- frontend ECR repo exists: `mood-melody-aws`
- CodePipeline exists: `mood-melody`
- CloudFormation stack exists: `mood-melody-backend`
- CloudFormation output contains `BackendApiUrl`
- signal bucket exists: `mood-melody-signal-bucket`
- frontend trigger lambda is deployed and healthy
- frontend deploy-status lambda is deployed if you rely on status badges/signals
- CloudFront distribution points to the correct frontend origin
- S3/static asset setup is correct if used in production

## Product Smoke Check

- homepage loads in production
- mood analysis works in production
- contact form submits in production
- analytics page loads if enabled
- mobile navigation works
- no obvious console/runtime errors in the browser

## Security And Release Hygiene

- rotate any real secret that may have been exposed locally or pasted into chat
- especially rotate `NUMVERIFY_API_KEY` if the value in `backend/.env` is real
- create release tag after final verification:
  - `git tag -a v1.0.0 -m "Mood Melody v1.0.0"`
  - `git push origin v1.0.0`
