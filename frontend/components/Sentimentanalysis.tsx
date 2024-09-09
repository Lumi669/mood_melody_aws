"use client";

import React, { useState, useEffect } from "react";

interface SentimentAnalysisPageProps {
  onSentimentAnalyzed: (message: string) => void;
  playMusic: (
    mood: "happy" | "sad" | "calm",
    source: "button" | "analysis",
  ) => void;
}

export default function SentimentAnalysisPage({
  onSentimentAnalyzed,
  playMusic,
}: SentimentAnalysisPageProps) {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const maxChars = 90;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxChars) {
      setText(newText);
    }
  };

  const analyzeSentiment = async () => {
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("/api/sentimentanalysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sentiment analysis result:", data.sentiment);
        setSentiment(data.sentiment);
      } else {
        setSentiment("Error analyzing sentiment");
      }
    } catch (error) {
      console.error("Error fetching sentiment analysis:", error);
      setSentiment("Error analyzing sentiment");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (sentiment) {
      // Only trigger this effect when sentiment is updated
      let sentimentMessage = "";

      if (sentiment === "POSITIVE") {
        sentimentMessage =
          "You seem happy; here's a happy song and image for you.";
        playMusic("happy", "analysis"); // Play music directly
      } else if (sentiment === "NEGATIVE") {
        sentimentMessage =
          "It seems you are not happy; here's a sad song and image matching your feelings.";
        playMusic("sad", "analysis");
      } else if (sentiment === "MIX" || sentiment === "NEUTRAL") {
        sentimentMessage =
          "It is hard to tell clearly; maybe you feel peaceful. Check the music and image for you.";
        playMusic("calm", "analysis");
      }

      onSentimentAnalyzed(sentimentMessage); // Set message only once after sentiment is analyzed
    }
  }, [sentiment, playMusic, onSentimentAnalyzed]); // Trigger effect when sentiment is updated

  return (
    <div className="p-5 max-w-3xl mx-auto grid justify-items-stretch ">
      <div className="relative flex items-start">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to analyze your sentiment"
          rows={4}
          className="flex-grow tracking-wide p-3 border border-gray-300 rounded mb-4 ml-6 resize-none w-full" // Make textarea take full width
        />
        <div className="absolute bottom-1 right-2 text-gray-500 text-sm">
          {maxChars - text.length}
        </div>
        <button
          onClick={analyzeSentiment}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors ml-8"
          disabled={isLoading}
        >
          {isLoading ? "Checking..." : "Check My Mood"}
        </button>
      </div>
    </div>
  );
}
