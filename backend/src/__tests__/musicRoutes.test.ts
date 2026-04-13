import type { NextFunction, Request, Response } from "express";
import musicRoutes from "../routes/musicRoutes";
import {
  deleteAllMusics,
  getAllMusics,
  insertManyMusics,
} from "../models/music";

jest.mock("../models/music", () => ({
  insertManyMusics: jest.fn(),
  getAllMusics: jest.fn(),
  deleteAllMusics: jest.fn(),
}));

const mockedInsertManyMusics = jest.mocked(insertManyMusics);
const mockedGetAllMusics = jest.mocked(getAllMusics);
const mockedDeleteAllMusics = jest.mocked(deleteAllMusics);

const getRouteHandler = (method: "post" | "get" | "delete") => {
  const layer = (musicRoutes as any).stack.find(
    (stackLayer: any) =>
      stackLayer.route?.path === "/" && stackLayer.route.methods[method],
  );

  return layer.route.stack[0].handle;
};

const createMockResponse = () => {
  const responseBody: { current?: unknown } = {};
  const status = jest.fn().mockImplementation((_statusCode: number) => res);
  const json = jest.fn().mockImplementation((body: unknown) => {
    responseBody.current = body;
    return res;
  });
  const res = { status, json };

  return {
    json,
    res: res as unknown as Response,
    responseBody,
    status,
  };
};

const invokeRoute = async (
  method: "post" | "get" | "delete",
  body?: unknown,
) => {
  const handler = getRouteHandler(method);
  const req = { body } as Request;
  const response = createMockResponse();
  const next = jest.fn() as NextFunction;

  await handler(req, response.res, next);

  return { ...response, next };
};

describe("musicRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates music records", async () => {
    const payload = [
      {
        id: "1",
        name: "Bright Day",
        mood: "happy",
        url: "https://example.com/bright",
        ctg: "playlist",
      },
    ];

    const response = await invokeRoute("post", payload);

    expect(mockedInsertManyMusics).toHaveBeenCalledWith(payload);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.responseBody.current).toEqual({
      message: "Music inserted successfully!",
    });
  });

  it("returns all music records", async () => {
    mockedGetAllMusics.mockReturnValue([
      {
        id: "1",
        name: "Bright Day",
        mood: "happy",
        url: "https://example.com/bright",
        ctg: "playlist",
      },
    ]);

    const response = await invokeRoute("get");

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.responseBody.current).toEqual([
      {
        id: "1",
        name: "Bright Day",
        mood: "happy",
        url: "https://example.com/bright",
        ctg: "playlist",
      },
    ]);
  });

  it("deletes all music records", async () => {
    const response = await invokeRoute("delete");

    expect(mockedDeleteAllMusics).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.responseBody.current).toEqual({
      message: "All music records deleted.",
    });
  });

  it("passes model errors to next", async () => {
    const error = new Error("db failed");
    mockedGetAllMusics.mockImplementation(() => {
      throw error;
    });

    const response = await invokeRoute("get");

    expect(response.next).toHaveBeenCalledWith(error);
  });
});
