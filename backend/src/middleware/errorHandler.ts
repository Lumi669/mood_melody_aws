// By using the errorHandler middleware, simplify the route handlers
// and centralize the error management in the application.
// This pattern is a best practice in Express applications,
// ensuring that all errors are handled uniformly and code remains clean and maintainable.

import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(err);

  res.status(statusCode).json({ message });
}
