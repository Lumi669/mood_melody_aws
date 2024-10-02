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
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sentiment) {
      let sentimentMessage = "";

      if (sentiment === "POSITIVE") {
        sentimentMessage =
          "You seem happy; here's a happy song and image for you.";
        playMusic("happy", "analysis");
      } else if (sentiment === "NEGATIVE") {
        sentimentMessage =
          "It seems you are not happy; here's a sad song and image matching your feelings.";
        playMusic("sad", "analysis");
      } else if (sentiment === "MIX" || sentiment === "NEUTRAL") {
        sentimentMessage =
          "It is hard to tell clearly; maybe you feel peaceful. Check the music and image for you.";
        playMusic("calm", "analysis");
      }

      onSentimentAnalyzed(sentimentMessage);
    }
  }, [sentiment, playMusic, onSentimentAnalyzed]);

  return (
    <div className="p-4 max-w-3xl mx-auto grid gap-4">
      <div className="relative flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 w-full">
        <div className="w-full relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to analyze your sentiment"
            rows={4}
            maxLength={maxChars}
            className="tracking-wide p-3 border border-gray-300 rounded resize-none w-full"
          />
          <div className="absolute bottom-1 right-4 text-gray-500 text-sm">
            {maxChars - text.length} characters left
          </div>
        </div>
        <button
          onClick={analyzeSentiment}
          className="bg-[#326ed1] text-white py-2 px-6 rounded-full hover:bg-[#2758a8] transition-colors mt-4 md:mt-0 md:ml-6 w-full md:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Checking..." : "Check my mood"}
        </button>
      </div>
    </div>
  );
}
