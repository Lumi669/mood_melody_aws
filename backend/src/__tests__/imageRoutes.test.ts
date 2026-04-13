import type { NextFunction, Request, Response } from "express";
import imageRoutes from "../routes/imageRoutes";
import {
  deleteAllImages,
  getAllImages,
  insertManyImages,
} from "../models/image";

jest.mock("../models/image", () => ({
  insertManyImages: jest.fn(),
  getAllImages: jest.fn(),
  deleteAllImages: jest.fn(),
}));

const mockedInsertManyImages = jest.mocked(insertManyImages);
const mockedGetAllImages = jest.mocked(getAllImages);
const mockedDeleteAllImages = jest.mocked(deleteAllImages);

const getRouteHandler = (method: "post" | "get" | "delete") => {
  const layer = (imageRoutes as any).stack.find(
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

describe("imageRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates image records", async () => {
    const payload = [
      {
        id: "1",
        name: "Sun",
        mood: "happy",
        url: "https://example.com/sun",
        ctg: "nature",
      },
    ];

    const response = await invokeRoute("post", payload);

    expect(mockedInsertManyImages).toHaveBeenCalledWith(payload);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.responseBody.current).toEqual({
      message: "Images inserted successfully!",
    });
  });

  it("returns all images", async () => {
    mockedGetAllImages.mockReturnValue([
      {
        id: "1",
        name: "Sun",
        mood: "happy",
        url: "https://example.com/sun",
        ctg: "nature",
      },
    ]);

    const response = await invokeRoute("get");

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.responseBody.current).toEqual([
      {
        id: "1",
        name: "Sun",
        mood: "happy",
        url: "https://example.com/sun",
        ctg: "nature",
      },
    ]);
  });

  it("deletes all images", async () => {
    const response = await invokeRoute("delete");

    expect(mockedDeleteAllImages).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.responseBody.current).toEqual({
      message: "All image records deleted.",
    });
  });

  it("passes model errors to next", async () => {
    const error = new Error("db failed");
    mockedGetAllImages.mockImplementation(() => {
      throw error;
    });

    const response = await invokeRoute("get");

    expect(response.next).toHaveBeenCalledWith(error);
  });
});
