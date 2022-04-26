import { Schema } from "mongoose";

export interface IBlockChain {
  metadata: Object;
  timestamp: number;
  iteration: number;
  hash: String;
  prevHash: String | null;
}

export const blockChainSchema = new Schema<IBlockChain>({
  metadata: Object,
  timestamp: { type: Number, default: Date.now },
  iteration: Number,
  hash: String,
  prevHash: String,
});
