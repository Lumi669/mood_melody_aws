import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import axios from "axios";

const fetchNumVerifyApiKey = async (): Promise<string> => {
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
    //const apiKey = process.env.NUMVERIFY_API_KEY;
    const apiKey = await fetchNumVerifyApiKey();

    if (!apiKey) {
      throw new Error("NumVerify API key is missing.");
    }

    console.log("aaa apiKey from validatePhoneNumberService.ts === ", apiKey);

    // Make the API request
    const response = await axios.get(`http://apilayer.net/api/validate`, {
      params: {
        access_key: apiKey,
        number: phoneNumber,
      },
    });

    // Check if the response indicates a valid phone number
    const data = response.data;

    console.log("rrrr response.data from numVerify === ", data);

    if (!data.success) {
      console.warn("NumVerify API Error: ", data.error);
      const errorCode = data.error.code;

      if (errorCode === 104) {
        // Monthly usage limit reached
        return { isValid: "NA", validationStatus: "unvalidated-phone" };
      }

      // Handle other error cases if needed
      return { isValid: false, validationStatus: "invalid-phone" };
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
