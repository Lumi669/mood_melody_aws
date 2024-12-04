"use client";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ContactFormInputs } from "../types/type";
import { apiUrls } from "@config/apiConfig";
import {
  sanitizeInput,
  validateGeneralMultiLanguageInputTexts,
  validateGeneralEnglishInputs,
  emailValidationSchema,
} from "@utils/inputValidation";

const ContactForm: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormInputs>({
    defaultValues: {
      roles: [], // Default is an empty array, meaning no checkboxes checked initially
    },
    mode: "onChange", // Trigger validation on every keystroke
    criteriaMode: "all", // Validate all rules for a single field
  });

  // Watch the roles field to detect changes
  const roles = watch("roles", []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedRoles = checked
      ? [...roles, value] // Add value to the roles array
      : roles.filter((role: string) => role !== value); // Remove value from the roles array

    setValue("roles", updatedRoles); // Update the roles field in the form
  };

  // Detect autofill and trigger an input event
  useEffect(() => {
    const handleAutofill = (e: Event) => {
      const input = e.target as HTMLInputElement;
      setValue(input.name as keyof ContactFormInputs, input.value);
    };

    // Add listeners for input elements that are autofilled
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.value) {
        handleAutofill({ target: input } as unknown as Event);
      }
      input.addEventListener("change", handleAutofill);
    });

    return () => {
      inputs.forEach((input) =>
        input.removeEventListener("change", handleAutofill),
      );
    };
  }, [setValue]);

  // Automatically clear the submission message after 5 seconds
  useEffect(() => {
    if (submissionStatus) {
      const timer = setTimeout(() => setSubmissionStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  const handleFormSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    if (roles.length === 0) {
      setSubmissionStatus("Error: Please select at least one role.");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Sanitize all text inputs
      const sanitizedData = {
        ...data,
        firstname: sanitizeInput(data.firstname),
        surname: sanitizeInput(data.surname),
        email: sanitizeInput(data.email),
        telephonenumber: sanitizeInput(data.telephonenumber),
        title: sanitizeInput(data.title),
        organisation: sanitizeInput(data.organisation),
        message: sanitizeInput(data.message || ""), // Handle optional field
      };

      console.log("sssss sanitizedData === ", sanitizedData);

      const response = await fetch(`${apiUrls.saveuserfeedback}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        console.log("eeee errorData.error === ", errorData.error);

        // Handle specific error messages
        if (errorData.error === "Country prefix is needed") {
          setSubmissionStatus(
            "Error: The phone number must include a country prefix. Please update and try again.",
          );
          setIsSubmitting(false);
          return;
        } else if (errorData.error === "Invalid telephone number") {
          setSubmissionStatus(
            "Error: The telephone number provided is invalid. Please check and try again.",
          );
          setIsSubmitting(false);
          return;
        } else {
          setSubmissionStatus(`Error: ${errorData.error}`);
          setIsSubmitting(false);
          return;
        }
        throw new Error(`Server error: ${response.status}`);
      }

      setSubmissionStatus("Feedback submitted successfully!");
      reset(); // Clear the form
    } catch (error) {
      setSubmissionStatus("Error submitting feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clientSideValidatePhoneNumber = (phone: string): boolean => {
    // Allow only valid characters for phone numbers: digits, '+', and spaces
    const isValidCharacters = /^[+\d\s()-]+$/.test(phone);
    if (!isValidCharacters) {
      return false; // Invalid if it contains letters or other special characters
    }

    // Ensure the phone number starts with '+' and is valid
    if (!phone.startsWith("+")) {
      return false; // Reject if not in international format
    }
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber?.isValid() || false;
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstname" className="block text-sm font-semibold">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstname"
              {...register("firstname", {
                required: "Firstname is required",

                validate: (value) =>
                  validateGeneralMultiLanguageInputTexts(value) ||
                  "Firstname can only contain letters, spaces, and limited punctuation",
              })}
              className={`mt-1 w-full px-4 py-2 border ${
                errors.firstname ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="surname" className="block text-sm font-semibold">
              Surname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="surname"
              {...register("surname", {
                required: "Surname is required",

                validate: (value) =>
                  validateGeneralMultiLanguageInputTexts(value) ||
                  "Surname can only contain letters, spaces, and limited punctuation",
              })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.surname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.surname.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  const result = emailValidationSchema.safeParse(value);
                  return result.success || result.error.issues[0].message;
                },
              })}
              className={`mt-1 w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="telephonenumber"
              className="block text-sm font-semibold"
            >
              Telephone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="telephonenumber"
              placeholder="+358401234567" // Example format
              {...register("telephonenumber", {
                required: "Telephone number is required",
                validate: (value) =>
                  clientSideValidatePhoneNumber(value) ||
                  "Invalid telephone number.",
              })}
              className={`mt-1 w-full px-4 py-2 border ${
                errors.telephonenumber ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.telephonenumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.telephonenumber.message}
              </p>
            )}
            <p className="text-sm text-gray-500">
              Enter phone number with country code (e.g. +358 for Finland)
            </p>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-semibold">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              {...register("title", {
                required: "Title is required",

                validate: (value) => {
                  if (!validateGeneralEnglishInputs(value)) {
                    return "Title contains invalid characters";
                  }
                  if (value.trim().length < 2) {
                    return "Title must be at least 2 characters";
                  }
                  if (value.trim().length > 20) {
                    return "Title must not exceed 20 characters";
                  }
                  return true; // Valid input
                },
              })}
              className={`mt-1 w-full px-4 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="organisation"
              className="block text-sm font-semibold"
            >
              Organisation<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="organisation"
              {...register("organisation", {
                required: "Organisation is required",
                validate: (value) => {
                  if (!validateGeneralEnglishInputs(value)) {
                    return "Organisation contains invalid characters";
                  }
                  if (value.trim().length < 2) {
                    return "Organisation must be at least 2 characters";
                  }
                  if (value.trim().length > 50) {
                    return "Organisation must not exceed 50 characters";
                  }
                  return true; // Valid input
                },
              })}
              className={`mt-1 w-full px-4 py-2 border ${
                errors.organisation ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.organisation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organisation?.message}
              </p>
            )}
          </div>
        </div>

        {/* Role Selection */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">
            I am <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 space-y-2">
            {["Recruiters", "Investors", "Mentors", "Partners", "Other"].map(
              (role) => (
                <div key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    id={role.toLowerCase()}
                    value={role}
                    checked={roles.includes(role)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                  <label htmlFor={role.toLowerCase()} className="ml-2 text-sm">
                    {role}
                  </label>
                </div>
              ),
            )}
            {errors.roles && (
              <p className="text-red-500 text-sm mt-1">
                {errors.roles.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="message" className="block text-sm font-semibold">
            More information
          </label>
          <textarea
            id="message"
            {...register("message", {
              maxLength: {
                value: 100,
                message: "Maximum 100 characters allowed",
              },
              validate: (value) =>
                validateGeneralEnglishInputs(value) ||
                "Invalid characters in the input",
            })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            rows={4}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
          <p className="text-sm text-gray-500">
            {watch("message")?.length || 0}/100 characters
          </p>
        </div>

        {/* Submission Message */}
        {submissionStatus && (
          <p
            className={`mt-4 mb-6 text-center font-bold ${
              submissionStatus.startsWith("Error")
                ? "text-red-600"
                : "text-green-700"
            }`}
          >
            {submissionStatus}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-6 w-32 py-2 rounded-full transition-colors ${
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
