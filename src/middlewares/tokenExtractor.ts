import { Request, Response, NextFunction } from "express";

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  next();
  return "no token found";
};

export default tokenExtractor;
