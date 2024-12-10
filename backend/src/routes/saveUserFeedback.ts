import express from "express";
const router = express.Router();

import { saveToDynamodbService } from "../services/saveToDynamodbService";
import { validatePhoneNumber } from "../services/validatePhoneNumberService";
import { contactFormSchema } from "../schemas/contactFormSchema";
import { removeZeroWidthCharacters } from "../utils/inputValidation";

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

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  try {
    // Validate the payload with Zod
    const result = contactFormSchema.safeParse(req.body);
    console.log("rrrr result from saveUserFeedback.ts === ", result);
    if (!result.success) {
      const debugMarker = "ZOD_VALIDATION_CONTACT_FORM"; //add a marker for later debug
      console.error(`[${debugMarker}] Validation failed:`, result.error.errors);

      // Collect all error messages as a single string
      const errorMessages = result.error.errors
        .map((error) => error.message)
        .join("; ");

      return res.status(400).json({
        error: errorMessages,
        debugMarker,
      });
    }

    let userInputs = result.data;

    // Step 1: Sanitize input fields to remove zero-width characters
    userInputs = {
      ...userInputs,
      firstname: removeZeroWidthCharacters(userInputs.firstname || ""),
      surname: removeZeroWidthCharacters(userInputs.surname || ""),
      email: removeZeroWidthCharacters(userInputs.email || ""),
      telephonenumber: removeZeroWidthCharacters(
        userInputs.telephonenumber || "",
      ),
      title: removeZeroWidthCharacters(userInputs.title || ""),
      organisation: removeZeroWidthCharacters(userInputs.organisation || ""),
      message: removeZeroWidthCharacters(userInputs.message || ""),
    };
    console.log("ssss sanitized userInputs === ", userInputs);

    // Step 2: Validate phone number after payload validation
    const telephonenumber = userInputs.telephonenumber;
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

    console.log("uuuuu userInputs from saveUserFeedback.ts === ", userInputs);

    // Step 3: Save sanitized and validated data to DynamoDB
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
