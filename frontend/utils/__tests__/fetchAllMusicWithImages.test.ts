const mockDynamoSend = jest.fn();
const mockGetItemCommand = jest.fn().mockImplementation((input) => ({ input }));
const mockPutItemCommand = jest.fn().mockImplementation((input) => ({ input }));

jest.mock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn().mockImplementation(() => ({
    send: mockDynamoSend,
  })),
  GetItemCommand: mockGetItemCommand,
  PutItemCommand: mockPutItemCommand,
}));

jest.mock("../../config/apiConfig", () => ({
  apiUrls: {
    musics: "https://api.example.com/musics",
    images: "https://api.example.com/images",
  },
}));

import { fetchAllMusicWithImages } from "../fetchAllMusicWithImages";

describe("fetchAllMusicWithImages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns cached data when DynamoDB already has it", async () => {
    mockDynamoSend.mockResolvedValueOnce({
      Item: {
        data: {
          S: JSON.stringify([
            {
              id: "1",
              name: "Bright Day",
              url: "https://example.com/song.mp3",
              ctg: "happy-track",
              mood: "happy",
              imgUrl: "https://example.com/image.webp",
            },
          ]),
        },
      },
    });

    const result = await fetchAllMusicWithImages();

    expect(result).toEqual([
      {
        id: "1",
        name: "Bright Day",
        url: "https://example.com/song.mp3",
        ctg: "happy-track",
        mood: "happy",
        imgUrl: "https://example.com/image.webp",
      },
    ]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("fetches fresh data, combines it, and saves it to cache on a cache miss", async () => {
    mockDynamoSend
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({ $metadata: { httpStatusCode: 200 } });
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          {
            id: "1",
            name: "Bright Day",
            url: "https://example.com/song.mp3",
            ctg: "happy-track",
            mood: "happy",
          },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          {
            id: "img-1",
            name: "Sun",
            url: "https://example.com/image.webp",
            ctg: "happy-track",
            mood: "happy",
          },
        ],
      });

    const result = await fetchAllMusicWithImages();

    expect(result).toEqual([
      {
        id: "1",
        name: "Bright Day",
        url: "https://example.com/song.mp3",
        ctg: "happy-track",
        mood: "happy",
        imgUrl: "https://example.com/image.webp",
      },
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(mockPutItemCommand).toHaveBeenCalled();
  });

  it("returns an empty array when the APIs fail", async () => {
    mockDynamoSend.mockResolvedValueOnce({});
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

    const result = await fetchAllMusicWithImages();

    expect(result).toEqual([]);
  });
});
