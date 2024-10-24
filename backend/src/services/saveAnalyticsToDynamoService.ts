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
): Promise<{
  sessionId: string;
  visitTimestamp: string;
  sessionDuration: number;
}> => {
  const item = {
    sessionId: { S: sessionId }, // Partition key
    visitTimestamp: { S: visitTimestamp },
    sessionDuration: { N: sessionDuration.toString() },
  };

  console.log("iiiiii item from saveAnalyticsData === ", item);

  const command = new PutItemCommand({
    TableName: tableName,
    Item: item,
  });

  // Save data to DynamoDB
  await dynamoDbClient.send(command);

  // Return the saved data as the response
  return {
    sessionId,
    visitTimestamp,
    sessionDuration,
  };
};

// Function to get all analytics data from DynamoDB using Scan
export const getAllAnalyticsData = async (): Promise<any> => {
  const command = new ScanCommand({
    TableName: tableName,
  });

  const data = await dynamoDbClient.send(command);

  console.log("dddd data from getAllAnalyticData function === ", data);
  return data.Items || [];
};
