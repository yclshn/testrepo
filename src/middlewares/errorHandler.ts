import { Request, Response, NextFunction } from "express";

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
    return;
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
    return;
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    response.status(400).json({
      error: "expected `username` to be unique",
    });
    return;
  } else if (error.name === "JsonWebTokenError") {
    response.status(401).json({
      error: "invalid token",
    });
    return;
  } else if (error.name === "TokenExpiredError") {
    response.status(401).json({
      error: "token expired",
    });
    return;
  }

  next(error);
};

export default errorHandler;
