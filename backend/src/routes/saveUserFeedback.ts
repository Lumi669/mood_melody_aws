import express from "express";
const router = express.Router();

import { saveToDynamodbService } from "../services/saveToDynamodbService";
import { validatePhoneNumber } from "../services/validatePhoneNumberService";

// Handle preflight OPTIONS request
router.options("/", (req, res) => {
  console.log("OPTIONS request received");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

router.post("/", async (req, res) => {
  // Check if the body is a buffer
  if (Buffer.isBuffer(req.body)) {
    return res.status(400).json({ error: "Invalid JSON format received." });
  }

  const userInputs = req.body;

  // Add CORS headers for POST responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Validate required fields
  const requiredFields = [
    "firstname",
    "surname",
    "email",
    "telephonenumber",
    "title",
    "organisation",
    "roles",
  ];

  const missingFields = requiredFields.filter((field) => !userInputs[field]);

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missingFields.join(", ")}` });
  }

  const telephonenumber = userInputs.telephonenumber;

  try {
    // Validate the phone number
    const { isValid, validationStatus } =
      await validatePhoneNumber(telephonenumber);

    if (validationStatus === "unvalidated-phone") {
      // If free limit is hit, save data with `phone-validated: false`
      userInputs.phoneValidated = false;
      console.warn(
        "NumVerify quota exceeded. Saving data without phone validation.",
      );
    } else if (!isValid) {
      // If phone number is invalid, return error and do not save data
      console.warn("Invalid telephone number detected by numVerify.");
      return res.status(400).json({
        error: "Invalid telephone number",
      });
    } else {
      // If phone number is valid, save data with `phone-validated: true`
      userInputs.phoneValidated = true;
    }

    // Save the user inputs to the database
    console.log("Attempting to save user inputs to DynamoDB...");
    const message = await saveToDynamodbService(userInputs);
    console.log("Data saved to DynamoDB successfully:", message);

    // Return success response
    res.json({
      message: "Data saved successfully!",
      validationStatus: userInputs.phoneValidated
        ? "validated"
        : "unvalidated-phone",
    });
  } catch (error) {
    // Narrow the type of error to ensure proper error handling
    console.error("Failed to process the request:", error);

    if (error instanceof Error) {
      // If error is an instance of Error, safely access its message
      return res.status(500).json({
        error: "Failed to process the request",
        details: error.message,
      });
    } else {
      // Handle unknown errors
      return res.status(500).json({
        error: "Failed to process the request",
        details: "An unknown error occurred.",
      });
    }
  }
});

export default router;
