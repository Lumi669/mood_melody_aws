const mockComprehendSend = jest.fn();
const mockDetectSentimentCommand = jest
  .fn()
  .mockImplementation((input) => ({ input }));

jest.mock("@aws-sdk/client-comprehend", () => ({
  ComprehendClient: jest.fn().mockImplementation(() => ({
    send: mockComprehendSend,
  })),
  DetectSentimentCommand: mockDetectSentimentCommand,
}));

import { analyzeSentiment } from "../services/comprehendService";

describe("analyzeSentiment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns the sentiment reported by Comprehend", async () => {
    mockComprehendSend.mockResolvedValue({ Sentiment: "POSITIVE" });

    const result = await analyzeSentiment("I feel great today");

    expect(mockDetectSentimentCommand).toHaveBeenCalledWith({
      LanguageCode: "en",
      Text: "I feel great today",
    });
    expect(result).toBe("POSITIVE");
  });

  it("falls back to NEUTRAL when Comprehend omits the sentiment", async () => {
    mockComprehendSend.mockResolvedValue({});

    const result = await analyzeSentiment("I feel okay");

    expect(result).toBe("NEUTRAL");
  });

  it("throws a normalized error when Comprehend fails", async () => {
    mockComprehendSend.mockRejectedValue(new Error("AWS unavailable"));

    await expect(analyzeSentiment("I feel okay")).rejects.toThrow(
      "Sentiment analysis failed",
    );
  });
});
