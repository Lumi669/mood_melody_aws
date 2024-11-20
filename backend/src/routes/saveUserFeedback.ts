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
  if (Buffer.isBuffer(req.body)) {
    return res.status(400).json({ error: "Invalid JSON format received." });
  }

  const userInputs = req.body;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

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
    const { isValid, validationStatus } =
      await validatePhoneNumber(telephonenumber);

    console.log("vvvvv validationStatus === ", validationStatus);

    if (validationStatus === "missing-country-prefix") {
      return res.status(400).json({ error: "Country prefix is needed" });
    }

    if (validationStatus === "unvalidated-phone") {
      userInputs.phoneValidated = null;
      console.warn(
        "NumVerify quota exceeded. Saving data without phone validation.",
      );
    } else if (!isValid) {
      console.warn("Invalid telephone number detected by numVerify.");
      return res.status(400).json({ error: "Invalid telephone number" });
    } else {
      userInputs.phoneValidated = true;
    }

    const message = await saveToDynamodbService(userInputs);
    console.log("Data saved to DynamoDB successfully:", message);

    res.json({
      message: "Data saved successfully!",
      validationStatus: userInputs.phoneValidated
        ? "validated"
        : "unvalidated-phone",
    });
  } catch (error) {
    console.error("Failed to process the request:", error);

    if (error instanceof Error) {
      return res.status(500).json({
        error: "Failed to process the request",
        details: error.message,
      });
    } else {
      return res.status(500).json({
        error: "Failed to process the request",
        details: "An unknown error occurred.",
      });
    }
  }
});

export default router;
