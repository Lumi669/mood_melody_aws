import { addToPlaylist22 } from "../addToPlaylist";

describe("addToPlaylist22", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a song when the playlist is empty", () => {
    addToPlaylist22({
      imgUrl: "https://example.com/image.webp",
      url: "https://example.com/song.mp3",
      name: "Bright Day",
      ctg: "happy-track",
      mood: "happy",
    });

    expect(JSON.parse(localStorage.getItem("playlist") || "[]")).toEqual([
      {
        imgUrl: "https://example.com/image.webp",
        url: "https://example.com/song.mp3",
        name: "Bright Day",
        ctg: "happy-track",
        mood: "happy",
      },
    ]);
  });

  it("does not add a duplicate song with the same category", () => {
    localStorage.setItem(
      "playlist",
      JSON.stringify([
        {
          imgUrl: "https://example.com/image.webp",
          url: "https://example.com/song.mp3",
          name: "Bright Day",
          ctg: "happy-track",
          mood: "happy",
        },
      ]),
    );

    addToPlaylist22({
      imgUrl: "https://example.com/other.webp",
      url: "https://example.com/other.mp3",
      name: "Another Song",
      ctg: "happy-track",
      mood: "happy",
    });

    expect(JSON.parse(localStorage.getItem("playlist") || "[]")).toHaveLength(
      1,
    );
  });
});
