const mockAxiosGet = jest.fn();
const mockSsmSend = jest.fn();
const mockGetParameterCommand = jest.fn().mockImplementation((input) => input);

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: mockAxiosGet,
  },
}));

jest.mock("@aws-sdk/client-ssm", () => ({
  SSMClient: jest.fn().mockImplementation(() => ({
    send: mockSsmSend,
  })),
  GetParameterCommand: mockGetParameterCommand,
}));

import { validatePhoneNumber } from "../services/validatePhoneNumberService";

describe("validatePhoneNumber", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    process.env = { ...originalEnv };
    delete process.env.LAMBDA_TASK_ROOT;
    delete process.env.NUMVERIFY_API_KEY;
    delete process.env.NUMVERIFY_API_PARAM_NAME;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = originalEnv;
  });

  it("returns unvalidated-phone when no local API key is configured", async () => {
    const result = await validatePhoneNumber("+358401234567");

    expect(result).toEqual({
      isValid: "NA",
      validationStatus: "unvalidated-phone",
    });
    expect(mockAxiosGet).not.toHaveBeenCalled();
  });

  it("returns validated when the API reports a valid phone number", async () => {
    process.env.NUMVERIFY_API_KEY = "local-key";
    mockAxiosGet.mockResolvedValue({
      data: { valid: true },
    });

    const result = await validatePhoneNumber("+358401234567");

    expect(result).toEqual({
      isValid: true,
      validationStatus: "validated",
    });
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://apilayer.net/api/validate",
      {
        params: {
          access_key: "local-key",
          number: "+358401234567",
        },
      },
    );
  });

  it("returns invalid-phone when the API marks the number invalid", async () => {
    process.env.NUMVERIFY_API_KEY = "local-key";
    mockAxiosGet.mockResolvedValue({
      data: { valid: false },
    });

    const result = await validatePhoneNumber("+358401234567");

    expect(result).toEqual({
      isValid: false,
      validationStatus: "invalid-phone",
    });
  });

  it("returns unvalidated-phone when the API responds with an upstream error", async () => {
    process.env.NUMVERIFY_API_KEY = "local-key";
    mockAxiosGet.mockResolvedValue({
      data: {
        success: false,
        error: { code: 104, info: "Monthly usage limit reached" },
      },
    });

    const result = await validatePhoneNumber("+358401234567");

    expect(result).toEqual({
      isValid: "NA",
      validationStatus: "unvalidated-phone",
    });
  });

  it("returns unvalidated-phone when Lambda is missing the SSM parameter name", async () => {
    process.env.LAMBDA_TASK_ROOT = "/var/task";

    const result = await validatePhoneNumber("+358401234567");

    expect(result).toEqual({
      isValid: "NA",
      validationStatus: "unvalidated-phone",
    });
    expect(mockAxiosGet).not.toHaveBeenCalled();
  });

  it("retrieves the API key from SSM in Lambda and validates the phone", async () => {
    process.env.LAMBDA_TASK_ROOT = "/var/task";
    process.env.NUMVERIFY_API_PARAM_NAME = "/numverify/key";
    mockSsmSend.mockResolvedValue({
      Parameter: { Value: "ssm-key" },
    });
    mockAxiosGet.mockResolvedValue({
      data: { valid: true },
    });

    const result = await validatePhoneNumber("+358401234567");

    expect(mockGetParameterCommand).toHaveBeenCalledWith({
      Name: "/numverify/key",
      WithDecryption: true,
    });
    expect(result).toEqual({
      isValid: true,
      validationStatus: "validated",
    });
  });
});
