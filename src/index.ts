import express from "express";
import cors from "cors";
import { connectDB } from "./mongo";
// Routes
import channelRouter from "./routes/channels";
import userRouter from "./routes/users";
import commercialRouter from "./routes/commercials";
import loginRouter from "./routes/login";
// Middlewares
import errorHandler from "./middlewares/errorHandler";
import unknownEndPoints from "./middlewares/unknownEndPoints";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
connectDB();

// Middlewares
// app.use(cors({ origin: "https://mernstack-commercialtracker.netlify.app/" }));
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/login", loginRouter);
app.use("/api/", channelRouter);
app.use("/api/users", userRouter);
app.use("/api/commercials", commercialRouter);

// Error handling
app.use(unknownEndPoints);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
