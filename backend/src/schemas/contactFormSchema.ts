import { z } from "zod";
import {
  validateGeneralMultiLanguageInputTexts,
  validateGeneralEnglishInputs,
} from "../utils/inputValidation";

export const contactFormSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, "Firstname is required")
    .max(50, "Firstname is too long")
    .refine(
      validateGeneralMultiLanguageInputTexts,
      "Firstname contains invalid characters",
    ),
  surname: z
    .string()
    .trim()
    .min(1, "Surname is required")
    .max(50, "Surname is too long")
    .refine(
      validateGeneralMultiLanguageInputTexts,
      "Surname contains invalid characters",
    ),
  email: z.string().email("Invalid email address"),
  telephonenumber: z
    .string()
    .regex(
      /^\+?[0-9]{7,15}$/,
      "Invalid phone number (must be 7 to 15 digits, optionally prefixed with +)",
    ),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(20, "Title must not exceed 20 characters")
    .refine(validateGeneralEnglishInputs, "Title contains invalid characters"),
  organisation: z
    .string()
    .trim()
    .min(2, "Organisation must be at least 2 characters")
    .max(50, "Organisation must not exceed 50 characters")
    .refine(
      validateGeneralEnglishInputs,
      "Organisation contains invalid characters",
    ),
  message: z
    .string()
    .trim()
    .max(100, "Message must be 100 characters or fewer")
    .refine(
      validateGeneralEnglishInputs,
      "Message contains invalid characters",
    ),
  roles: z.array(z.string()).min(1, "At least one role must be selected"), // Ensure at least one role is selected
  phoneValidated: z.boolean().nullable().default(null),
});

export type ContactFormInputs = z.infer<typeof contactFormSchema>;
