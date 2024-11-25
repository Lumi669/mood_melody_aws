"use client";

import React, { useState, useEffect, useRef } from "react";
import { sanitizeInput } from "@utils/sanitizeInput";

interface SentimentAnalysisPageProps {
  onSentimentAnalyzed: (message: string) => void;
  playMusic: (
    mood: "happy" | "sad" | "calm",
    source: "button" | "analysis",
  ) => void;
}

// Regex to disallow invalid characters while allowing common text characters
const forbiddenCharacterRegex = /^[^\u0000-\u001F<>]+$/u;

export default function SentimentAnalysisPage({
  onSentimentAnalyzed,
  playMusic,
}: SentimentAnalysisPageProps) {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // Use a ref to manage error messages without triggering re-renders
  const errorMessageRef = useRef<string | null>(null);

  const maxChars = 90;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    if (newText.length > maxChars) {
      return; // Prevent input beyond the max length
    }

    // Clear previous analysis error when the user starts typing
    errorMessageRef.current = null;

    if (newText.trim() === "") {
      setInputError(null); // Clear input error when input is empty
    } else if (!forbiddenCharacterRegex.test(newText)) {
      setInputError("Invalid characters are not allowed.");
    } else {
      setInputError(null); // Clear input error if valid
    }

    setText(newText); // Update text
  };

  const analyzeSentiment = async () => {
    setIsLoading(true);
    errorMessageRef.current = null; // Clear previous errors immediately

    try {
      // Sanitize the text before sending it to the backend
      const sanitizedText = sanitizeInput(text);
      const response = await fetch("/api/sentimentanalysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sanitizedText }),
      });

      if (response.ok) {
        const data = await response.json();
        setSentiment(data.sentiment);
      } else {
        errorMessageRef.current =
          "Failed to analyze sentiment. Please try again later.";
        setSentiment("Error analyzing sentiment");
      }
    } catch (error) {
      errorMessageRef.current =
        "Failed to analyze sentiment. Please try again later.";
      setSentiment("Error analyzing sentiment");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sentiment && sentiment !== "Error analyzing sentiment") {
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
          className={`bg-[#326ed1] text-white py-2 px-6 rounded-full hover:bg-[#2758a8] transition-colors mt-4 md:mt-0 md:ml-6 w-full md:w-auto ${
            inputError || text.trim().length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={isLoading || text.trim().length === 0 || !!inputError}
        >
          {isLoading ? "Checking..." : "Check my mood"}
        </button>
      </div>
      {/* Display the error message */}
      {errorMessageRef.current && (
        <p className="text-red-500 text-sm mt-2">{errorMessageRef.current}</p>
      )}
    </div>
  );
}
