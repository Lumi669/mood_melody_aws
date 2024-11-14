import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
});

const dynamoDb = DynamoDBDocumentClient.from(client);
const tableName = process.env.DYNAMO_DB_TABLE_NAME || "test2";

export async function saveAnalyticsData(
  sessionId: string,
  visitTimestamp: string,
  sessionDuration: number,
) {
  console.log("saveAnalyticsData called...");
  console.log("Table Name:", tableName);
  console.log("Analytics Data:", {
    sessionId,
    visitTimestamp,
    sessionDuration,
  });

  // Generate a unique visitId for each visit
  const visitId = `visit-${Date.now()}`;

  const command = new PutCommand({
    TableName: tableName,
    Item: {
      sessionId, // Partition key
      visitId, // Sort key
      visitTimestamp,
      sessionDuration,
      createdAt: new Date().toISOString(),
    },
  });

  try {
    const response = await dynamoDb.send(command);
    console.log("Data saved successfully:", response);
    return {
      message: "Analytics data recorded successfully!",
      data: {
        sessionId,
        visitId,
        visitTimestamp,
        sessionDuration,
        createdAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Error saving analytics data to DynamoDB:", error);
    throw new Error("Failed to record analytics data");
  }
}

export async function getAnalyticsDataBySession(sessionId: string) {
  const command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "sessionId = :sessionId",
    ExpressionAttributeValues: {
      ":sessionId": sessionId,
    },
  });

  try {
    const data = await dynamoDb.send(command);
    console.log("Fetched analytics data:", data.Items);
    return data.Items;
  } catch (error) {
    console.error("Error fetching analytics data from DynamoDB:", error);
    throw new Error("Failed to retrieve analytics data");
  }
}

// Function to get all analytics data using Scan
export async function getAllAnalyticsData() {
  let items: any[] = [];
  let lastEvaluatedKey = undefined;

  do {
    // Explicitly type the command as a ScanCommand
    const command: ScanCommand = new ScanCommand({
      TableName: tableName,
      ExclusiveStartKey: lastEvaluatedKey,
    });

    try {
      const data = await dynamoDb.send(command);
      items = items.concat(data.Items || []);
      lastEvaluatedKey = data.LastEvaluatedKey;
    } catch (error) {
      console.error("Error fetching analytics data from DynamoDB:", error);
      throw new Error("Failed to retrieve all analytics data");
    }
  } while (lastEvaluatedKey);

  console.log("Fetched all analytics data:", items);
  return items;
}
