import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

const windowMs = 30 * 1000; // 30 seconds

const apiLimiter = rateLimit({
  windowMs,
  max: 5000, // Limit each client to 5 requests per time window
  keyGenerator: (req) => req.ip || "unknown",
  statusCode: 429,
  message: "Too many requests.",
  handler: (req: Request, res: Response, next: NextFunction) => {
    console.error(`Rate limit exceeded for IP: ${req.ip}`);
    console.log(`Rate limit hit for IP: ${req.ip}, Path: ${req.path}`);

    const resetTime = req.rateLimit?.resetTime
      ? Math.ceil((req.rateLimit.resetTime.getTime() - Date.now()) / 1000)
      : 0;

    res.set({
      "Access-Control-Allow-Origin": req.headers.origin || "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    });

    const error: any = new Error(
      `Too many requests. Try after ${resetTime} seconds `,
    );
    error.status = 429;
    error.retryAfter = resetTime; // Attach resetTime
    next(error); // Pass the error to the errorHandler middleware
  },
});

export default apiLimiter;
