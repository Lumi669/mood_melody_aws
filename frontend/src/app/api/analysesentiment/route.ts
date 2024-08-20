// src/app/api/analyze-sentiment/route.ts

// a server-side API route to interact with the backend service

import { NextRequest, NextResponse } from "next/server";

import { apiUrls } from "../../../../config/apiConfig";

export async function POST(req: NextRequest) {
  console.log("apiUrls from analysesentiment route ======== ", apiUrls);
  console.log("req from frontend api/analysesentiment/route.ts ===  ", req);

  const { text } = await req.json();
  console.log("text for analysing sentiment frontend ====== ", text);

  // frontend send request to backend
  const response = await fetch(`${apiUrls.sentimentanalysis}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });

  console.log("response from backend ==== ", response);

  if (!response.ok) {
    console.log("response from backend not ok ");
    return NextResponse.json(
      { error: "Failed to analyze sentiment" },
      { status: 500 },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
