import express from "express";
const router = express.Router();

import { saveToDynamodbService } from "../services/saveToDynamodbService";

router.post("/", async (req, res) => {
  console.log("rrrrrr req === ", req);
  const userInputs = req.body;

  console.log("uuuuuu userinputs === ", userInputs);

  // Add CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change "*" to your specific domain if needed
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (!userInputs || userInputs === undefined) {
    return res.status(400).json({ error: "No user inputs" });
  }

  try {
    const message = await saveToDynamodbService(userInputs);
    console.log("mmmmm message from saveUserFeedback.ts === ", message);
    res.json({ "message from aws DynamoDB is": message });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user inputs" });
  }
});

export default router;
