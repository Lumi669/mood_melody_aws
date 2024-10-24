"use client";

import { useEffect, useState } from "react";
import { apiUrls } from "@config/apiConfig";

interface AnalyticsMetrics {
  totalVisits: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
}

const AnalysisPage = () => {
  const [analytics, setAnalytics] = useState<AnalyticsMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${apiUrls.analytics}`); // Use the correct API URL
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("dddd data ==== ", data);
        setAnalytics(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
        console.error("Error fetching analytics data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p>Loading analytics data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Number of Visits</h2>
          <p>{analytics?.totalVisits ?? "N/A"}</p>{" "}
          {/* Fallback to "N/A" if null */}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Unique Visitors</h2>
          <p>{analytics?.uniqueVisitors ?? "N/A"}</p>{" "}
          {/* Fallback to "N/A" if null */}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Average Session Duration</h2>
          <p>
            {analytics?.averageSessionDuration !== undefined
              ? `${analytics.averageSessionDuration.toFixed(2)} seconds`
              : "N/A"}
          </p>{" "}
          {/* Safely handle undefined values */}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
