"use client";

import { useEffect } from "react";
import { apiUrls } from "@config/apiConfig";

const AnalyticsTracker = () => {
  useEffect(() => {
    // Generate a sessionId if it doesn't exist in localStorage
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }

    const visitTimestamp = new Date().toISOString();
    const startTime = Date.now();

    const sendAnalyticsData = async (duration: number) => {
      try {
        await fetch(`${apiUrls.analytics}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            visitTimestamp,
            sessionDuration: duration,
          }),
        });
      } catch (error) {
        console.error("Error sending analytics data:", error);
      }
    };

    const handleBeforeUnload = () => {
      const duration = (Date.now() - startTime) / 1000; // in seconds
      sendAnalyticsData(duration);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null; // This component does not render any UI
};

export default AnalyticsTracker;
