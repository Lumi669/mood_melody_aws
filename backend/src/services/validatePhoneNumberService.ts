import axios from "axios";

export const validatePhoneNumber = async (
  phoneNumber: string,
): Promise<{ isValid: boolean; validationStatus: string }> => {
  console.log(
    "ppp phone number to be validated by numverify === ",
    phoneNumber,
  );

  try {
    const apiKey = process.env.NUMVERIFY_API_KEY;

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

    console.log("rrrr res from numVerify === ", response);

    // Check if the response indicates a valid phone number
    if (response.data && response.data.valid) {
      return { isValid: true, validationStatus: "validated" };
    }

    // If the phone number is invalid
    if (response.data && !response.data.valid) {
      return { isValid: false, validationStatus: "invalid-phone" };
    }

    // Handle unexpected responses
    console.warn("Unexpected response from NumVerify:", response.data);
    return { isValid: false, validationStatus: "invalid-phone" };
  } catch (error) {
    console.error("Error validating phone number or quota exceeded:", error);

    // Narrow down the type of 'error'
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      if (error.response && error.response.data && error.response.data.error) {
        const errorCode = error.response.data.error.code;
        const errorMessage = error.response.data.error.info;

        console.warn(`NumVerify API Error [${errorCode}]: ${errorMessage}`);

        if (errorCode === 104) {
          // Code 104 indicates quota limit exceeded
          return { isValid: true, validationStatus: "unvalidated-phone" };
        }
      }
    } else if (error instanceof Error) {
      // Handle generic errors
      console.error("Generic error:", error.message);
    }

    // For other errors, fallback to unvalidated status
    return { isValid: true, validationStatus: "unvalidated-phone" };
  }
};
