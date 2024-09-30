require("dotenv").config({ path: ".env.local" });
import { ContactFormInputs } from "../types/type";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; // AWS SDK v3
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"; // DynamoDB DocumentClient for SDK v3

// Initialize DynamoDBClient (v3)
const client = new DynamoDBClient({
  region: "eu-north-1",
});

// Initialize DynamoDBDocumentClient
const dynamoDb = DynamoDBDocumentClient.from(client);

export async function saveToDynamodbService(inputData: ContactFormInputs) {
  console.log("saveToDynamodbService get called ...");
  console.log("Input Data: ", inputData);

  // Extract the necessary data from the request body
  const {
    firstname,
    surname,
    email,
    telephonenumber,
    title,
    organisation,
    roles,
    message,
  } = inputData;

  // Check if required fields are provided
  if (
    !firstname ||
    !surname ||
    !email ||
    !telephonenumber ||
    !title ||
    !organisation ||
    !roles
  ) {
    throw new Error("Missing required fields");
  }

  const submissionId = `submission-${Date.now()}`; // Generate unique ID
  const tableName = process.env.DYNAMO_DB_TABLE_NAME;

  console.log("ttttt tableName === ", tableName);

  // DynamoDB PutCommand parameters
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      submissionId,
      firstname,
      surname,
      email,
      telephonenumber,
      title,
      organisation,
      roles,
      message,
      createdAt: new Date().toISOString(),
    },
  });

  try {
    // Execute PutCommand to insert data into DynamoDB
    const response = await dynamoDb.send(command);
    console.log("Data saved successfully:", response);
    return { message: "Feedback submitted successfully!", response };
  } catch (error) {
    console.error("Error saving to DynamoDB:", error);
    throw new Error("Failed to submit feedback");
  }
}
