import express from "express";
const router = express.Router();

import { saveToDynamodbService } from "../services/saveToDynamodbService";

// Handle preflight OPTIONS request
router.options("/", (req, res) => {
  console.log("oooooooo OPTIONS request received. Headers: ", req.headers);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  console.log("oooooooo OPTIONS headers set. Sending 200 response.");
  res.sendStatus(200); // Respond to preflight request with a 200 status
});

// Handle POST request
router.post("/", async (req, res) => {
  console.log("rrrrrr POST request received. Headers: ", req.headers);
  const userInputs = req.body;

  console.log("uuuuuu User inputs received: ", userInputs);

  // Add CORS headers for all POST responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (!userInputs || userInputs === undefined) {
    console.log("Error: No user inputs.");
    return res.status(400).json({ error: "No user inputs" });
  }

  try {
    console.log("Saving to DynamoDB...");
    const message = await saveToDynamodbService(userInputs);
    console.log("Success: Data saved to DynamoDB. Message: ", message);
    res.json({ "message from aws DynamoDB is": message });
  } catch (error) {
    console.log(
      "Error: Failed to save user inputs to DynamoDB. Error: ",
      error,
    );
    res.status(500).json({ error: "Failed to save user inputs" });
  }
});

export default router;
