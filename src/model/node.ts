import { Schema, Types, model } from "mongoose";

export interface INode {
  _id: Types.ObjectId;
  uri: String;
}

const NodeSchema = new Schema<INode>({
  _id: { type: "ObjectID" },
  uri: { type: String, required: true },
});

export const Node = model<INode>("node", NodeSchema)