import { Request, Response } from "express";

const unknownEndPoints = (_req: Request, res: Response) => {
  // res.redirect("/api/login");
  res.sendStatus(404);
  // res.status(404).json({ error: "unknown endpoint" });
};

export default unknownEndPoints;
