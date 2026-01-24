# Lambda Functions Testing Guide

## Overview

This document describes when and how to run tests for the Lambda functions before deployment and upgrades.

---

## When to Run Tests

### 1. **Before Building the .zip File**

After making code changes, always run tests first:

```bash
# Test deploy-status Lambda
cd lambda-functions/deploy-status
pnpm test

# Test trigger-frontend-githubActions Lambda
cd lambda-functions/trigger-frontend-githubActions
pnpm test
```

If all tests pass ✅, proceed to build. If tests fail ❌, fix the code before building.

### 2. **Before Creating and Uploading .zip Files**

Full deployment workflow:

```bash
# For deploy-status
cd lambda-functions/deploy-status
pnpm test          # Run tests

```

build and create .zip files and deploy to aws Lambda according to instructions in

lambda-functions/deploy-status/DEPLOY_STATUS_NOTES.md

# For trigger-frontend-githubActions

```bash
cd lambda-functions/trigger-frontend-githubActions
pnpm test          # Run tests
```

build and create .zip files and deploy to aws Lambda according to instructions in

lambda-functions/trigger-frontend-githubActions/DEPLOY_TRIGGER_FRONTEND_GITHUBACTIONS.md

### 3. **Critical: Before Node.js 24 Upgrade**

This is the most important testing checkpoint:

````bash
# Step 1: Run tests with current Node.js version (20)
cd lambda-functions/deploy-status
pnpm test
cd ../trigger-frontend-githubActions
pnpm test


# Step 2: Upgrade Node.js to 24 locally (using nvm or similar)
nvm install 24
nvm use 24

# Step 3: Run tests again with Node.js 24
cd lambda-functions/deploy-status
pnpm test
cd ../trigger-frontend-githubActions
pnpm test

# Step 4: If all tests pass, rebuild with Node.js 24
build and create .zip files and deploy to aws Lambda according to instructions in

lambda-functions/deploy-status/DEPLOY_STATUS_NOTES.md

and

lambda-functions/trigger-frontend-githubActions/DEPLOY_TRIGGER_FRONTEND_GITHUBACTIONS.md


---

## Test Coverage

### deploy-status Lambda Tests

Located in: `lambda-functions/deploy-status/src/__tests__/index.test.ts`

Tests cover:

- ✅ SVG badge generation (success/failure states)
- ✅ JSON badge schema validation
- ✅ Cache control headers
- ✅ S3 upload operations
- ✅ Environment variable handling

**Run tests:**

```bash
cd lambda-functions/deploy-status
pnpm test
````

### trigger-frontend-githubActions Lambda Tests

Located in: `lambda-functions/trigger-frontend-githubActions/src/__tests__/index.test.ts`

Tests cover:

- ✅ CloudFormation stack retrieval
- ✅ GitHub token validation
- ✅ GitHub Actions dispatch payload formatting
- ✅ Parameter Store integration
- ✅ Error handling for missing configuration

---

## Quick Reference Checklist

Before each deployment after e.g code chagnes:

- [ ] Run tests for both Lambda functions
- [ ] All tests pass ✅
- [ ] Build code (`pnpm build`)
- [ ] Create .zip files
- [ ] Upload to AWS

Before Node.js 24 upgrade:

- [ ] Run tests with Node.js 20
- [ ] Upgrade to Node.js 24
- [ ] Run tests with Node.js 24
- [ ] All tests pass ✅
- [ ] Rebuild code
- [ ] Deploy new .zip files
- [ ] Update Lambda runtime in AWS console to Node.js 24

---

### AWS SDK Compatibility

Both Lambda functions use AWS SDK v3, which is compatible with Node.js 24. No code changes needed for SDK compatibility.

---

## Related Documentation

- [deploy-status Lambda Deployment](./deploy-status/DEPLOY_STATUS_NOTES.md)
- [trigger-frontend-githubActions README](./trigger-frontend-githubActions/DEPLOY_TRIGGER_FRONTEND_GITHUBACTIONS.md)
