"use client";

import React, { useState, useEffect } from "react";
import CustomImage from "./CustomImage"; // Import your CustomImage component
import { useMedia } from "@context/MediaContext"; // Import the media context

export default function SentimentAnalysisPage() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(""); // State for image source
  const [audioUrl, setAudioUrl] = useState<string>(""); // State for audio URL
  const [message, setMessage] = useState<string>(""); // State for message
  const [ctg, setCtg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading
  const maxChars = 90;

  // Use MediaContext to access media data and play controls
  const { mediaData, playTrack } = useMedia();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxChars) {
      setText(newText);
    }
  };

  const analyzeSentiment = async () => {
    setIsLoading(true); // Start loading
    setMessage(""); // Clear message initially
    setImageSrc(""); // Clear image initially
    setAudioUrl(""); // Clear audio initially

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

  useEffect(() => {
    if (sentiment) {
      console.log("Sentiment detected:", sentiment);

      let filteredSongs: any[] = []; // To store filtered songs based on sentiment

      // Filter songs based on sentiment
      if (sentiment === "POSITIVE") {
        filteredSongs = mediaData.filter((song) => song.mood === "happy");
        setMessage("You seem happy; here's a happy song and image for you.");
      } else if (sentiment === "NEGATIVE") {
        filteredSongs = mediaData.filter((song) => song.mood === "sad");
        setMessage(
          "It seems you are not happy; here's a sad song and image matching your feelings.",
        );
      } else if (sentiment === "MIX" || sentiment === "NEUTRAL") {
        filteredSongs = mediaData.filter((song) => song.mood === "calm");
        setMessage(
          "It is hard to tell clearly; maybe you feel peaceful. Check the music and image for you.",
        );
      }

      // Ensure there are songs to choose from
      if (filteredSongs.length > 0) {
        // Select a random song from the filtered list
        const randomIndex = Math.floor(Math.random() * filteredSongs.length);
        const randomSong = filteredSongs[randomIndex]; // Select a single song object

        console.log("Random song selected:", randomSong);

        // Set the state for audio URL, image source, and category
        setAudioUrl(randomSong.url);
        setImageSrc(randomSong.imgUrl);
        setCtg(randomSong.ctg);

        // Play the selected song
        // playTrack(randomSong.url);
      } else {
        setMessage("No suitable song found for the detected sentiment.");
        console.log("No songs available for the selected sentiment.");
      }
    }
  }, [sentiment, mediaData, playTrack]); // Include all dependencies to trigger useEffect correctly

  console.log("mmmmm mesage ======= ", message);
  console.log("imgSrc ========== ", imageSrc);
  console.log("aaaaa audioUrl ===== ", audioUrl);

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
