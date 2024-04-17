// import { Document } from "mongoose";

// import { ObjectId } from "mongoose";
export interface JwtUser {
  username: string;
  _id: string;
  role: string;
}

export interface ICommercialEntry {
  _id?: string;
  channel: string;
  startTime: string;
  endTime: string;
  timestamps: string[];
}

export interface ICommercial {
  _id?: string;
  userID: IUser["_id"];
  name: string;
  ftpFileLink: string;
  selectedChannels: string[];
  startTime: string;
  endTime: string;
  commercialEntries?: ICommercialEntry[];
}

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  company: string;
  role?: string;
  commercials?: ICommercial["_id"][];
}
