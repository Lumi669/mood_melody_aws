import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { CodePipelineCloudWatchEvent } from "aws-lambda";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event: CodePipelineCloudWatchEvent) => {
  console.log("Received event:", JSON.stringify(event));

  const bucketName = process.env.BUCKET_BADGES!;
  const appName = process.env.APP_NAME!;
  const stage = process.env.STAGE!;
  const fileName = `${appName}-${stage}.svg`;

  const state = event.detail.state;
  const label = "Deploy";
  const status = state === "SUCCEEDED" ? "passing" : "failed";
  const color = state === "SUCCEEDED" ? "#4c1" : "#e05d44";

  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="110" height="20">
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <rect rx="3" width="110" height="20" fill="#555"/>
  <rect rx="3" x="55" width="55" height="20" fill="${color}"/>
  <path fill="${color}" d="M55 0h4v20h-4z"/>
  <rect rx="3" width="110" height="20" fill="url(#a)"/>
  <g fill="#fff" text-anchor="middle"
     font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
    <text x="27.5" y="14">${label}</text>
    <text x="82.5" y="14">${status}</text>
  </g>
</svg>`;

  // 1️⃣ Upload the SVG
  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: svgContent,
      ContentType: "image/svg+xml",
      CacheControl: "no-cache, max-age=0, must-revalidate",
    }),
  );
  console.log(`SVG uploaded to ${bucketName}/${fileName}`);

  // 2️⃣ Now upload the JSON for Shields
  const json = JSON.stringify({
    schemaVersion: 1,
    label: "deploy",
    message: status, // "passing" or "failed"
    color: state === "SUCCEEDED" ? "brightgreen" : "red",
  });
  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: "deploy-status.json",
      Body: json,
      ContentType: "application/json",
      CacheControl: "no-cache, max-age=0, must-revalidate",
    }),
  );
  console.log(`JSON uploaded to ${bucketName}/deploy-status.json`);
};
