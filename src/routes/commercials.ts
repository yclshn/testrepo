import express, { RequestHandler } from "express";
import Jwt from "jsonwebtoken";
import tokenExtractor from "../middlewares/tokenExtractor";
import commercialsService from "../services/commercialsService";
import { ICommercial, JwtUser } from "../types";

const router = express.Router();

// Get all commercials
router.get("/", (async (req, res, next) => {
  if (!req.get("authorization")) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const decodedToken = Jwt.verify(
      tokenExtractor(req, res, next),
      process.env.SECRET as string
    ) as JwtUser;

    if (decodedToken.role !== "admin" || !decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const commercials = await commercialsService.getCommercials();
    res.json(commercials);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// Get a commercial by id
router.get("/:id", (async (req, res, next) => {
  if (!req.get("authorization")) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const decodedToken = Jwt.verify(
      tokenExtractor(req, res, next),
      process.env.SECRET as string
    );
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const commercial = await commercialsService.getCommercial(req.params.id);
    if (commercial) {
      res.json(commercial);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// Add a new commercial
router.post("/", (async (req, res, next) => {
  if (!req.get("authorization")) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { userID, name, ftpFileLink, selectedChannels, startTime, endTime } =
    req.body as ICommercial;
  const commercialEntries = selectedChannels.map((channel) => ({
    channel,
    startTime,
    endTime,
    timestamps: [],
  }));
  const newCommercial = {
    userID,
    name,
    ftpFileLink,
    selectedChannels,
    startTime,
    endTime,
    commercialEntries,
  };
  try {
    const decodedToken = Jwt.verify(
      tokenExtractor(req, res, next),
      process.env.SECRET as string
    ) as JwtUser;

    if (decodedToken.role !== "admin" || !decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    await commercialsService.addCommercials(newCommercial);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

//Delete a commercial
router.delete("/:id", (async (req, res, next) => {
  if (!req.get("authorization")) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const decodedToken = Jwt.verify(
      tokenExtractor(req, res, next),
      process.env.SECRET as string
    ) as JwtUser;

    if (decodedToken.role !== "admin" || !decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    await commercialsService.deleteCommercial(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
