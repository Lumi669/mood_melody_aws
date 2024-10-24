import express, { Request, Response } from "express";
import {
  saveAnalyticsData,
  getAllAnalyticsData,
} from "../services/saveAnalyticsToDynamoService";

const router = express.Router();

// Define the type for the DynamoDB item
interface AnalyticsItem {
  sessionId?: { S: string };
  visitTimestamp?: { S: string };
  sessionDuration?: { N: string };
}

// Endpoint to collect analytics data (store it in DynamoDB)
router.post("/", async (req: Request, res: Response) => {
  const { sessionId, visitTimestamp, sessionDuration } = req.body;

  console.log("Received data === ", {
    sessionId,
    visitTimestamp,
    sessionDuration,
  });

  try {
    // Save analytics data and get the response
    const savedData = await saveAnalyticsData(
      sessionId,
      visitTimestamp,
      sessionDuration,
    );
    res.status(200).json({
      message: "Analytics data recorded successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error recording analytics data:", error);
    res.status(500).send("Server error");
  }
});

// Endpoint to retrieve all analytics data for display on the Analysis page
// Endpoint to retrieve all analytics data for display on the Analysis page
router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await getAllAnalyticsData();
    console.log("Fetched analytics data ==== ", items);

    // Calculate Total Number of Visits
    const totalVisits = items.length;

    // Calculate Unique Visitors (distinct sessionIds)
    const uniqueVisitors = new Set(
      items
        .map((item: AnalyticsItem) => item.sessionId?.S)
        .filter(
          (id: string | undefined): id is string => typeof id === "string",
        ),
    ).size;

    console.log("uniqueVisitors ====== ", uniqueVisitors);

    // Calculate Average Session Duration
    const totalDuration = items.reduce((acc: number, item: AnalyticsItem) => {
      const duration = item.sessionDuration?.N;
      return acc + (duration ? parseFloat(duration) : 0);
    }, 0);
    const averageSessionDuration =
      totalVisits > 0 ? totalDuration / totalVisits : 0;

    res.json({
      totalVisits,
      uniqueVisitors,
      averageSessionDuration,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).send("Server error");
  }
});

export default router;
