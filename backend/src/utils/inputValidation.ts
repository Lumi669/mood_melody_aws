export const validateGeneralMultiLanguageInputTexts = (
  input: string,
): boolean => {
  // // Allow letters, numbers, spaces, and limited punctuation (no `<`, `>`, '/', '"', ''', '%', '=', '&' etc.)
  // return /^[A-Za-z0-9\s.,-]+$/.test(input);

  // Allow letters from all languages, numbers, spaces, and limited punctuation
  return /^[\p{L}\p{M}0-9\s.,-]+$/u.test(input);
};

export const validateGeneralEnglishInputs = (input: string): boolean => {
  return /^[\w\s,.!?-]*$/.test(input);
};
