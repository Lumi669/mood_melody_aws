// app/components/AnalyticsTracker.tsx
"use client";

import { useEffect } from "react";
import { apiUrls } from "@config/apiConfig";

const AnalyticsTracker = () => {
  useEffect(() => {
    // Generate a sessionId if it doesn't exist in sessionStorage
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("sessionId", sessionId);
    }

    // Generate a unique visitId for this visit
    const visitId = `visit-${Date.now()}`;

    const visitTimestamp = new Date().toISOString();
    const startTime = Date.now();

    const sendAnalyticsData = async (duration: number) => {
      try {
        const response = await fetch(`${apiUrls.analytics}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            visitId, // Include visitId in the request
            visitTimestamp,
            sessionDuration: duration,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to send analytics data: ${response.statusText}`,
          );
        }

        console.log("Analytics data sent successfully");
      } catch (error) {
        console.error("Error sending analytics data:", error);
      }
    };

    const handleBeforeUnload = () => {
      const duration = (Date.now() - startTime) / 1000; // in seconds
      sendAnalyticsData(duration);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null; // This component does not render any UI
};

export default AnalyticsTracker;
