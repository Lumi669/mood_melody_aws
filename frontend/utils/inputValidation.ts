/**
 * Sanitizes input by stripping out all HTML tags.
 * @param input - The input string to sanitize.
 * @returns The sanitized string with HTML tags removed.
 */

import DOMPurify from "dompurify";

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

export const validateGeneralInputTexts = (input: string): boolean => {
  // Allow letters, numbers, spaces, and limited punctuation (no `<`, `>`, '/', '"', ''', '%', '=', '&' etc.)
  return /^[A-Za-z0-9\s.,-]+$/.test(input);
};
