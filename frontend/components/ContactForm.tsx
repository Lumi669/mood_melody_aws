"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the shape of the form data
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
  // Initialize the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  // Handle form submission
  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          {...register("name", { required: "Firstname is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          id="surname"
          {...register("surname", { required: "Surname is required" })}
        />
        {errors.surname && (
          <p className="text-red-500">{errors.surname.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
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
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="telephonenumber">Telephone number</label>
        <input
          type="text"
          id="telephonenumber"
          {...register("telephonenumber", {
            required: "Telephone number is required",
          })}
        />
        {errors.telephonenumber && (
          <p className="text-red-500">{errors.telephonenumber.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="organisation">Organisation</label>
        <input
          type="text"
          id="organisation"
          {...register("organisation", {
            required: "Organisation is required",
          })}
        />
        {errors.organisation && (
          <p className="text-red-500">{errors.organisation.message}</p>
        )}
      </div>

      {/* Multiple selection using checkboxes */}
      <div>
        <label>I am:</label>
        <div>
          <input
            type="checkbox"
            id="recruiters"
            value="Recruiters"
            {...register("role")}
          />
          <label htmlFor="recruiters">Recruiters</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="investors"
            value="Investors"
            {...register("role")}
          />
          <label htmlFor="investors">Investors</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="mentors"
            value="Mentors"
            {...register("role")}
          />
          <label htmlFor="mentors">Mentors</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="partners"
            value="Partners"
            {...register("role")}
          />
          <label htmlFor="partners">Partners</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="other"
            value="Other"
            {...register("role")}
          />
          <label htmlFor="other">Other</label>
        </div>
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          {...register("message", { required: "Message is required" })}
        ></textarea>
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
