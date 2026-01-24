import { handler } from "../index";

// Capture S3 calls by mocking the PutObjectCommand
const putObjectCalls: any[] = [];

jest.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: jest.fn(),
    PutObjectCommand: jest.fn(function (input: any) {
      this.input = input;
      putObjectCalls.push(this);
    }),
  };
});

describe("Deploy Status Lambda Handler", () => {
  let mockSendFn: jest.Mock;

  beforeEach(() => {
    putObjectCalls.length = 0;
    process.env.AWS_REGION = "eu-north-1";
    process.env.BUCKET_BADGES = "test-badges-bucket";
    process.env.APP_NAME = "mood-melody";
    process.env.STAGE = "prod";

    // Mock the send method after importing
    const S3Client = require("@aws-sdk/client-s3").S3Client;
    mockSendFn = jest.fn().mockResolvedValue({});
    S3Client.prototype.send = mockSendFn;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should upload SVG and JSON badges on successful deployment", async () => {
    const event: any = {
      detail: {
        state: "SUCCEEDED",
      },
    };

    await handler(event);

    // Both SVG and JSON should be uploaded
    expect(putObjectCalls.length).toBe(2);

    // Check SVG upload
    expect(putObjectCalls[0].input.Bucket).toBe("test-badges-bucket");
    expect(putObjectCalls[0].input.Key).toBe("mood-melody-prod.svg");
    expect(putObjectCalls[0].input.ContentType).toBe("image/svg+xml");
    expect(putObjectCalls[0].input.Body).toContain("#4c1"); // Green
    expect(putObjectCalls[0].input.Body).toContain("passing");

    // Check JSON upload
    expect(putObjectCalls[1].input.Key).toBe("deploy-status.json");
    expect(putObjectCalls[1].input.ContentType).toBe("application/json");
    const jsonBody = JSON.parse(putObjectCalls[1].input.Body);
    expect(jsonBody.message).toBe("passing");
    expect(jsonBody.color).toBe("brightgreen");
  });

  it("should upload red badge on failed deployment", async () => {
    const event: any = {
      detail: {
        state: "FAILED",
      },
    };

    await handler(event);

    expect(putObjectCalls.length).toBe(2);

    // Check SVG contains red color
    expect(putObjectCalls[0].input.Body).toContain("#e05d44"); // Red
    expect(putObjectCalls[0].input.Body).toContain("failed");

    // Check JSON
    const jsonBody = JSON.parse(putObjectCalls[1].input.Body);
    expect(jsonBody.message).toBe("failed");
    expect(jsonBody.color).toBe("red");
  });

  it("should set correct cache control headers", async () => {
    const event: any = {
      detail: {
        state: "SUCCEEDED",
      },
    };

    await handler(event);

    const cacheControl = "no-cache, max-age=0, must-revalidate";
    expect(putObjectCalls[0].input.CacheControl).toBe(cacheControl);
    expect(putObjectCalls[1].input.CacheControl).toBe(cacheControl);
  });

  it("should generate valid SVG content", async () => {
    const event: any = {
      detail: {
        state: "SUCCEEDED",
      },
    };

    await handler(event);

    const svgBody = putObjectCalls[0].input.Body;
    expect(svgBody).toContain("<svg");
    expect(svgBody).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svgBody).toContain("Deploy");
  });

  it("should include correct schema in JSON badge", async () => {
    const event: any = {
      detail: {
        state: "SUCCEEDED",
      },
    };

    await handler(event);

    const jsonBody = JSON.parse(putObjectCalls[1].input.Body);
    expect(jsonBody).toHaveProperty("schemaVersion", 1);
    expect(jsonBody).toHaveProperty("label", "deploy");
    expect(jsonBody).toHaveProperty("message");
    expect(jsonBody).toHaveProperty("color");
  });
});
