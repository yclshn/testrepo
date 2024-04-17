import mongoose, { Schema } from "mongoose";
import { ICommercial } from "../types";

const commercialSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  ftpFileLink: String,
  selectedChannels: [String],
  startTime: String,
  endTime: String,
  commercialEntries: [
    {
      channel: String,
      startTime: String,
      endTime: String,
      timestamps: [String],
    },
  ],
});

commercialSchema.set("toJSON", {
  transform: (_document: unknown, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject._id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const CommercialModel = mongoose.model<ICommercial>(
  "Commercial",
  commercialSchema
);

export default CommercialModel;
