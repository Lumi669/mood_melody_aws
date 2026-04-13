import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sentimentanalysis from "../Sentimentanalysis";

describe("Sentimentanalysis", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("disables mood analysis for invalid characters", async () => {
    const user = userEvent.setup();
    render(
      <Sentimentanalysis
        onSentimentAnalyzed={jest.fn()}
        playMusic={jest.fn()}
      />,
    );

    await user.type(screen.getByLabelText(/Mood input/i), "Hello @ world");

    expect(
      screen.getByText("Invalid characters are not allowed."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check my mood/i }),
    ).toBeDisabled();
  });

  it("calls the sentiment API and forwards positive results", async () => {
    const user = userEvent.setup();
    const onSentimentAnalyzed = jest.fn();
    const playMusic = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ sentiment: "POSITIVE" }),
    });

    render(
      <Sentimentanalysis
        onSentimentAnalyzed={onSentimentAnalyzed}
        playMusic={playMusic}
      />,
    );

    await user.type(screen.getByLabelText(/Mood input/i), "I feel great today");
    await user.click(screen.getByRole("button", { name: /check my mood/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("/api/sentimentanalysis");
    expect(JSON.parse(options.body)).toEqual({ text: "I feel great today" });

    await waitFor(() =>
      expect(onSentimentAnalyzed).toHaveBeenCalledWith(
        "You seem happy; here's a happy song and image for you.",
      ),
    );
    expect(playMusic).toHaveBeenCalledWith("happy", "analysis");
  });

  it("shows an API error when sentiment analysis fails", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Backend unavailable" }),
    });

    render(
      <Sentimentanalysis
        onSentimentAnalyzed={jest.fn()}
        playMusic={jest.fn()}
      />,
    );

    await user.type(screen.getByLabelText(/Mood input/i), "I feel okay");
    await user.click(screen.getByRole("button", { name: /check my mood/i }));

    expect(await screen.findByText("Backend unavailable")).toBeInTheDocument();
  });
});
