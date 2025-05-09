//sdk v3

import {
  S3Client,
  HeadObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import {
  CloudFormationClient,
  DescribeStacksCommand,
} from "@aws-sdk/client-cloudformation";

import {
  CodePipelineClient,
  PutJobSuccessResultCommand,
  PutJobFailureResultCommand,
} from "@aws-sdk/client-codepipeline";

import axios from "axios";

async function streamToString(stream: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (c: Uint8Array) => chunks.push(c));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

const s3 = new S3Client({});
const ssm = new SSMClient({});
const cloudformation = new CloudFormationClient({});
const codepipeline = new CodePipelineClient({});

const SIGNAL_BUCKET = "mood-melody-signal-bucket";
const SIGNAL_KEY_PREFIX = "github-action-signal-";
const PROCESSED_KEY_PREFIX = "processed-uniqueid-";

export const handler = async (event: any) => {
  console.log("event ===== ", JSON.stringify(event, null, 2));
  const jobId = event["CodePipeline.job"].id;
  console.log("jobId ====== ", jobId);

  try {
    // Step 1: Retrieve CloudFormation outputs
    const stackName = "mood-melody-backend";

    const describeStacksResponse = await cloudformation.send(
      new DescribeStacksCommand({ StackName: stackName }),
    );

    if (
      !describeStacksResponse.Stacks ||
      describeStacksResponse.Stacks.length === 0
    ) {
      throw new Error("No stacks found in CloudFormation response");
    }

    const outputs = describeStacksResponse.Stacks[0].Outputs;

    let backendApiUrl: string | undefined;
    if (outputs) {
      for (const output of outputs) {
        if (output.OutputKey === "BackendApiUrl") {
          backendApiUrl = output.OutputValue;
          console.log("backendApiUrl === ", backendApiUrl);
          break;
        }
      }
    }

    if (!backendApiUrl) {
      throw new Error(
        "BackendApiUrl not found in CloudFormation stack outputs",
      );
    }

    // Step 2: Retrieve the GitHub token from Parameter Store
    const parameterName = "github-token-mood-melody";

    const ssmResponse = await ssm.send(
      new GetParameterCommand({
        Name: parameterName,
        WithDecryption: true,
      }),
    );
    let githubToken = ssmResponse.Parameter?.Value;

    if (!githubToken) {
      throw new Error("GitHub token not found in Parameter Store");
    }

    // Clean the GitHub token
    githubToken = githubToken.trim();

    // Check if the token contains invalid characters
    const invalidChars = /[^a-zA-Z0-9_-]/;
    if (invalidChars.test(githubToken)) {
      throw new Error("GitHub token contains invalid characters");
    }

    console.log("end of step 2");

    // Step 3: Trigger GitHub Actions workflow via repository dispatch
    const githubRepo = "Lumi669/mood_melody_aws"; // Replace with your GitHub username and frontend repo

    const uniqueId = new Date().toISOString().replace(/[-:.TZ]/g, "");

    const dispatchUrl = `https://api.github.com/repos/${githubRepo}/dispatches`;
    const headers = {
      Authorization: `token ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    };
    const dispatchData = {
      event_type: "build-frontend",
      client_payload: {
        BACKEND_API_URL: backendApiUrl,
        UNIQUE_ID: uniqueId,
      },
    };

    // Idempotency: Check if this uniqueId has already been processed
    const processedKey = `${PROCESSED_KEY_PREFIX}${uniqueId}.json`;

    try {
      await s3.send(
        new HeadObjectCommand({
          Bucket: SIGNAL_BUCKET,
          Key: processedKey,
        }),
      );
      await codepipeline.send(new PutJobSuccessResultCommand({ jobId }));
      return {
        statusCode: 200,
        body: JSON.stringify("Already processed."),
      };
    } catch (err: any) {
      // only swallow real “not found” errors, rethrow anything else
      if (err.name !== "NotFound" && err.name !== "NoSuchKey") {
        throw err;
      }
      // At this point it's a “marker not found”—that's expected, so continue

      console.log("No existing marker, continuing…");
    }

    await axios.post(dispatchUrl, dispatchData, { headers });

    console.log("GitHub Actions workflow triggered with uniqueId: ", uniqueId);

    // Step 4: Poll S3 for Signal File
    const pollS3ForSignal = async () => {
      const signalKey = `${SIGNAL_KEY_PREFIX}${uniqueId}.json`;

      for (let i = 0; i < 60; i++) {
        console.log("Starting iteration i ====== ", i);
        try {
          const response = await s3.send(
            new GetObjectCommand({
              Bucket: SIGNAL_BUCKET,
              Key: `${SIGNAL_KEY_PREFIX}${uniqueId}.json`,
            }),
          );

          console.log("response ===== ", response);

          if (response.Body) {
            // const signalData = JSON.parse(response.Body.toString("utf-8"));
            const bodyString = await streamToString(response.Body);
            const signalData = JSON.parse(bodyString);

            console.log("Signal data from S3 === ", signalData);

            if (signalData.unique_id === uniqueId) {
              if (signalData.status === "success") {
                return true; // Indicate success and exit
              } else if (signalData.status === "failure") {
                return false; // Indicate failure and exit
              }
            }
          } else {
            console.log("Response Body is undefined.");
          }
        } catch (error: any) {
          console.log("error ======= pppp === ", error);
          if (error.name === "NotFound" || error.name === "NoSuchKey") {
            console.log("Signal file not found, retrying...");
          } else {
            console.error("Error getting object from S3:", error);
            throw error;
          }
        }
        console.log("Signal file not ready, retrying...");
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds before retrying
      }

      return false; // Indicate timeout failure
    };

    console.log("before call pollS3ForSignal");
    const signalFound = await pollS3ForSignal();
    console.log("signalFound ==== ", signalFound);

    if (!signalFound) {
      await codepipeline.send(
        new PutJobFailureResultCommand({
          jobId,
          failureDetails: {
            message:
              "GitHub Actions failed or signal file not found in S3 within the timeout period.",
            type: "JobFailed",
          },
        }),
      );
      return {
        statusCode: 500,
        body: JSON.stringify(
          "GitHub Actions failed or signal file not found in S3 within the timeout period.",
        ),
      };
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: SIGNAL_BUCKET,
        Key: processedKey,
        Body: JSON.stringify({ processed: true }),
      }),
    );
    console.log(`Marked uniqueId ${uniqueId} as processed.`);

    // Step 5: Notify CodePipeline of success
    // await codepipeline.putJobSuccessResult({ jobId }).promise();
    await codepipeline.send(new PutJobSuccessResultCommand({ jobId }));
    console.log("CodePipeline job succeeded for jobId: ", jobId);

    return {
      statusCode: 200,
      body: JSON.stringify(
        "Triggered GitHub Actions and verified signal successfully",
      ),
    };
  } catch (error: any) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error occurred: ", errorMessage);

    // Notify CodePipeline of failure

    await codepipeline.send(
      new PutJobFailureResultCommand({
        jobId,
        failureDetails: {
          message: errorMessage,
          type: "JobFailed",
        },
      }),
    );

    return {
      statusCode: 500,
      body: JSON.stringify(errorMessage),
    };
  }
};
