//sdk v3

import {
  ComprehendClient,
  DetectSentimentCommand,
  DetectSentimentCommandInput,
} from "@aws-sdk/client-comprehend";

const client = new ComprehendClient({ region: "eu-central-1" });

export async function analyzeSentiment(text: string): Promise<string> {
  console.log("text from analyzeSentiment function ==== ", text);
  const params: DetectSentimentCommandInput = {
    LanguageCode: "en", // TypeScript now knows this must be a valid literal type
    Text: text,
  };

  try {
    const command = new DetectSentimentCommand(params);
    const result = await client.send(command);
    console.log("result from aws comperehend analysis === ", result);
    return result.Sentiment || "NEUTRAL";
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error analyzing sentiment", error.message);
    } else {
      console.error("Unknown error analyzing sentiment:", error);
    }
    throw new Error("Sentiment analysis failed");
  }
}
