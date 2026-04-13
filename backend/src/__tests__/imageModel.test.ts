const mockRun = jest.fn();
const mockAll = jest.fn();
const mockPrepare = jest.fn((sql: string) => {
  if (sql.includes("SELECT * FROM images")) {
    return { all: mockAll };
  }

  return { run: mockRun };
});
const mockTransaction = jest.fn(
  (callback: (images: any[]) => void) => callback,
);

jest.mock("../config/database", () => ({
  __esModule: true,
  default: {
    prepare: mockPrepare,
    transaction: mockTransaction,
  },
}));

import {
  deleteAllImages,
  getAllImages,
  insertManyImages,
} from "../models/image";

describe("image model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("inserts every provided image inside a transaction", () => {
    insertManyImages([
      {
        id: "1",
        name: "Sun",
        mood: "happy",
        url: "https://example.com/sun",
        ctg: "nature",
      },
      {
        id: "2",
        name: "Rain",
        mood: "calm",
        url: "https://example.com/rain",
        ctg: "weather",
      },
    ]);

    expect(mockTransaction).toHaveBeenCalledTimes(1);
    expect(mockRun).toHaveBeenCalledTimes(2);
    expect(mockRun).toHaveBeenNthCalledWith(
      1,
      "Sun",
      "happy",
      "https://example.com/sun",
      "nature",
    );
    expect(mockRun).toHaveBeenNthCalledWith(
      2,
      "Rain",
      "calm",
      "https://example.com/rain",
      "weather",
    );
  });

  it("returns all stored images", () => {
    const images = [
      {
        id: "1",
        name: "Sun",
        mood: "happy",
        url: "https://example.com/sun",
        ctg: "nature",
      },
    ];
    mockAll.mockReturnValue(images);

    expect(getAllImages()).toEqual(images);
    expect(mockPrepare).toHaveBeenCalledWith("SELECT * FROM images");
  });

  it("deletes all images", () => {
    deleteAllImages();

    expect(mockPrepare).toHaveBeenCalledWith("DELETE FROM images");
    expect(mockRun).toHaveBeenCalled();
  });
});
