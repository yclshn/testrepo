import CommercialModel from "../models/commercials";
import UserModel from "../models/users";
import { ICommercial } from "../types";

const getCommercials = async () => {
  try {
    const commercials = await CommercialModel.find({})
      .populate("userID", {
        username: 1,
      })
      .exec();
    return commercials;
  } catch (err: unknown) {
    console.log(err);
    return [];
  }
};

const getCommercial = async (_id: string) => {
  try {
    const commercial = await CommercialModel.findById(_id)
      .populate("userID", { username: 1 })
      .exec();
    return commercial;
  } catch (err: unknown) {
    console.log(err);
    return null;
  }
};

const addCommercials = async ({
  userID,
  name,
  ftpFileLink,
  selectedChannels,
  startTime,
  endTime,
  commercialEntries,
}: ICommercial) => {
  try {
    const newCommercial = {
      userID,
      name,
      ftpFileLink,
      selectedChannels,
      startTime,
      endTime,
      commercialEntries,
    };
    const commercial = await CommercialModel.create(newCommercial);
    const commercialID = await CommercialModel.findOne({ _id: commercial._id });

    // Getting id again because of relation between user and commercial
    await UserModel.updateOne(
      { _id: userID },
      { $push: { commercials: commercialID?._id } }
    );
  } catch (err: unknown) {
    console.log(err);
  }
};

const deleteCommercial = async (_id: string) => {
  try {
    await CommercialModel.findByIdAndDelete(_id);
    return "Commercial deleted";
  } catch (err: unknown) {
    console.log(err);
    return "Commercial not found";
  }
};

const deleteManyCommercial = async (_id: string) => {
  try {
    await CommercialModel.deleteMany({ userID: _id });
    return "User Related Commercials deleted";
  } catch (err: unknown) {
    console.log(err);
    return "Commercial not found";
  }
};

export default {
  getCommercials,
  getCommercial,
  addCommercials,
  deleteCommercial,
  deleteManyCommercial,
};
