"use client";

import React, { useState, useEffect } from "react";
import { sanitizeInput } from "@utils/sanitizeInput";

interface SentimentAnalysisPageProps {
  onSentimentAnalyzed: (message: string) => void;
  playMusic: (
    mood: "happy" | "sad" | "calm",
    source: "button" | "analysis",
  ) => void;
}

const forbiddenCharacterRegex = /^[\w\s,.!?-]*$/;
export default function SentimentAnalysisPage({
  onSentimentAnalyzed,
  playMusic,
}: SentimentAnalysisPageProps) {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string | null>(null);

  const maxChars = 90;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    if (newText.length > maxChars) {
      return; // Prevent input beyond the max length
    }

    if (!forbiddenCharacterRegex.test(newText)) {
      setInputError("Invalid characters are not allowed.");
    } else {
      setInputError(null); // Clear error if valid
      setText(newText); // Update text
    }
  };

  const analyzeSentiment = async () => {
    setIsLoading(true);

    try {
      // Sanitize the text before sending it to the backend
      const sanitizedText = sanitizeInput(text);
      const response = await fetch("/api/sentimentanalysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: sanitizedText }),
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
            aria-label="Mood input"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to analyze your sentiment"
            rows={4}
            maxLength={maxChars}
            className="tracking-wide p-3 border border-gray-300 rounded resize-none w-full"
          />
          <div
            className={`absolute bottom-1 right-4 text-sm ${
              text.length > maxChars - 10 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {maxChars - text.length} characters left
          </div>
          {inputError && (
            <p className="text-red-500 text-sm mt-2">{inputError}</p>
          )}
        </div>
        <button
          onClick={analyzeSentiment}
          className="bg-[#326ed1] text-white py-2 px-6 rounded-full hover:bg-[#2758a8] transition-colors mt-4 md:mt-0 md:ml-6 w-full md:w-auto"
          disabled={isLoading || text.trim().length === 0}
        >
          {isLoading ? "Checking..." : "Check my mood"}
        </button>
      </div>
      {sentiment === "Error analyzing sentiment" && (
        <p className="text-red-500 text-sm mt-2">
          Failed to analyze sentiment. Please try again.
        </p>
      )}
    </div>
  );
}
