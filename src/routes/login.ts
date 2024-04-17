import { RequestHandler, Router } from "express";
import UserModel from "../models/users";
import Jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const loginRouter = Router();

loginRouter.get("/", (_req, res) => {
  console.log("pinged");
  res.send("Login route");
});

loginRouter.post("/", (async (req, res) => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    // User validation
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    if (password !== user.password) {
      res.status(404).send("Wrong password");
      return;
    }

    // Token generation
    const userForToken = {
      username: user.username,
      _id: user._id,
      role: user.role,
    };
    const token = Jwt.sign(userForToken, process.env.SECRET as string, {
      expiresIn: 60 * 1,
    });

    res
      .status(200)
      .send({ token, username: user.username, role: user.role, id: user._id });
  } catch (error) {
    res.status(500).send("Internal server error");
    return;
  }
}) as RequestHandler);

export default loginRouter;
