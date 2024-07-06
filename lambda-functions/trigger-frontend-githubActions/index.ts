import { SSM, CloudFormation } from "aws-sdk";
import axios from "axios";

const ssm = new SSM();
const cloudformation = new CloudFormation();

export const handler = async (event: any) => {
  try {
    // Step 1: Retrieve CloudFormation outputs
    const stackName = "mood-melody-backend"; // Replace with your CloudFormation stack name

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
    const parameterName = "ggithub-token-mood-melody"; // Replace with the name of your parameter
    const ssmResponse = await ssm
      .getParameter({ Name: parameterName, WithDecryption: true })
      .promise();
    const githubToken = ssmResponse.Parameter?.Value;

    if (!githubToken) {
      throw new Error("GitHub token not found in Parameter Store");
    }

    // Step 3: Trigger GitHub Actions workflow via repository dispatch
    const githubRepo = "Lumi669/mood-melody-aws"; // Replace with your GitHub username and frontend repo
    const url = `https://api.github.com/repos/${githubRepo}/dispatches`;
    const headers = {
      Authorization: `token ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    };
    const data = {
      event_type: "build-frontend", // The event type to trigger
      client_payload: {
        BACKEND_API_URL: backendApiUrl,
      },
    };

    await axios.post(url, data, { headers });

    return {
      statusCode: 200,
      body: JSON.stringify("Triggered GitHub Actions successfully"),
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      statusCode: 500,
      body: JSON.stringify(errorMessage),
    };
  }
};
