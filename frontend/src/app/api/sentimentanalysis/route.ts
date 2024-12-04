// a server-side API route of frontend to interact with the backend service i.e the real backend which interacts with database

import { NextRequest, NextResponse } from "next/server";

import { apiUrls } from "@config/apiConfig";

export async function POST(req: NextRequest) {
  // console.log("apiUrls from sentimentanalysis route ======== ", apiUrls);

  const { text } = await req.json();
  console.log("text for analysing sentiment frontend ====== ", text);

  // frontend forward request to backend
  const response = await fetch(`${apiUrls.sentimentanalysis}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });

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
