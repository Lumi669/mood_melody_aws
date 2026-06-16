// a server-side API route of frontend to interact with the backend service i.e the real backend which interacts with database

import { NextRequest, NextResponse } from "next/server";

import { apiUrls } from "@config/apiConfig";

const getSentimentAnalysisUrl = () => {
  if (apiUrls.sentimentanalysis) {
    return apiUrls.sentimentanalysis;
  }

  if (apiUrls.base) {
    return `${apiUrls.base.replace(/\/$/, "")}/api/sentimentanalysis`;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:4000/api/sentimentanalysis";
  }

  return "";
};

export async function POST(req: NextRequest) {
  // console.log("apiUrls from sentimentanalysis route ======== ", apiUrls);

  let text: unknown;
  try {
    const body = await req.json();
    text = body?.text;
  } catch (error) {
    console.error("Failed to parse sentiment analysis request body:", error);
    return NextResponse.json(
      { error: "Invalid JSON request body" },
      { status: 400 },
    );
  }

  console.log("text for analysing sentiment frontend ====== ", text);

  const sentimentAnalysisUrl = getSentimentAnalysisUrl();
  if (!sentimentAnalysisUrl) {
    return NextResponse.json(
      { error: "Sentiment analysis API URL is not configured" },
      { status: 503 },
    );
  }

  // frontend forward request to backend
  let response: Response;
  try {
    response = await fetch(sentimentAnalysisUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  } catch (error) {
    console.error("Failed to reach sentiment analysis API:", error);
    return NextResponse.json(
      { error: "Sentiment analysis service is unavailable" },
      { status: 503 },
    );
  }

  if (!response.ok) {
    let backendError;
    try {
      backendError = await response.json();
      console.log("Backend error response::::", backendError);
    } catch (err) {
      console.error("Failed to parse backend response body:", err);
      backendError = { error: "Unexpected error from backend" };
    }

    // Forward the backend's status code to the frontend
    return NextResponse.json(backendError, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
