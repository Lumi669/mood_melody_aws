import { expect, test } from "@playwright/test";

test("analyzes mood from the homepage with a mocked API response", async ({
  page,
}) => {
  await page.route("**/api/sentimentanalysis", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ sentiment: "POSITIVE" }),
    });
  });

  await page.goto("/");

  await page.getByLabel("Mood input").fill("I feel great today");
  await page.getByRole("button", { name: "Check my mood" }).click();

  await expect(
    page.getByText("You seem happy; here's a happy song and image for you."),
  ).toBeVisible();
  await expect(page.getByText("Click to go back")).toBeVisible();
});

test("submits the contact form successfully with a mocked backend", async ({
  page,
}) => {
  await page.route("**/api/mock-save-feedback", async (route) => {
    const requestBody = route.request().postDataJSON();
    expect(requestBody).toMatchObject({
      firstname: "Jinghuan",
      surname: "Li",
      email: "jinghuan@example.com",
      telephonenumber: "+358401234567",
      title: "Engineer",
      organisation: "Mood Melody",
      message: "Hello team",
      roles: ["Recruiters"],
    });

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "ok" }),
    });
  });

  await page.goto("/contact");

  await page.getByLabel(/First Name/i).fill("Jinghuan");
  await page.getByLabel(/Surname/i).fill("Li");
  await page.getByLabel(/^Email/i).fill("jinghuan@example.com");
  await page.getByLabel(/Telephone Number/i).fill("+358401234567");
  await page.getByLabel(/^Title/i).fill("Engineer");
  await page.getByLabel(/Organisation/i).fill("Mood Melody");
  await page.getByLabel(/Recruiters/i).check();
  await page.getByLabel(/More information/i).fill("Hello team");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Feedback submitted successfully!"),
  ).toBeVisible();
});

test("shows the backend validation error for a missing country prefix", async ({
  page,
}) => {
  await page.route("**/api/mock-save-feedback", async (route) => {
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({ error: "Country prefix is needed" }),
    });
  });

  await page.goto("/contact");

  await page.getByLabel(/First Name/i).fill("Jinghuan");
  await page.getByLabel(/Surname/i).fill("Li");
  await page.getByLabel(/^Email/i).fill("jinghuan@example.com");
  await page.getByLabel(/Telephone Number/i).fill("+358401234567");
  await page.getByLabel(/^Title/i).fill("Engineer");
  await page.getByLabel(/Organisation/i).fill("Mood Melody");
  await page.getByLabel(/Recruiters/i).check();
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText(
      "Error: The phone number must include a country prefix. Please update and try again.",
    ),
  ).toBeVisible();
});
