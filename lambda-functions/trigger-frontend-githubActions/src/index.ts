import * as AWS from "aws-sdk";
import axios from "axios";

const s3 = new AWS.S3();
const ssm = new AWS.SSM();
const cloudformation = new AWS.CloudFormation();
const codepipeline = new AWS.CodePipeline();

const SIGNAL_BUCKET = "mood-melody-signal-bucket";
const SIGNAL_KEY_PREFIX = "github-action-signal-";

export const handler = async (event: any) => {
  console.log("event ===== ", event);
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
    console.log("githubtoken ==== ", githubToken);

    if (!githubToken) {
      throw new Error("GitHub token not found in Parameter Store");
    }

    // Clean the GitHub token
    githubToken = githubToken.trim();
    console.log("githubToken (trimmed) ==== ", githubToken);

    // Check if the token contains invalid characters
    const invalidChars = /[^a-zA-Z0-9_-]/;
    if (invalidChars.test(githubToken)) {
      throw new Error("GitHub token contains invalid characters");
    }

    // Step 3: Trigger GitHub Actions workflow via repository dispatch
    const githubRepo = "Lumi669/mood_melody_aws"; // Replace with your GitHub username and frontend repo
    const uniqueId = new Date().toISOString().replace(/[-:.TZ]/g, "");

    const url = `https://api.github.com/repos/${githubRepo}/dispatches`;
    console.log("url of github ==== ", url);
    const headers = {
      Authorization: `token ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    };
    console.log("uniqueId generated for dispatch: ", uniqueId);
    const data = {
      event_type: "build-frontend",
      client_payload: {
        BACKEND_API_URL: backendApiUrl,
        UNIQUE_ID: uniqueId,
      },
    };

    await axios.post(url, data, { headers });

    console.log("GitHub Actions workflow triggered with uniqueId: ", uniqueId);

    // Step 4: Wait for the signal file to appear in S3
    const signalKey = `${SIGNAL_KEY_PREFIX}${uniqueId}.json`;
    const waitForSignalFile = async () => {
      for (let i = 0; i < 60; i++) {
        // Wait for up to 10 minutes
        try {
          await s3
            .headObject({ Bucket: SIGNAL_BUCKET, Key: signalKey })
            .promise();
          console.log("Signal file found in S3: ", signalKey);
          return true;
        } catch (error) {
          console.log("Signal file not found yet, retrying...");
          await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds before retrying
        }
      }
      throw new Error("Signal file not found in S3 within the timeout period.");
    };

    await waitForSignalFile();

    // Step 5: Notify CodePipeline of success
    await codepipeline.putJobSuccessResult({ jobId }).promise();
    console.log("CodePipeline job succeeded for jobId: ", jobId);

    return {
      statusCode: 200,
      body: JSON.stringify(
        "Triggered GitHub Actions and verified signal successfully",
      ),
    };
  } catch (error) {
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
          message: errorMessage,
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
