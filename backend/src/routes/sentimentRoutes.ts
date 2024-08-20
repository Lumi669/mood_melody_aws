// src/routes/sentimentRoutes.ts
import express from "express";
import { analyzeSentiment } from "../services/comprehendService";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(" backend ====");
  const { text } = req.body;

  console.log("text from routes/sentimentRoutes.ts === ", text);

  try {
    const sentiment = await analyzeSentiment(text);
    console.log("sentiment from sentimentRoute.ts === ", sentiment);
    res.json({ sentiment });
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze sentiment" });
  }
});

export default router;
