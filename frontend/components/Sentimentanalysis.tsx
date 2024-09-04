"use client";

import React, { useState, useEffect } from "react";
import CustomImage from "./CustomImage";
import { useMedia } from "@context/MediaContext";

export default function SentimentAnalysisPage() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [ctg, setCtg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading
  const [shouldPlay, setShouldPlay] = useState<boolean>(false); // State to manage delayed playback
  const maxChars = 90;

  const {
    mediaData,
    playTrack,
    setCurrentSong,
    stopMusic,
    setIsRed,
    setIsBlue,
    setIsBrown,
  } = useMedia();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxChars) {
      setText(newText);
    }
  };

  const analyzeSentiment = async () => {
    setIsLoading(true); // Start loading
    setMessage(""); // Clear message initially
    setImageSrc("");
    setAudioUrl("");
    setShouldPlay(false); // Ensure we do not play audio immediately

    const response = await fetch("/api/sentimentanalysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Sentiment analysis result:", data);
      setSentiment(data.sentiment);
    } else {
      setSentiment("Error analyzing sentiment");
    }
    setIsLoading(false); // End loading
  };

  // Function to play music after sentiment analysis
  const playMusic = (mood: "happy" | "sad" | "calm") => {
    stopMusic(); // Stop any currently playing music

    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    setCurrentSong(randomSong);
    setAudioUrl(randomSong.url);
    setImageSrc(randomSong.imgUrl);
    setCtg(randomSong.ctg);

    setIsRed(randomSong.mood === "happy");
    setIsBlue(randomSong.mood === "sad");
    setIsBrown(randomSong.mood === "calm");

    playTrack(randomSong.url); // Play the new track using the global context
  };

  useEffect(() => {
    if (sentiment) {
      console.log("Sentiment detected:", sentiment);

      if (sentiment === "POSITIVE") {
        setMessage("You seem happy; here's a happy song and image for you.");
        setShouldPlay(true); // Indicate that we should play after a delay
      } else if (sentiment === "NEGATIVE") {
        setMessage(
          "It seems you are not happy; here's a sad song and image matching your feelings.",
        );
        setShouldPlay(true);
      } else if (sentiment === "MIX" || sentiment === "NEUTRAL") {
        setMessage(
          "It is hard to tell clearly; maybe you feel peaceful. Check the music and image for you.",
        );
        setShouldPlay(true);
      }
    }
  }, [sentiment]); // Trigger when sentiment is updated

  useEffect(() => {
    if (shouldPlay) {
      const delayTimer = setTimeout(() => {
        if (sentiment === "POSITIVE") {
          playMusic("happy");
        } else if (sentiment === "NEGATIVE") {
          playMusic("sad");
        } else if (sentiment === "MIX" || sentiment === "NEUTRAL") {
          playMusic("calm");
        }
      }, 2500); // 2.5second delay to allow reading the message

      return () => clearTimeout(delayTimer); // Cleanup the timer if the component is unmounted or if dependencies change
    }
  }, [shouldPlay, sentiment]); // Trigger playback after delay

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
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
      {message && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Sentiment Result:</h2>
          <p className="text-lg mt-2">{message}</p>
        </div>
      )}
      {imageSrc && (
        <CustomImage
          src={imageSrc}
          alt="Sentiment Image"
          dataUrl={audioUrl}
          layout="responsive"
          width={1400}
          height={700}
          className="mt-4"
          ctg={ctg}
        />
      )}
    </div>
  );
}
