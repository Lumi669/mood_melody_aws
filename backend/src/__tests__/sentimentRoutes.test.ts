import type { NextFunction, Request, Response } from "express";
import sentimentRoutes from "../routes/sentimentRoutes";
import { analyzeSentiment } from "../services/comprehendService";

jest.mock("../services/comprehendService", () => ({
  analyzeSentiment: jest.fn(),
}));

const mockedAnalyzeSentiment = jest.mocked(analyzeSentiment);

const getPostHandler = () => {
  const layer = (sentimentRoutes as any).stack.find(
    (stackLayer: any) =>
      stackLayer.route?.path === "/" && stackLayer.route.methods.post,
  );

  return layer.route.stack[0].handle;
};

const createMockResponse = () => {
  const responseBody: { current?: unknown } = {};
  const json = jest.fn().mockImplementation((body: unknown) => {
    responseBody.current = body;
    return res;
  });
  const status = jest.fn().mockImplementation((_statusCode: number) => res);
  const res = { status, json };

  return {
    res: res as unknown as Response,
    status,
    json,
    responseBody,
  };
};

const invokePost = async (body: unknown) => {
  const handler = getPostHandler();
  const req = { body } as Request;
  const { res, status, json, responseBody } = createMockResponse();

  await handler(req, res, jest.fn() as NextFunction);

  return { status, json, responseBody };
};

describe("sentimentRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("rejects requests with no text", async () => {
    const response = await invokePost({});

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.responseBody.current).toEqual({
      error: "Text is required for sentiment analysis",
    });
  });

  it("rejects whitespace-only text", async () => {
    const response = await invokePost({ text: "   " });

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.responseBody.current).toEqual({
      error: "Input text must not be empty or whitespace.",
    });
  });

  it("rejects text longer than 90 characters", async () => {
    const response = await invokePost({ text: "a".repeat(91) });

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.responseBody.current).toEqual({
      error: "Input text must not exceed 90 characters.",
    });
  });

  it("rejects invalid characters", async () => {
    const response = await invokePost({ text: "Hello @ world" });

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.responseBody.current).toEqual({
      error: "Input contains invalid characters.",
    });
  });

  it("returns the analyzed sentiment on success", async () => {
    mockedAnalyzeSentiment.mockResolvedValue("POSITIVE");

    const response = await invokePost({ text: "I feel great today" });

    expect(response.responseBody.current).toEqual({ sentiment: "POSITIVE" });
    expect(mockedAnalyzeSentiment).toHaveBeenCalledWith("I feel great today");
  });

  it("returns a 500 response when sentiment analysis fails", async () => {
    mockedAnalyzeSentiment.mockRejectedValue(new Error("AWS down"));

    const response = await invokePost({ text: "I feel great today" });

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.responseBody.current).toEqual({
      error: "Failed to analyze sentiment",
      errordetails: "AWS down",
    });
  });
});
