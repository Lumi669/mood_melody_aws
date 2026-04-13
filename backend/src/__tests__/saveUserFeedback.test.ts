import type { NextFunction, Request, Response } from "express";
import saveUserFeedbackRoutes from "../routes/saveUserFeedback";
import { saveToDynamodbService } from "../services/saveToDynamodbService";
import { validatePhoneNumber } from "../services/validatePhoneNumberService";

jest.mock("../services/saveToDynamodbService", () => ({
  saveToDynamodbService: jest.fn(),
}));

jest.mock("../services/validatePhoneNumberService", () => ({
  validatePhoneNumber: jest.fn(),
}));

const mockedSaveToDynamodbService = jest.mocked(saveToDynamodbService);
const mockedValidatePhoneNumber = jest.mocked(validatePhoneNumber);

const validPayload = {
  firstname: "Jinghuan",
  surname: "Li",
  email: "jinghuan@example.com",
  telephonenumber: "+358401234567",
  title: "Engineer",
  organisation: "Mood Melody",
  message: "Hello team",
  roles: ["developer"],
};

const getRouteHandler = (method: "post" | "options") => {
  const layer = (saveUserFeedbackRoutes as any).stack.find(
    (stackLayer: any) =>
      stackLayer.route?.path === "/" && stackLayer.route.methods[method],
  );

  return layer.route.stack[0].handle;
};

const createMockResponse = () => {
  const headers: Record<string, string> = {};
  const responseBody: { current?: unknown } = {};
  const status = jest.fn().mockImplementation((_statusCode: number) => res);
  const sendStatus = jest.fn().mockImplementation((_statusCode: number) => res);
  const json = jest.fn().mockImplementation((body: unknown) => {
    responseBody.current = body;
    return res;
  });
  const setHeader = jest
    .fn()
    .mockImplementation((key: string, value: string) => {
      headers[key] = value;
      return res;
    });
  const res = { json, sendStatus, setHeader, status };

  return {
    headers,
    json,
    res: res as unknown as Response,
    responseBody,
    sendStatus,
    setHeader,
    status,
  };
};

const invokeRoute = async (method: "post" | "options", body?: unknown) => {
  const handler = getRouteHandler(method);
  const req = { body } as Request;
  const response = createMockResponse();

  await handler(req, response.res, jest.fn() as NextFunction);

  return response;
};

describe("saveUserFeedback routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("handles preflight requests", async () => {
    const response = await invokeRoute("options");

    expect(response.sendStatus).toHaveBeenCalledWith(200);
    expect(response.headers["Access-Control-Allow-Origin"]).toBe("*");
    expect(response.headers["Access-Control-Allow-Methods"]).toBe(
      "POST, OPTIONS",
    );
  });

  it("rejects buffer bodies as invalid JSON", async () => {
    const response = await invokeRoute("post", Buffer.from("{not-json}"));

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.responseBody.current).toEqual({
      error: "Invalid JSON format received.",
    });
  });

  it("returns validation details for invalid contact form payloads", async () => {
    const response = await invokeRoute("post", {
      ...validPayload,
      title: "@@@",
    });

    expect(response.status).toHaveBeenCalledWith(400);
    expect((response.responseBody.current as any).debugMarker).toBe(
      "ZOD_VALIDATION_CONTACT_FORM",
    );
    expect((response.responseBody.current as any).error).toContain(
      "Title contains invalid characters",
    );
  });

  it("requires a country prefix when phone validation reports it missing", async () => {
    mockedValidatePhoneNumber.mockResolvedValue({
      isValid: false,
      validationStatus: "missing-country-prefix",
    });

    const response = await invokeRoute("post", validPayload);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.responseBody.current).toEqual({
      error: "Country prefix is needed",
    });
    expect(mockedSaveToDynamodbService).not.toHaveBeenCalled();
  });

  it("rejects invalid phone numbers", async () => {
    mockedValidatePhoneNumber.mockResolvedValue({
      isValid: false,
      validationStatus: "invalid-phone",
    });

    const response = await invokeRoute("post", validPayload);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.responseBody.current).toEqual({
      error: "Invalid telephone number",
    });
    expect(mockedSaveToDynamodbService).not.toHaveBeenCalled();
  });

  it("saves feedback with a null phone validation flag when validation is unavailable", async () => {
    mockedValidatePhoneNumber.mockResolvedValue({
      isValid: "NA",
      validationStatus: "unvalidated-phone",
    });
    mockedSaveToDynamodbService.mockResolvedValue({
      message: "Feedback submitted successfully!",
      response: { $metadata: {} },
    } as Awaited<ReturnType<typeof saveToDynamodbService>>);

    const response = await invokeRoute("post", validPayload);

    expect(response.responseBody.current).toEqual({
      message: "Data saved successfully!",
      validationStatus: "unvalidated-phone",
    });
    expect(mockedSaveToDynamodbService).toHaveBeenCalledWith({
      ...validPayload,
      phoneValidated: null,
    });
  });

  it("saves feedback when the phone number is validated", async () => {
    mockedValidatePhoneNumber.mockResolvedValue({
      isValid: true,
      validationStatus: "validated",
    });
    mockedSaveToDynamodbService.mockResolvedValue({
      message: "Feedback submitted successfully!",
      response: { $metadata: {} },
    } as Awaited<ReturnType<typeof saveToDynamodbService>>);

    const response = await invokeRoute("post", validPayload);

    expect(response.responseBody.current).toEqual({
      message: "Data saved successfully!",
      validationStatus: "validated",
    });
    expect(mockedSaveToDynamodbService).toHaveBeenCalledWith({
      ...validPayload,
      phoneValidated: true,
    });
  });

  it("returns a 500 response when saving feedback fails", async () => {
    mockedValidatePhoneNumber.mockResolvedValue({
      isValid: true,
      validationStatus: "validated",
    });
    mockedSaveToDynamodbService.mockRejectedValue(new Error("DynamoDB down"));

    const response = await invokeRoute("post", validPayload);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.responseBody.current).toEqual({
      error: "Failed to process the request",
      details: "DynamoDB down",
    });
  });
});
