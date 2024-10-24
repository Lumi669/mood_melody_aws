import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "eu-north-1" });
const tableName = "test";

// Function to save analytics data to DynamoDB
export const saveAnalyticsData = async (
  sessionId: string,
  visitTimestamp: string,
  sessionDuration: number,
): Promise<void> => {
  const item = {
    sessionId: { S: sessionId }, // Partition key
    visitTimestamp: { S: visitTimestamp },
    sessionDuration: { N: sessionDuration.toString() },
  };

  const command = new PutItemCommand({
    TableName: tableName,
    Item: item,
  });

  await dynamoDbClient.send(command);
};

// Function to get all analytics data from DynamoDB using Scan
export const getAllAnalyticsData = async (): Promise<any> => {
  const command = new ScanCommand({
    TableName: tableName,
  });

  const data = await dynamoDbClient.send(command);
  return data.Items || [];
};
