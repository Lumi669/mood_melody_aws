import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows a role selection error when submitting without any role", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/First Name/i), "Jinghuan");
    await user.type(screen.getByLabelText(/Surname/i), "Li");
    await user.type(screen.getByLabelText(/^Email/i), "jinghuan@example.com");
    await user.type(
      screen.getByLabelText(/Telephone Number/i),
      "+358401234567",
    );
    await user.type(screen.getByLabelText(/^Title/i), "Engineer");
    await user.type(screen.getByLabelText(/Organisation/i), "Mood Melody");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText("Error: Please select at least one role."),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits sanitized form data and shows success feedback", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ message: "ok" }),
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/First Name/i), "Jinghuan");
    await user.type(screen.getByLabelText(/Surname/i), "Li");
    await user.type(screen.getByLabelText(/^Email/i), "jinghuan@example.com");
    await user.type(
      screen.getByLabelText(/Telephone Number/i),
      "+358401234567",
    );
    await user.type(screen.getByLabelText(/^Title/i), "Engineer");
    await user.type(screen.getByLabelText(/Organisation/i), "Mood Melody");
    await user.type(screen.getByLabelText(/More information/i), "Hello team");
    await user.click(screen.getByLabelText(/Recruiters/i));
    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("");
    expect(options).toMatchObject({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(JSON.parse(options.body)).toMatchObject({
      firstname: "Jinghuan",
      surname: "Li",
      email: "jinghuan@example.com",
      telephonenumber: "+358401234567",
      title: "Engineer",
      organisation: "Mood Melody",
      message: "Hello team",
      roles: ["Recruiters"],
    });
    expect(
      await screen.findByText("Feedback submitted successfully!"),
    ).toBeInTheDocument();
  });

  it("shows the backend phone-prefix error message", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Country prefix is needed" }),
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/First Name/i), "Jinghuan");
    await user.type(screen.getByLabelText(/Surname/i), "Li");
    await user.type(screen.getByLabelText(/^Email/i), "jinghuan@example.com");
    await user.type(
      screen.getByLabelText(/Telephone Number/i),
      "+358401234567",
    );
    await user.type(screen.getByLabelText(/^Title/i), "Engineer");
    await user.type(screen.getByLabelText(/Organisation/i), "Mood Melody");
    await user.click(screen.getByLabelText(/Recruiters/i));
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(
        "Error: The phone number must include a country prefix. Please update and try again.",
      ),
    ).toBeInTheDocument();
  });
});
