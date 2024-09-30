import express from "express";
const router = express.Router();

import { saveToDynamodbService } from "../services/saveToDynamodbService";

router.post("/", async (req, res) => {
  const { userInputs } = req.body;

  console.log("uuuuuu userinputs === ", userInputs);

  if (!userInputs) {
    return res.status(400).json({ error: "No user inputs" });
  }

  try {
    const message = await saveToDynamodbService(userInputs);
    console.log("mmmmm message from saveUserFeedback.ts === ", message);
    // Your logic to save user inputs (e.g., to DynamoDB)
    res.json({ "message from aws DynamoDB is": message });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user inputs" });
  }
});

export default router;
