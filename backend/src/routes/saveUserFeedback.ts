import express from "express";
const router = express.Router();

import { saveToDynamodbService } from "../services/saveToDynamodbService";

// Handle preflight OPTIONS request
router.options("/", (req, res) => {
  console.log("OPTIONS request received");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// // Handle POST request
// router.post("/", async (req, res) => {
//   console.log("rrrrrr POST request received. Headers: ", req.headers);
//   const userInputs = req.body;

//   console.log("uuuuuu User inputs received: ", userInputs);

//   // Add CORS headers for all POST responses
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (!userInputs || userInputs === undefined) {
//     console.log("Error: No user inputs.");
//     return res.status(400).json({ error: "No user inputs" });
//   }

//   try {
//     console.log("Saving to DynamoDB...");
//     const message = await saveToDynamodbService(userInputs);
//     console.log("Success: Data saved to DynamoDB. Message: ", message);
//     res.json({ "message from aws DynamoDB is": message });
//   } catch (error) {
//     console.log(
//       "Error: Failed to save user inputs to DynamoDB. Error: ",
//       error,
//     );
//     res.status(500).json({ error: "Failed to save user inputs" });
//   }
// });

router.post("/", async (req, res) => {
  console.log("POST request received. Headers: ", req.headers);
  console.log("Raw body (buffer): ", req.body); // Log the raw body to debug

  // Check if the body is a buffer
  if (Buffer.isBuffer(req.body)) {
    return res.status(400).json({ error: "Invalid JSON format received." });
  }

  const userInputs = req.body;

  console.log("Parsed User inputs received: ", userInputs);

  // Add CORS headers for POST responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Validate required fields
  if (
    !userInputs.firstname ||
    !userInputs.surname ||
    !userInputs.email ||
    !userInputs.telephonenumber ||
    !userInputs.title ||
    !userInputs.organisation ||
    !userInputs.roles
  ) {
    console.error("Missing required fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("Attempting to save user inputs to DynamoDB...");
    const message = await saveToDynamodbService(userInputs);
    console.log("Data saved to DynamoDB successfully: ", message);
    res.json({ message });
  } catch (error) {
    console.error("Failed to save user inputs. Error: ", error);
    res.status(500).json({ error: "Failed to save user inputs" });
  }
});

export default router;
