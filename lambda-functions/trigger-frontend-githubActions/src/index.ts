import * as AWS from "aws-sdk";
import axios from "axios";

const s3 = new AWS.S3();
const ssm = new AWS.SSM();
const cloudformation = new AWS.CloudFormation();
const codepipeline = new AWS.CodePipeline();

const SIGNAL_BUCKET = "mood-melody-signal-bucket";

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
    const url = `https://api.github.com/repos/${githubRepo}/dispatches`;
    console.log("url of github ==== ", url);
    const headers = {
      Authorization: `token ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    };
    const uuid = require("uuid").v4();
    const data = {
      event_type: "build-frontend",
      client_payload: {
        BACKEND_API_URL: backendApiUrl,
        UUID: uuid,
      },
    };

    await axios.post(url, data, { headers });

    // Check if the signal file exists in S3
    const signalKey = `github-action-signal-${uuid}.json`;

    try {
      await s3.headObject({ Bucket: SIGNAL_BUCKET, Key: signalKey }).promise();

      // Signal file exists, proceed to notify CodePipeline of success
      await codepipeline.putJobSuccessResult({ jobId }).promise();
    } catch (s3Error) {
      throw new Error("Signal from GitHub Actions not received yet");
    }

    return {
      statusCode: 200,
      body: JSON.stringify("Triggered GitHub Actions successfully"),
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

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
