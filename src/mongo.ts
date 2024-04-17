import mongoose from "mongoose";

mongoose.set("strictQuery", false);
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .catch((err: Error) => console.log(err));
  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
  });
};
