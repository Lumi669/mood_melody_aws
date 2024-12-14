export const validateGeneralMultiLanguageInputTexts = (
  input: string,
): boolean => {
  // Allow letters from all languages, numbers, spaces, and limited punctuation
  return /^[\p{L}\p{M}0-9\s.,-]+$/u.test(input);
};

export const validateGeneralEnglishInputs = (input: string): boolean => {
  return /^[\w\s,.!?-]*$/.test(input);
};

export const removeZeroWidthCharacters = (input: string): string => {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }

  // Regex to match zero-width characters
  const zeroWidthRegex = /[\u200B-\u200D\uFEFF]/g;

  // Replace zero-width characters with an empty string
  return input.replace(zeroWidthRegex, "");
};
