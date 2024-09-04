"use client";

import React, { useState } from "react";

export default function SentimentAnalysisPage() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const maxChars = 90;

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxChars) {
      setText(newText);
    }
  };

  // Send to frontend server-side component
  const analyzeSentiment = async () => {
    const response = await fetch("/api/sentimentanalysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data from sentimentanalysis/page.tsx === ", data);
      setSentiment(data.sentiment);
    } else {
      setSentiment("Error analyzing sentiment");
    }
  };

  let message;

  if (sentiment === "POSITIVE") {
    message = "You seems happy, a happy song and image for you";
  } else if (sentiment === "NEGATIVE") {
    message =
      "It seems you are not happy, a sad song and image matching your feelings  ";
  } else if (sentiment === "MIX" || "NETRAL") {
    message =
      "It is hard to tell clearly, maybe you feel peacful, check the music and image for you";
  }

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sentiment Analysis</h1>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to analyze sentiment"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        <div className="absolute bottom-1 right-2 text-gray-500 text-sm">
          {maxChars - text.length}
        </div>
      </div>
      <button
        onClick={analyzeSentiment}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Analyze Sentiment
      </button>
      {sentiment && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Sentiment Result:</h2>
          <p className="text-lg mt-2">{message}</p>
        </div>
      )}
    </div>
  );
}
