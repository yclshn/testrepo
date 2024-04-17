// import { usersData } from "../data/users";
import UserModel from "../models/users";
import { IUser } from "../types";

// const users: IUser[] = usersData;

const getUsers = async () => {
  try {
    const users = await UserModel.find({}).populate("commercials");
    // console.log(users);
    return users;
  } catch (err: unknown) {
    console.log(err);
    return [];
  }
};

const getUser = async (_id: string) => {
  try {
    const user = await UserModel.findById(_id).populate("commercials");
    return user;
  } catch (err: unknown) {
    console.log(err);
    return null;
  }
};

const addUser = async ({
  username,
  password,
  email,
  phone,
  company,
}: IUser) => {
  try {
    const newUser = {
      username,
      password,
      email,
      phone,
      company,
    };
    await UserModel.create(newUser);
  } catch (err: unknown) {
    console.log(err);
  }
};

const deleteUser = async (_id: string) => {
  try {
    await UserModel.findByIdAndDelete(_id);
    return "User deleted";
  } catch (err: unknown) {
    console.log(err);
    return "User not found";
  }
};

export default { getUsers, getUser, addUser, deleteUser };
