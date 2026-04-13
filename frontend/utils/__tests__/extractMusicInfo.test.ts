import { extractAuthorName, extractMusicName } from "../extractMusicInfo";

describe("extractMusicInfo", () => {
  it("extracts and formats the author name", () => {
    expect(extractAuthorName("john-doe_bright-day.mp3")).toBe("john doe");
  });

  it("extracts and formats the music name", () => {
    expect(extractMusicName("john-doe_bright-day.mp3")).toBe("bright day");
  });

  it("returns empty strings when the file name is incomplete", () => {
    expect(extractAuthorName("")).toBe("");
    expect(extractMusicName("author-only")).toBe("");
  });
});
