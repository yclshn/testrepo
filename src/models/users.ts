import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";

const userSchema: Schema = new Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  company: String,
  role: { type: String, default: "user" },
  commercials: { type: [Schema.Types.ObjectId], ref: "Commercial" },
});

userSchema.set("toJSON", {
  transform: (_document: unknown, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject._id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
