const mockRun = jest.fn();
const mockAll = jest.fn();
const mockPrepare = jest.fn((sql: string) => {
  if (sql.includes("SELECT * FROM music")) {
    return { all: mockAll };
  }

  return { run: mockRun };
});
const mockTransaction = jest.fn(
  (callback: (musics: any[]) => void) => callback,
);

jest.mock("../config/database", () => ({
  __esModule: true,
  default: {
    prepare: mockPrepare,
    transaction: mockTransaction,
  },
}));

import {
  deleteAllMusics,
  getAllMusics,
  insertManyMusics,
} from "../models/music";

describe("music model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("inserts every provided music record inside a transaction", () => {
    insertManyMusics([
      {
        id: "1",
        name: "Bright Day",
        mood: "happy",
        url: "https://example.com/bright",
        ctg: "playlist",
      },
      {
        id: "2",
        name: "Ocean Drift",
        mood: "calm",
        url: "https://example.com/ocean",
        ctg: "ambient",
      },
    ]);

    expect(mockTransaction).toHaveBeenCalledTimes(1);
    expect(mockRun).toHaveBeenCalledTimes(2);
    expect(mockRun).toHaveBeenNthCalledWith(
      1,
      "Bright Day",
      "happy",
      "https://example.com/bright",
      "playlist",
    );
    expect(mockRun).toHaveBeenNthCalledWith(
      2,
      "Ocean Drift",
      "calm",
      "https://example.com/ocean",
      "ambient",
    );
  });

  it("returns all stored music records", () => {
    const musics = [
      {
        id: "1",
        name: "Bright Day",
        mood: "happy",
        url: "https://example.com/bright",
        ctg: "playlist",
      },
    ];
    mockAll.mockReturnValue(musics);

    expect(getAllMusics()).toEqual(musics);
    expect(mockPrepare).toHaveBeenCalledWith("SELECT * FROM music");
  });

  it("deletes all music records", () => {
    deleteAllMusics();

    expect(mockPrepare).toHaveBeenCalledWith("DELETE FROM music");
    expect(mockRun).toHaveBeenCalled();
  });
});
