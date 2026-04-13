import {
  removeZeroWidthCharacters,
  validateGeneralEnglishInputs,
  validateGeneralMultiLanguageInputTexts,
} from "../utils/inputValidation";

describe("inputValidation", () => {
  describe("validateGeneralMultiLanguageInputTexts", () => {
    it("accepts letters from multiple languages plus safe punctuation", () => {
      expect(
        validateGeneralMultiLanguageInputTexts("Jinghuan Åke 张三-42"),
      ).toBe(true);
      expect(validateGeneralMultiLanguageInputTexts("Hola, mundo.")).toBe(true);
    });

    it("rejects unsupported symbols", () => {
      expect(validateGeneralMultiLanguageInputTexts("Hello @ world")).toBe(
        false,
      );
    });
  });

  describe("validateGeneralEnglishInputs", () => {
    it("accepts expected english sentence characters", () => {
      expect(validateGeneralEnglishInputs("Hello team, testing works!")).toBe(
        true,
      );
    });

    it("rejects disallowed characters", () => {
      expect(validateGeneralEnglishInputs("Drop table <users>")).toBe(false);
    });
  });

  describe("removeZeroWidthCharacters", () => {
    it("removes zero-width characters from strings", () => {
      expect(removeZeroWidthCharacters("he\u200Bll\uFEFFo")).toBe("hello");
    });

    it("throws for non-string input", () => {
      expect(() => removeZeroWidthCharacters(123 as unknown as string)).toThrow(
        "Input must be a string",
      );
    });
  });
});
