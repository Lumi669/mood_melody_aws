import axios from "axios";
import { handler } from "../index";

import {
  CloudFormationClient,
  DescribeStacksCommand,
} from "@aws-sdk/client-cloudformation";

import {
  CodePipelineClient,
  PutJobSuccessResultCommand,
  PutJobFailureResultCommand,
} from "@aws-sdk/client-codepipeline";

import {
  S3Client,
  HeadObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

/* -------------------- MOCKS -------------------- */

jest.mock("axios");

const cfSend = jest.fn();
const cpSend = jest.fn();
const s3Send = jest.fn();
const ssmSend = jest.fn();

beforeAll(() => {
  CloudFormationClient.prototype.send = cfSend;
  CodePipelineClient.prototype.send = cpSend;
  S3Client.prototype.send = s3Send;
  SSMClient.prototype.send = ssmSend;
});

beforeEach(() => {
  jest.clearAllMocks();
});

/* -------------------- HELPERS -------------------- */

const baseEvent = (id: string) => ({
  "CodePipeline.job": { id },
});

/* -------------------- TESTS -------------------- */

describe("Trigger Frontend GitHub Actions Lambda", () => {
  it("succeeds when GitHub signal reports success", async () => {
    jest.setTimeout(15000);
    cfSend.mockResolvedValueOnce({
      Stacks: [
        {
          Outputs: [
            {
              OutputKey: "BackendApiUrl",
              OutputValue: "https://api.example.com",
            },
          ],
        },
      ],
    });
    ssmSend.mockResolvedValueOnce({
      Parameter: { Value: "validGithubToken123" },
    });
    // HeadObject → marker not found
    s3Send.mockRejectedValueOnce({ name: "NotFound" });
    let capturedUniqueId: string | undefined = undefined;
    (axios.post as jest.Mock).mockImplementation((url, data) => {
      capturedUniqueId = data.client_payload.UNIQUE_ID;
      return Promise.resolve({});
    });
    s3Send.mockImplementation((cmd) => {
      if (cmd instanceof GetObjectCommand) {
        if (capturedUniqueId) {
          return Promise.resolve({
            Body: {
              on: (event: string, cb: any) => {
                if (event === "data")
                  cb(
                    Buffer.from(
                      JSON.stringify({
                        unique_id: capturedUniqueId,
                        status: "success",
                      }),
                    ),
                  );
                if (event === "end") cb();
              },
            },
          });
        }
        return Promise.resolve({});
      }
      if (cmd instanceof PutObjectCommand) {
        return Promise.resolve({});
      }
      return Promise.resolve({});
    });
    const result = await handler(baseEvent("job-success-123") as any);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(cpSend).toHaveBeenCalledWith(expect.any(PutJobSuccessResultCommand));
    expect(result.statusCode).toBe(200);
  });

  it("fails CodePipeline when GitHub signal reports failure", async () => {
    jest.setTimeout(15000);
    cfSend.mockResolvedValueOnce({
      Stacks: [
        {
          Outputs: [
            {
              OutputKey: "BackendApiUrl",
              OutputValue: "https://api.example.com",
            },
          ],
        },
      ],
    });
    ssmSend.mockResolvedValueOnce({
      Parameter: { Value: "validGithubToken123" },
    });
    s3Send.mockRejectedValueOnce({ name: "NotFound" });
    let capturedUniqueId: string | undefined = undefined;
    (axios.post as jest.Mock).mockImplementation((url, data) => {
      capturedUniqueId = data.client_payload.UNIQUE_ID;
      return Promise.resolve({});
    });
    s3Send.mockImplementation((cmd) => {
      if (cmd instanceof GetObjectCommand) {
        if (capturedUniqueId) {
          return Promise.resolve({
            Body: {
              on: (event: string, cb: any) => {
                if (event === "data")
                  cb(
                    Buffer.from(
                      JSON.stringify({
                        unique_id: capturedUniqueId,
                        status: "failure",
                      }),
                    ),
                  );
                if (event === "end") cb();
              },
            },
          });
        }
        return Promise.resolve({});
      }
      return Promise.resolve({});
    });
    const result = await handler(baseEvent("job-failure-456") as any);
    expect(cpSend).toHaveBeenCalledWith(expect.any(PutJobFailureResultCommand));
    expect(result.statusCode).toBe(500);
  });

  it("short-circuits when uniqueId already processed", async () => {
    jest.setTimeout(15000);
    cfSend.mockResolvedValueOnce({
      Stacks: [
        {
          Outputs: [
            {
              OutputKey: "BackendApiUrl",
              OutputValue: "https://api.example.com",
            },
          ],
        },
      ],
    });
    ssmSend.mockResolvedValueOnce({
      Parameter: { Value: "validGithubToken123" },
    });
    // HeadObject → already processed
    s3Send.mockImplementation((cmd) => {
      if (cmd instanceof HeadObjectCommand) {
        return Promise.resolve({});
      }
      return Promise.resolve({});
    });
    const result = await handler(baseEvent("job-idempotent-789") as any);
    expect(axios.post).not.toHaveBeenCalled();
    expect(cpSend).toHaveBeenCalledWith(expect.any(PutJobSuccessResultCommand));
    expect(result.statusCode).toBe(200);
  });

  it("handles CloudFormation errors gracefully", async () => {
    cfSend.mockRejectedValueOnce(new Error("CF broken"));

    const result = await handler(baseEvent("job-error-999") as any);

    expect(cpSend).toHaveBeenCalledWith(expect.any(PutJobFailureResultCommand));
    expect(result.statusCode).toBe(500);
  });
});

afterAll(async () => {
  await new Promise((r) => setImmediate(r));
});
