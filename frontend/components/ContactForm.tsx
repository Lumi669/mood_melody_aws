// components/ContactForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the shape of the form data
interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
