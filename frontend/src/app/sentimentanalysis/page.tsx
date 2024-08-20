"use client";

import React, { useState } from "react";

export default function SentimentAnalysisPage() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);

  // send to frontend serverside component
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

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sentiment Analysis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze sentiment"
        rows={4}
        className="w-full p-3 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={analyzeSentiment}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Analyze Sentiment
      </button>
      {sentiment && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Sentiment Result:</h2>
          <p className="text-lg mt-2">{sentiment}</p>
        </div>
      )}
    </div>
  );
}
