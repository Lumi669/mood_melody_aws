import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import axios from "axios";

const fetchNumVerifyApiKey = async (): Promise<string> => {
  if (!process.env.LAMBDA_TASK_ROOT) {
    if (!process.env.NUMVERIFY_API_KEY) {
      console.warn(
        "Warning: NUMVERIFY_API_KEY is not set in local environment.",
      );
    }

    return process.env.NUMVERIFY_API_KEY || "";
  }
  console.log("Running in Lambda environment:", !!process.env.LAMBDA_TASK_ROOT);
  const ssmClient = new SSMClient({});
  const parameterName = process.env.NUMVERIFY_API_PARAM_NAME;
  console.log(
    "ppppp parameterName from fetchNumVerifyApiKey === ",
    parameterName,
  );

  if (!parameterName) {
    throw new Error("SSM parameter name for NumVerify API key is missing.");
  }

  const command = new GetParameterCommand({
    Name: parameterName,
    WithDecryption: true,
  });

  try {
    const response = await ssmClient.send(command);
    return response.Parameter?.Value || "";
  } catch (error) {
    console.error("Error retrieving API key from SSM:", error);
    throw new Error("Failed to retrieve NumVerify API key.");
  }
};

export const validatePhoneNumber = async (
  phoneNumber: string,
): Promise<{ isValid: boolean | "NA"; validationStatus: string }> => {
  console.log(
    "ppp phone number to be validated by numverify === ",
    phoneNumber,
  );

  try {
    const apiKey = await fetchNumVerifyApiKey();

    if (!apiKey) {
      throw new Error("NumVerify API key is missing.");
    }

    // Make the API request
    const response = await axios.get(`http://apilayer.net/api/validate`, {
      params: {
        access_key: apiKey,
        number: phoneNumber,
      },
    });
    console.log("rrrr response from numVerify === ", response);

    // Check if the response indicates a valid phone number
    const data = response.data;

    console.log("rrrr response.data from numVerify === ", data);

    if (data.success === false) {
      console.warn("NumVerify API Error: ", data.error);
      const errorCode = data.error.code;

      if (errorCode === 101) {
        console.warn("Invalid access key!");
      } else if (errorCode === 104) {
        console.warn("Monthly usage limit reached");
      } else if (errorCode === 403) {
        console.warn(
          "User did not supply an Access Key or User entered an invalid Access Key.",
        );
      } else if (errorCode === 404) {
        console.warn(
          "User requested a resource which does not exist. or User requested a non-existent API function.",
        );
      }

      // Handle other error cases if needed
      return { isValid: "NA", validationStatus: "unvalidated-phone" };
    }

    if (data.valid) {
      // Valid phone number
      return { isValid: true, validationStatus: "validated" };
    }

    // If phone number is invalid
    return { isValid: false, validationStatus: "invalid-phone" };
  } catch (error) {
    console.error("Unexpected error during phone validation:", error);

    if (error instanceof Error) {
      console.error("Generic error:", error.message);
    }

    // Fallback to "unvalidated-phone" for any other errors
    return { isValid: "NA", validationStatus: "unvalidated-phone" };
  }
};
