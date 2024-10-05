"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ContactFormInputs } from "../types/type";
import { apiUrls } from "@config/apiConfig";

const ContactForm: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

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

  const handleFormSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const response = await fetch(`${apiUrls.saveuserfeedback}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      setSubmissionStatus("Feedback submitted successfully!");
      reset(); // Clear the form
    } catch (error) {
      setSubmissionStatus("Error submitting feedback. Please try again.");
    }
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
              {...register("firstname", { required: "Firstname is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
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
              {...register("surname", { required: "Surname is required" })}
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
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
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
              {...register("telephonenumber", {
                required: "Telephone number is required",
              })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.telephonenumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.telephonenumber.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-semibold">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
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
              })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">
            I am <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="recruiters"
                value="Recruiters"
                checked={roles.includes("Recruiters")}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
              />
              <label htmlFor="recruiters" className="ml-2 text-sm">
                Recruiter
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="investors"
                value="Investors"
                checked={roles.includes("Investors")}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
              />
              <label htmlFor="investors" className="ml-2 text-sm">
                Investor
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mentors"
                value="Mentors"
                checked={roles.includes("Mentors")}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
              />
              <label htmlFor="mentors" className="ml-2 text-sm">
                Mentor
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="partners"
                value="Partners"
                checked={roles.includes("Partners")}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
              />
              <label htmlFor="partners" className="ml-2 text-sm">
                Partner
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="other"
                value="Other"
                checked={roles.includes("Other")}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
              />
              <label htmlFor="other" className="ml-2 text-sm">
                Other
              </label>
            </div>
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
            })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            rows={4}
            maxLength={100}
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
            className={`mt-4 text-center ${
              submissionStatus.startsWith("Error")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {submissionStatus}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-32 bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
