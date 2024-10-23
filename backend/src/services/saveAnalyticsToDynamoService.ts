// src/services/dynamoService.ts
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "eu-north-1" });
const tableName = "UserFeedbackTable";

// Function to save analytics data to DynamoDB
export const saveAnalyticsData = async (
  userId: string,
  visitTimestamp: string,
  sessionDuration: number,
): Promise<void> => {
  const item = {
    id: { S: `id-${Date.now()}-${Math.floor(Math.random() * 1e9)}` },
    userId: { S: userId || "anonymous" },
    visitTimestamp: { S: visitTimestamp },
    sessionDuration: { N: sessionDuration.toString() },
  };

  const command = new PutItemCommand({
    TableName: tableName,
    Item: item,
  });

  await dynamoDbClient.send(command);
};

// Function to get analytics data from DynamoDB using Query
export const getAnalyticsData = async (userId: string): Promise<any> => {
  const command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "#uid = :userId",
    ExpressionAttributeNames: {
      "#uid": "userId",
    },
    ExpressionAttributeValues: {
      ":userId": { S: userId },
    },
  });

  const data = await dynamoDbClient.send(command);
  return data.Items || [];
};
