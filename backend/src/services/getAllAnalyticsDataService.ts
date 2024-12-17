import {
  DynamoDBClient,
  ScanCommand,
  AttributeValue,
} from "@aws-sdk/client-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "eu-north-1" });
const tableName = "test-analysis";

// Define the type for items stored in DynamoDB
export interface AnalyticsItem {
  sessionId: { S: string }; // DynamoDB String Attribute
  visitTimestamp: { S: string }; // DynamoDB String Attribute
  sessionDuration: { N: string }; // DynamoDB Number Attribute as String
}

// Function to get all analytics data
export const getAllAnalyticsData = async (): Promise<AnalyticsItem[]> => {
  const command = new ScanCommand({
    TableName: tableName,
  });

  const data = await dynamoDbClient.send(command);

  // If no items, return an empty array
  if (!data.Items) {
    return [];
  }

  // Transform `data.Items` to match the `AnalyticsItem` interface
  const items: AnalyticsItem[] = data.Items.map((item) => {
    // Ensure type safety when accessing attributes
    if (
      item.sessionId?.S &&
      item.visitTimestamp?.S &&
      item.sessionDuration?.N
    ) {
      return {
        sessionId: { S: item.sessionId.S },
        visitTimestamp: { S: item.visitTimestamp.S },
        sessionDuration: { N: item.sessionDuration.N },
      };
    }
    throw new Error("Invalid item structure in DynamoDB response");
  });

  console.log("Fetched Items === ", items);

  return items;
};
