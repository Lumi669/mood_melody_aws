import type { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middleware/errorHandler";

const createMockResponse = () => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });

  return { status, json };
};

describe("errorHandler", () => {
  it("uses the provided status and retryAfter once", () => {
    const res = createMockResponse();
    const err = {
      status: 429,
      message: "Too many requests. Try after 10 seconds",
      retryAfter: 10,
    };

    errorHandler(
      err,
      {} as Request,
      res as unknown as Response,
      jest.fn() as NextFunction,
    );

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({
      error: "Too many requests. Try after 10 seconds",
      retryAfter: 10,
    });
  });

  it("falls back to a 500 response for unexpected errors", () => {
    const res = createMockResponse();

    errorHandler(
      {},
      {} as Request,
      res as unknown as Response,
      jest.fn() as NextFunction,
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });
});
