import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any, // Accept any type of error to handle both built-in and custom errors
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.status || 500; // Default to 500 if no status code is set

  console.log("status ccccc code ==== ", statusCode);
  const error = err.message || "Internal Server Error";

  // Log the error for debugging purposes (can be enhanced with logging tools)
  console.error(
    `Error from backend errorHandler middleware : ${error}, Status: ${statusCode}`,
  );

  const errorResponse: Record<string, any> = { error };

  // Include retryAfter if provided
  if (err.retryAfter) {
    errorResponse.retryAfter = err.retryAfter;
  }

  res.status(statusCode).json(errorResponse);

  console.log(
    "eeeeee errorResponse from backend errorHandler middleware ==== ",
    errorResponse,
  );
  // above print out this:
  //{ error: 'Too many requests. Try after 14 seconds ', retryAfter: 14 }

  // Send the response
  return res.status(statusCode).json(errorResponse);
}
