import {
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
  CreateTableCommandInput,
} from "@aws-sdk/client-dynamodb";
import { CloudFormationCustomResourceEvent, Context } from "aws-lambda";
import https from "https";

// Initialize DynamoDB client
const dynamoDB = new DynamoDBClient({ region: "eu-north-1" });

export const handler = async (
  event: CloudFormationCustomResourceEvent,
  context: Context,
) => {
  const tableName = event.ResourceProperties.TableName;
  console.log("Received event:", JSON.stringify(event));

  // Handle Delete event (skipping for now)
  if (event.RequestType === "Delete") {
    await sendResponse(event, context, "SUCCESS", {
      Message: "Delete not required.",
    });
    return;
  }

  // Handle Create event
  if (event.RequestType === "Create") {
    try {
      // Check if the table already exists
      console.log(`Checking if table ${tableName} exists`);
      const describeCommand = new DescribeTableCommand({
        TableName: tableName,
      });

      // Try describing the table to see if it exists
      const data = await dynamoDB.send(describeCommand);
      console.log("Table already exists:", data);

      // Table exists, so skip creation and respond with success
      await sendResponse(event, context, "SUCCESS", {
        Message: "Table exists, skipping creation.",
      });
    } catch (error: any) {
      // Handle ResourceNotFoundException, meaning the table doesn't exist
      if (error.name === "ResourceNotFoundException") {
        console.log(`Table ${tableName} does not exist. Creating now...`);

        // Define table creation parameters
        const createParams: CreateTableCommandInput = {
          TableName: tableName,
          AttributeDefinitions: [
            { AttributeName: "submissionId", AttributeType: "S" },
          ],
          KeySchema: [{ AttributeName: "submissionId", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
        };

        // Create the table
        const createCommand = new CreateTableCommand(createParams);
        await dynamoDB.send(createCommand);
        console.log("Table created successfully");

        // Respond with success after table creation
        await sendResponse(event, context, "SUCCESS", {
          Message: "Table created successfully.",
        });
      } else {
        // If the error is something else, send failure response
        console.error("Unexpected error:", error);
        await sendResponse(event, context, "FAILED", {
          Message: `Error checking table: ${error.message}`,
        });
      }
    }
  }
};

// Helper function to send response back to CloudFormation
const sendResponse = async (
  event: CloudFormationCustomResourceEvent,
  context: Context,
  responseStatus: string,
  responseData: any,
) => {
  const responseBody = JSON.stringify({
    Status: responseStatus,
    Reason: `See the details in CloudWatch Log Stream: ${context.logStreamName}`,
    PhysicalResourceId: context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: responseData,
  });

  const parsedUrl = new URL(event.ResponseURL);
  const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.pathname,
    method: "PUT",
    headers: {
      "Content-Type": "",
      "Content-Length": responseBody.length,
    },
  };

  const req = https.request(options, (res) => {
    console.log("Response sent to CloudFormation:", res.statusCode);
    if (res.statusCode !== 200) {
      console.error(
        `Failed to send response to CloudFormation: ${res.statusCode}`,
      );
    }
  });

  req.on("error", (error) => {
    console.error("Error sending response to CloudFormation:", error);
  });

  req.write(responseBody);
  req.end();
};
