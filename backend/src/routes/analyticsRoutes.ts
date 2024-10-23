import express, { Request, Response } from "express";
import {
  saveAnalyticsData,
  getAnalyticsData,
} from "../services/saveAnalyticsToDynamoService";

const router = express.Router();

// Define the type for the DynamoDB item
interface AnalyticsItem {
  userId?: { S: string };
  visitTimestamp?: { S: string };
  sessionDuration?: { N: string };
}

// Endpoint to collect analytics data (store it in DynamoDB)
router.post("/analytics", async (req: Request, res: Response) => {
  const { userId, visitTimestamp, sessionDuration } = req.body;

  console.log("Received data === ", {
    userId,
    visitTimestamp,
    sessionDuration,
  });

  try {
    await saveAnalyticsData(userId, visitTimestamp, sessionDuration);
    res.status(200).json({ message: "Analytics data recorded successfully" });
  } catch (error) {
    console.error("Error recording analytics data:", error);
    res.status(500).send("Server error");
  }
});

// Endpoint to retrieve analytics data for display on the Analysis page
router.get("/analytics", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const items = await getAnalyticsData(userId);
    console.log("iiiii items === ", items);

    // Calculate Total Number of Visits
    const totalVisits = items.length;

    // Calculate Unique Visitors (using a unique userId field), with a check for userId and userId.S
    const uniqueVisitors = new Set(
      items
        .map((item: AnalyticsItem) => item.userId?.S)
        .filter(
          (userId: string): userId is string => typeof userId === "string",
        ),
    ).size;

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
