"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ContactFormInputs {
  name: string;
  surname: string;
  email: string;
  telephonenumber: string;
  title: string;
  organisation: string;
  message: string;
  role: string[]; // Array to hold multiple selections
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstname" className="block text-sm font-semibold">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstname"
            {...register("name", { required: "Firstname is required" })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            {...register("title", { required: "Message is required" })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="organisation" className="block text-sm font-semibold">
            Organisation<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="organisation"
            {...register("organisation", { required: "Message is required" })}
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
              {...register("role")}
              className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label htmlFor="recruiters" className="ml-2 text-sm">
              Recruiters
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="investors"
              value="Investors"
              {...register("role")}
              className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label htmlFor="investors" className="ml-2 text-sm">
              Investors
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="mentors"
              value="Mentors"
              {...register("role")}
              className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label htmlFor="mentors" className="ml-2 text-sm">
              Mentors
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="partners"
              value="Partners"
              {...register("role")}
              className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label htmlFor="partners" className="ml-2 text-sm">
              Partners
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="other"
              value="Other"
              {...register("role")}
              className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label htmlFor="other" className="ml-2 text-sm">
              Other
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block text-sm font-semibold">
          More information
        </label>
        <textarea
          id="message"
          {...register("message")}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          rows={4}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
