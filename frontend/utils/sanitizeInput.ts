/**
 * Sanitizes input by stripping out all HTML tags.
 * @param input - The input string to sanitize.
 * @returns The sanitized string with HTML tags removed.
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/<[^>]*>?/gm, ""); // Strips all HTML tags
};
