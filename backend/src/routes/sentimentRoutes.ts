// src/routes/sentimentRoutes.ts
import express from "express";
import { analyzeSentiment } from "../services/comprehendService";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(" backend Route hit ====");

  // Parse the body manually if it is a string
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ error: "Text is required for sentiment analysis" });
  }

  console.log("text from routes/sentimentRoutes.ts === ", text);

  try {
    const sentiment = await analyzeSentiment(text);
    console.log("sentiment from sentimentRoute.ts === ", sentiment);
    res.json({ sentiment });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        error: "Failed to analyze sentiment",
        errordetails: error.message,
      });
    } else {
      res.status(500).json({
        error: "Failed to analyze sentiment due to an unknown error",
      });
    }
  }
});

export default router;
