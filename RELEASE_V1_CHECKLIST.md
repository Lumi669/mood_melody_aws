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

Check backend Lambda environment variables in AWS console:

- `DYNAMO_DB_TABLE_NAME`
- `GA4_PROPERTY_ID`
- `NODE_ENV`
- `NUMVERIFY_API_PARAM_NAME`

Check AWS Systems Manager Parameter Store entries:

- `/mood-melody/GA4_SERVICE_ACCOUNT_JSON`
- `/mood-melody-backend/numverifyapikey`
- `github-token-mood-melody`

## Frontend Runtime Config

Verify the frontend GitHub Actions build uses production values for:

- `NEXT_PUBLIC_API_URL_0` = `${BACKEND_API_URL}/`
- `NEXT_PUBLIC_API_URL_1` = `${BACKEND_API_URL}/api/images`
- `NEXT_PUBLIC_API_URL_2` = `${BACKEND_API_URL}/api/musics`
- `NEXT_PUBLIC_API_URL_3` = `${BACKEND_API_URL}/api/test`
- `NEXT_PUBLIC_API_URL_4` = `${BACKEND_API_URL}/api/sentimentanalysis`
- `NEXT_PUBLIC_API_URL_5` = `${BACKEND_API_URL}/api/saveuserfeedback`
- `NEXT_PUBLIC_API_URL_6` = `${BACKEND_API_URL}/api/analytics`
- `NEXT_PUBLIC_PERSONAL_EMAIL`
- `NEXT_PUBLIC_PERSONAL_PHONE`

In the frontend workflow run, confirm `BACKEND_API_URL` points to the production backend URL.

## AWS Infrastructure

- ECR repo exists: `mood-melody-aws`
- CodePipeline exists: `mood-melody`
- CloudFormation stack exists: `mood-melody-backend`
- CloudFormation output contains `BackendApiUrl`
- signal bucket exists: `mood-melody-signal-bucket`
- frontend trigger lambda is deployed and healthy
- CloudFront distribution points to the correct frontend origin

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
