import { getTextColor } from "../getTextColor";

describe("getTextColor", () => {
  it("prefers red over the other flags", () => {
    expect(getTextColor(true, true, true)).toBe("text-pink-600");
  });

  it("returns blue when only blue is enabled", () => {
    expect(getTextColor(false, true, false)).toBe("text-blue-500");
  });

  it("returns brown when only brown is enabled", () => {
    expect(getTextColor(false, false, true)).toBe("text-amber-900");
  });

  it("falls back to gray when no flag is enabled", () => {
    expect(getTextColor(false, false, false)).toBe("text-gray-700");
  });
});
