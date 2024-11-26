/**
 * Sanitizes input by stripping out all HTML tags.
 * @param input - The input string to sanitize.
 * @returns The sanitized string with HTML tags removed.
 */

import DOMPurify from "dompurify";

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

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

import { z } from "zod";

// Define the Zod email validation schema
export const emailValidationSchema = z.string().email("Invalid email address");
