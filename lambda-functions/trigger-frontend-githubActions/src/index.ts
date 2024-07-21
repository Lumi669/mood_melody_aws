import * as AWS from "aws-sdk";
import axios from "axios";

const s3 = new AWS.S3();
const ssm = new AWS.SSM();
const cloudformation = new AWS.CloudFormation();
const codepipeline = new AWS.CodePipeline();

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

    const describeStacksResponse = await cloudformation
      .describeStacks({ StackName: stackName })
      .promise();

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
    const parameterName = "github-token-mood-melody"; // Replace with the name of your parameter
    const ssmResponse = await ssm
      .getParameter({ Name: parameterName, WithDecryption: true })
      .promise();
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
      await s3
        .headObject({ Bucket: SIGNAL_BUCKET, Key: processedKey })
        .promise();
      return {
        statusCode: 200,
        body: JSON.stringify("Already processed."),
      };
    } catch (error: any) {
      if (error.code !== "NotFound") {
        throw error;
      }
      // Proceed if the uniqueId has not been processed
      console.log(`Processing new uniqueId: ${uniqueId}`);
    }

    await axios.post(dispatchUrl, dispatchData, { headers });

    console.log("GitHub Actions workflow triggered with uniqueId: ", uniqueId);

    // Step 4: Poll S3 for Signal File
    const pollS3ForSignal = async () => {
      const signalKey = `${SIGNAL_KEY_PREFIX}${uniqueId}.json`;

      for (let i = 0; i < 60; i++) {
        console.log("Starting iteration i ====== ", i);
        try {
          const response = await s3
            .getObject({ Bucket: SIGNAL_BUCKET, Key: signalKey })
            .promise();

          console.log("response ===== ", response);

          if (response.Body) {
            const signalData = JSON.parse(response.Body.toString("utf-8"));
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
          if (error.code === "NoSuchKey") {
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
      // Notify CodePipeline of failure
      await codepipeline
        .putJobFailureResult({
          jobId,
          failureDetails: {
            message:
              "GitHub Actions failed or signal file not found in S3 within the timeout period.",
            type: "JobFailed",
            externalExecutionId: jobId,
          },
        })
        .promise();
      return {
        statusCode: 500,
        body: JSON.stringify(
          "GitHub Actions failed or signal file not found in S3 within the timeout period.",
        ),
      };
    }

    // Mark this uniqueId as processed
    await s3
      .putObject({
        Bucket: SIGNAL_BUCKET,
        Key: processedKey,
        Body: JSON.stringify({ processed: true }),
      })
      .promise();
    console.log(`Marked uniqueId ${uniqueId} as processed.`);

    // Step 5: Notify CodePipeline of success
    await codepipeline.putJobSuccessResult({ jobId }).promise();
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
    await codepipeline
      .putJobFailureResult({
        jobId,
        failureDetails: {
          message: `GitHub Actions failed: ${errorMessage}`,
          type: "JobFailed",
          externalExecutionId: event["CodePipeline.job"].id,
        },
      })
      .promise();

    return {
      statusCode: 500,
      body: JSON.stringify(errorMessage),
    };
  }
};
