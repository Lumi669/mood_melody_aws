## Deployment Status Badge System

### Purpose

Automatically display CodePipeline deployment status (success/failure) on the sourcecode page e.g locally http://localhost:3000/about/sourcecode

---

### Steps to Set It Up

1. **Write the CloudFormation template**

Create `aws_build_badges_cf_template.yml` (modified from [this example](https://aws-build-badges-deployment-bucket.s3-eu-west-1.amazonaws.com/aws_build_badges_cf_template.yml)) and upload it to the S3 bucket:  
 `mood-melody-badges`.

2. **Write the Lambda function**

Located at:  
 `mood_melody_aws/lambda-functions/deploy-status/src/index.ts`  
 This function listens to CodePipeline events via CloudWatch and generates the status badge.

To zip the compiled Lambda code:

- deploy-status git:(main) ✗ `pnpm run build`
- deploy-status git:(main) ✗ `cd dist`
- deploy-status git:(main) ✗ `zip ../dist_status_badges.zip index.js`

Then upload dist_status_badges.zip to the S3 bucket:
mood-melody-deploy-status-zip-file.

3. Deploy the stack using CloudFormation

In the AWS console, create a new stack using this template URL:
https://mood-melody-badges.s3.eu-north-1.amazonaws.com/aws_build_badges_cf_template.yml

4. Badge generation

Once deployed, the Lambda function will be triggered on CodePipeline state changes.
It will generate an SVG badge and store it in the S3 bucket:
mood-melody-badges-images-prod, which is created by the CloudFormation stack.

Final badges will be accessible at:

https://${AppName}-badges-images-${Stage}.s3.${Region}.amazonaws.com/${AppName}-${Stage}.svg

Example usage in mood_melody_aws/frontend/src/app/about/sourcecode/page.tsx:

<img
  src="https://mood-melody-badges-images-prod.s3.eu-north-1.amazonaws.com/mood-melody-prod.svg"
  alt="Deploy Status Badge"
/>
