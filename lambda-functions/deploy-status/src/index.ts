import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { CloudFormationCustomResourceEvent } from "aws-lambda";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event: CloudFormationCustomResourceEvent) => {
  console.log("Received event:", JSON.stringify(event));

  const bucketName = process.env.BUCKET_BADGES!;
  const fileName = `${process.env.APP_NAME}-${process.env.STAGE}.svg`;
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20"><text x="0" y="15">deployed</text></svg>`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: svgContent,
    ContentType: "image/svg+xml",
  });

  await s3.send(command);
  console.log(`SVG uploaded to ${bucketName}/${fileName}`);
};
