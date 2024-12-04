import express from "express";
import { analyzeSentiment } from "../services/comprehendService";
import { validateGeneralMultiLanguageInputTexts } from "../utils/inputValidation";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(" backend Route hit ====");

  // Parse the body manually if it is a string
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  console.log("bbbb body from sentimentRoutes.ts === ", body);
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ error: "Text is required for sentiment analysis" });
  }

  if (text.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Input text must not be empty or whitespace." });
  }

  const maxLength = 90;
  if (text.length > maxLength) {
    return res
      .status(400)
      .json({ error: `Input text must not exceed ${maxLength} characters.` });
  }

  if (validateGeneralMultiLanguageInputTexts(text) === false) {
    return res
      .status(400)
      .json({ error: "Input contains invalid characters." });
  }

  console.log("text from routes/sentimentRoutes.ts === ", text);

  try {
    const sentiment = await analyzeSentiment(text);
    console.log("sentiment from sentimentRoute.ts === ", sentiment);
    return res.json({ sentiment });
  } catch (error: unknown) {
    console.error("Error analyzing sentiment:", error);
    if (error instanceof Error) {
      return res.status(500).json({
        error: "Failed to analyze sentiment",
        errordetails: error.message,
      });
    } else {
      return res.status(500).json({
        error: "Failed to analyze sentiment due to an unknown error",
      });
    }
  }
});

export default router;
