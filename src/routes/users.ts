import express, { RequestHandler } from "express";
import Jwt from "jsonwebtoken";
import tokenExtractor from "../middlewares/tokenExtractor";
import usersService from "../services/usersService";
import { IUser, JwtUser } from "../types";
import commercialsService from "../services/commercialsService";

const router = express.Router();

// Get all users
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
    const users = await usersService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// Get a user by id
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
    const user = await usersService.getUser(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// Add a new user
router.post("/", (async (req, res, next) => {
  if (!req.get("authorization")) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { username, password, email, phone, company } = req.body as IUser;
  const newUser = {
    username,
    password,
    email,
    phone,
    company,
  };
  if (
    username === undefined ||
    password === undefined ||
    email === undefined ||
    phone === undefined ||
    company === undefined
  ) {
    res.status(400).send("Missing fields");
    return;
  }
  if (
    username === "" ||
    password === "" ||
    email === "" ||
    phone === "" ||
    company === ""
  ) {
    res.status(400).send("Empty fields");
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
    await usersService.addUser(newUser);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

//Delete a user by id
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
    await usersService.deleteUser(req.params.id);
    await commercialsService.deleteManyCommercial(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
