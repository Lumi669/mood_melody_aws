# Mood Melody – Add CloudFront (Setup Guide)

## Overview

This guide describes how to add **Amazon CloudFront** in front of the existing API Gateway setup for:

```
https://mood-melody.ensintek.com
```

---

## Current Architecture

```
Squarespace DNS
→ mood-melody.ensintek.com
→ d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com (see below Note22)
→ API Gateway
→ Lambda
```

---

## Target Architecture

```
Squarespace DNS
→ mood-melody.ensintek.com
→ CloudFront
→ d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com
→ API Gateway
→ Lambda
```

---

## Prerequisites

- Access to AWS Console
- Access to Squarespace DNS settings
- Existing API Gateway custom domain:

  ```
  mood-melody.ensintek.com
  ```

- API Gateway domain name:

  ```
  d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com
  ```

  **Note22:**

`d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com` is the API Gateway–generated domain for the custom domain configuration.

- The custom domain `mood-melody.ensintek.com` is configured in API Gateway
- It maps to this domain via DNS
- API Gateway then routes incoming requests to:
  - `mood-melody-frontend` API
  - `$default` stage

---

## Step 1 — Create SSL Certificate (ACM)

CloudFront requires certificates in:

```
us-east-1 (N. Virginia)
```

### Steps

1. Open AWS Certificate Manager
2. Switch region to `us-east-1`
3. Request a public certificate for:

```
mood-melody.ensintek.com
```

4. Complete validation (DNS or email)
5. Wait until status is:

```
Issued
```

---

## Step 2 — Create CloudFront Distribution

1. Go to CloudFront
2. Click **Create distribution**

### Origin Settings

Set:

```
Origin domain:
d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com
```

⚠️ Do NOT use:

```
mood-melody.ensintek.com
```

as the origin.

---

## Step 3 — Configure CloudFront

### Alternate Domain Name (CNAME)

```
mood-melody.ensintek.com
```

---

### SSL Certificate

- Select the ACM certificate for:

  ```
  mood-melody.ensintek.com
  ```

- Must be from:

  ```
  us-east-1
  ```

---

### Viewer Protocol Policy

```
Redirect HTTP to HTTPS
```

---

### Default Behavior

- Allowed methods:

  ```
  GET, HEAD, OPTIONS
  ```

- Cache:
  - Use default or low caching (for dynamic content)

---

## Step 4 — Update Squarespace DNS

After CloudFront is created, note the distribution domain:

```
<distribution-id>.cloudfront.net
```

### Update CNAME

#### Old

```
Host: mood-melody
Value: d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com
```

#### New

```
Host: mood-melody
Value: <distribution-id>.cloudfront.net
```

Example:

```
Host: mood-melody
Value: d11layeg92u022.cloudfront.net
```

---

## Step 5 — Wait for Deployment

- CloudFront deployment: ~5–15 minutes
- DNS propagation: a few minutes up to ~30 minutes

---

## Step 6 — Verify

Open:

```
https://mood-melody.ensintek.com
```

Expected:

- Site loads successfully
- HTTPS works
- Browser shows secure lock 🔒

---

## Troubleshooting

### Issue: SSL Error

```
ERR_SSL_VERSION_OR_CIPHER_MISMATCH
```

#### Cause

- Missing Alternate Domain Name in CloudFront
- Missing or incorrect ACM certificate

#### Fix

Ensure:

```
Alternate domain:
mood-melody.ensintek.com
```

and certificate from:

```
us-east-1
```

---

### Issue: Site works but shows "Not Secure"

#### Cause

Browser cached previous invalid SSL state.

#### Fix

- Open in incognito (if secure → config is correct)
- Hard refresh:

  ```
  Cmd + Shift + R
  ```

- Clear site data
- Wait a few minutes

---

### Issue: Wrong CloudFront Origin

#### Wrong

```
CloudFront → mood-melody.ensintek.com
```

#### Correct

```
CloudFront → d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com
```

---

## Important Notes

### About API Gateway Domain

```
d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com
```

- This is the API Gateway domain behind the custom domain
- It is safe to use as CloudFront origin
- It does not change unless API Gateway is deleted

---

### Why Use CloudFront

- HTTPS termination
- CDN caching
- Better performance
- Central entry point for routing

---

## Final Configuration Summary

### CloudFront

```
Origin:
d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com

Alternate domain:
mood-melody.ensintek.com

SSL:
ACM certificate (us-east-1)
```

---

### Squarespace DNS

```
Type: CNAME
Host: mood-melody
Value: <distribution-id>.cloudfront.net
```

---

## Final Architecture

```
User
→ mood-melody.ensintek.com
→ CloudFront
→ d-t5tuamk2uh.execute-api.eu-north-1.amazonaws.com
→ API Gateway
→ Lambda
```

---

## Optional Future Improvements

- Route `/api/*` separately to backend API
- Optimize caching for Next.js static assets
- Remove API Gateway custom domain if no longer needed
- Add WAF for security

---

## Status

✅ CloudFront configured
✅ HTTPS enabled
✅ DNS updated

```

```
