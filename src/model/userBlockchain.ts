import { blockChainSchema, IBlockChain } from "./blockchain";
import { Schema, Types, model } from "mongoose";

export interface IUserBlockchain {
  _id?: Types.ObjectId;
  userId: String;
  transactionsBlock: IBlockChain[];
}

const userBlockChainSchema = new Schema({
  _id: { type: Types.ObjectId, default: new Types.ObjectId() },
  userId: { type: String, required: true },
  transactionsBlock: [blockChainSchema],
});

export const UserBlockChain = model<IUserBlockchain>(
  "userBlockChain",
  userBlockChainSchema
);
