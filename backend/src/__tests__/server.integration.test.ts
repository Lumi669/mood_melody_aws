process.env.NODE_ENV = "test";
process.env.GA4_PROPERTY_ID = "123456";

const mockAnalyzeSentiment = jest.fn();
const mockSaveToDynamodbService = jest.fn();
const mockValidatePhoneNumber = jest.fn();
const mockSsmSend = jest.fn();
const mockRunReport = jest.fn();

jest.mock("../services/comprehendService", () => ({
  analyzeSentiment: (...args: unknown[]) => mockAnalyzeSentiment(...args),
}));

jest.mock("../services/saveToDynamodbService", () => ({
  saveToDynamodbService: (...args: unknown[]) =>
    mockSaveToDynamodbService(...args),
}));

jest.mock("../services/validatePhoneNumberService", () => ({
  validatePhoneNumber: (...args: unknown[]) => mockValidatePhoneNumber(...args),
}));

jest.mock("@aws-sdk/client-ssm", () => ({
  SSMClient: jest.fn().mockImplementation(() => ({
    send: mockSsmSend,
  })),
  GetParameterCommand: jest.fn().mockImplementation((input) => input),
}));

jest.mock("@google-analytics/data", () => ({
  BetaAnalyticsDataClient: jest.fn().mockImplementation(() => ({
    runReport: mockRunReport,
  })),
}));

import { handler } from "../server";

type HandlerEventOptions = {
  body?: object | string | null;
  headers?: Record<string, string>;
  method?: string;
  path: string;
  sourceIp?: string;
};

const createEvent = ({
  body = null,
  headers = {},
  method = "GET",
  path,
  sourceIp = "203.0.113.10",
}: HandlerEventOptions) => ({
  body:
    body == null
      ? null
      : typeof body === "string"
        ? body
        : JSON.stringify(body),
  headers,
  httpMethod: method,
  isBase64Encoded: false,
  multiValueHeaders: {},
  multiValueQueryStringParameters: null,
  path,
  pathParameters: null,
  queryStringParameters: null,
  requestContext: {
    identity: {
      sourceIp,
    },
    path,
  },
  resource: path,
  stageVariables: null,
});

const parseBody = (response: { body?: string | null }) =>
  response.body ? JSON.parse(response.body) : null;

describe("backend server integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("serves the root route through the real app", async () => {
    const response = (await handler(
      createEvent({ path: "/" }) as any,
      {} as any,
    )) as any;

    expect(response.statusCode).toBe(200);
    expect(parseBody(response)).toBe(
      "Welcome to the backend of the mood-melody app .......//",
    );
  });

  it("serves the test route through the real app", async () => {
    const response = (await handler(
      createEvent({ path: "/test" }) as any,
      {} as any,
    )) as any;

    expect(response.statusCode).toBe(200);
    expect(parseBody(response)).toBe("Test is working ...test222333");
  });

  it("runs the sentiment route end-to-end through middleware and routing", async () => {
    mockAnalyzeSentiment.mockResolvedValue("POSITIVE");

    const response = (await handler(
      createEvent({
        path: "/api/sentimentanalysis",
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://localhost:3000",
        },
        body: { text: "I feel great today" },
        sourceIp: "203.0.113.11",
      }) as any,
      {} as any,
    )) as any;

    expect(response.statusCode).toBe(200);
    expect(parseBody(response)).toEqual({ sentiment: "POSITIVE" });
    expect(response.headers["access-control-allow-origin"]).toBe(
      "http://localhost:3000",
    );
  });

  it("returns validation errors from the sentiment route through the app", async () => {
    const response = (await handler(
      createEvent({
        path: "/api/sentimentanalysis",
        method: "POST",
        headers: { "content-type": "application/json" },
        body: { text: "" },
        sourceIp: "203.0.113.12",
      }) as any,
      {} as any,
    )) as any;

    expect(response.statusCode).toBe(400);
    expect(parseBody(response)).toEqual({
      error: "Text is required for sentiment analysis",
    });
  });

  it("saves user feedback through the real app with mocked services", async () => {
    mockValidatePhoneNumber.mockResolvedValue({
      isValid: true,
      validationStatus: "validated",
    });
    mockSaveToDynamodbService.mockResolvedValue({
      message: "Feedback submitted successfully!",
      response: { $metadata: {} },
    });

    const response = (await handler(
      createEvent({
        path: "/api/saveuserfeedback",
        method: "POST",
        headers: { "content-type": "application/json" },
        body: {
          firstname: "Jinghuan",
          surname: "Li",
          email: "jinghuan@example.com",
          telephonenumber: "+358401234567",
          title: "Engineer",
          organisation: "Mood Melody",
          message: "Hello team",
          roles: ["developer"],
        },
        sourceIp: "203.0.113.13",
      }) as any,
      {} as any,
    )) as any;

    expect(response.statusCode).toBe(200);
    expect(parseBody(response)).toEqual({
      message: "Data saved successfully!",
      validationStatus: "validated",
    });
  });

  it("returns analytics data through the real app", async () => {
    mockSsmSend.mockResolvedValue({
      Parameter: {
        Value: JSON.stringify({
          client_email: "service@example.com",
          private_key: "private-key",
          project_id: "ga-project",
        }),
      },
    });
    mockRunReport.mockResolvedValue([
      {
        rows: [
          {
            dimensionValues: [
              { value: "/home" },
              { value: "Home" },
              { value: "mobile" },
            ],
            metricValues: [{ value: "5" }, { value: "3" }, { value: "9" }],
          },
        ],
      },
    ]);

    const response = (await handler(
      createEvent({
        path: "/api/analytics",
        method: "GET",
        sourceIp: "203.0.113.14",
      }) as any,
      {} as any,
    )) as any;

    expect(response.statusCode).toBe(200);
    expect(parseBody(response)).toEqual([
      {
        pagePath: "/home",
        pageTitle: "Home",
        deviceCategory: "mobile",
        activeUsers: 5,
        newUsers: 3,
        screenPageViews: 9,
      },
    ]);
  });

  it("returns a 429 after the same client exceeds the global rate limit", async () => {
    const event = createEvent({
      path: "/test",
      method: "GET",
      sourceIp: "203.0.113.99",
    });

    for (let index = 0; index < 5; index += 1) {
      const okResponse = (await handler(event as any, {} as any)) as any;
      expect(okResponse.statusCode).toBe(200);
    }

    const limitedResponse = (await handler(event as any, {} as any)) as any;

    expect(limitedResponse.statusCode).toBe(429);
    expect(parseBody(limitedResponse)).toEqual({
      error: expect.stringContaining("Too many requests. Try after"),
      retryAfter: expect.any(Number),
    });
  });
});
