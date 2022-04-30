import { INode, Node } from "../model/node";
import {Types} from "mongoose"

export const addNode = async (uri: string) => {
  const newNode = new Node({ uri, _id: new Types.ObjectId() });
  await newNode.save();
};

export const getNodes = async (): Promise<INode[]> => await Node.find().exec();

export const editNode = async (node: INode) => Node.findOne({_id: node._id}, {uri: node.uri})

export const deleteNode = async (_id: Types.ObjectId) => Node.deleteOne({_id})