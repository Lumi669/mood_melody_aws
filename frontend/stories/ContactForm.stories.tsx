import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ContactForm from "../components/ContactForm"; // Adjust the path if necessary

// Meta configuration for the ContactForm story
export default {
  title: "Components/ContactForm",
  component: ContactForm,
} as Meta<typeof ContactForm>;

// Template for the ContactForm story
const Template: StoryFn<typeof ContactForm> = (args) => (
  <ContactForm {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {};
