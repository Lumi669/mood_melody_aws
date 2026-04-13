const mockDynamoSend = jest.fn();
const mockPutCommand = jest.fn().mockImplementation((input) => ({ input }));

jest.mock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn(),
}));

jest.mock("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: {
    from: jest.fn(() => ({
      send: mockDynamoSend,
    })),
  },
  PutCommand: mockPutCommand,
}));

import { saveToDynamodbService } from "../services/saveToDynamodbService";

describe("saveToDynamodbService", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(new Date("2026-04-13T10:00:00.000Z"));
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    process.env = {
      ...originalEnv,
      DYNAMO_DB_TABLE_NAME: "feedback-table",
    };
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    process.env = originalEnv;
  });

  it("throws when required fields are missing", async () => {
    await expect(
      saveToDynamodbService({
        firstname: "",
        surname: "Li",
        email: "jinghuan@example.com",
        telephonenumber: "+358401234567",
        title: "Engineer",
        organisation: "Mood Melody",
        message: "Hello",
        roles: ["developer"],
        phoneValidated: true,
      }),
    ).rejects.toThrow("Missing required fields");
  });

  it("saves feedback to DynamoDB and returns a success payload", async () => {
    mockDynamoSend.mockResolvedValue({ $metadata: { httpStatusCode: 200 } });

    const result = await saveToDynamodbService({
      firstname: "Jinghuan",
      surname: "Li",
      email: "jinghuan@example.com",
      telephonenumber: "+358401234567",
      title: "Engineer",
      organisation: "Mood Melody",
      message: "Hello",
      roles: ["developer"],
      phoneValidated: true,
    });

    expect(mockPutCommand).toHaveBeenCalledWith({
      TableName: "feedback-table",
      Item: {
        submissionId: "submission-1776074400000",
        firstname: "Jinghuan",
        surname: "Li",
        email: "jinghuan@example.com",
        telephonenumber: "+358401234567",
        title: "Engineer",
        organisation: "Mood Melody",
        roles: ["developer"],
        message: "Hello",
        phoneValidated: true,
        createdAt: "2026-04-13T10:00:00.000Z",
        ttl: 1778666400,
      },
    });
    expect(result).toEqual({
      message: "Feedback submitted successfully!",
      response: { $metadata: { httpStatusCode: 200 } },
    });
  });

  it("throws a normalized error when DynamoDB write fails", async () => {
    mockDynamoSend.mockRejectedValue(new Error("network issue"));

    await expect(
      saveToDynamodbService({
        firstname: "Jinghuan",
        surname: "Li",
        email: "jinghuan@example.com",
        telephonenumber: "+358401234567",
        title: "Engineer",
        organisation: "Mood Melody",
        message: "Hello",
        roles: ["developer"],
        phoneValidated: true,
      }),
    ).rejects.toThrow("Failed to submit feedback");
  });
});
