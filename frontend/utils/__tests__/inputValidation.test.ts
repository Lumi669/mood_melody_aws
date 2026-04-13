import {
  emailValidationSchema,
  sanitizeInput,
  validateGeneralEnglishInputs,
  validateGeneralMultiLanguageInputTexts,
} from "../inputValidation";

describe("frontend inputValidation", () => {
  it("sanitizes html from input strings", () => {
    expect(sanitizeInput("Hello <script>alert(1)</script> team")).toBe(
      "Hello  team",
    );
  });

  it("accepts multilingual text with safe punctuation", () => {
    expect(validateGeneralMultiLanguageInputTexts("Jinghuan Åke 张三-42")).toBe(
      true,
    );
  });

  it("rejects unsupported multilingual input characters", () => {
    expect(validateGeneralMultiLanguageInputTexts("Hello @ world")).toBe(false);
  });

  it("accepts expected english input characters", () => {
    expect(validateGeneralEnglishInputs("Hello team, testing works!")).toBe(
      true,
    );
  });

  it("rejects invalid english input characters", () => {
    expect(validateGeneralEnglishInputs("Drop table <users>")).toBe(false);
  });

  it("validates email addresses with zod", () => {
    expect(
      emailValidationSchema.safeParse("jinghuan@example.com").success,
    ).toBe(true);
    expect(emailValidationSchema.safeParse("jinghuan").success).toBe(false);
  });
});
