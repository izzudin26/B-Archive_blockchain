import { INode } from "../model/node";
import * as NodeService from "../service/node.service";
import { HttpResponse, HttpError } from "../types/response";

export const addNode = async (req: any, res: any) => {
  try {
    const { uri } = req.body;
    if (!uri) {
      throw HttpError(400, "uri object not found");
    }
    const haveHttp = uri.substr(0, 4) === "http";
    await NodeService.addNode(haveHttp ? uri : `http://${uri}`);
    return HttpResponse(200, "Success Add new Node");
  } catch (error) {
    if (error instanceof Error) throw HttpError(500, error.message);
  }
};

export const removeNode = async (req: any, res: any) => {
  try {
    const { _id } = req.params;
    await NodeService.deleteNode(_id);
    return HttpResponse(200, "Success delete");
  } catch (error) {
    if (error instanceof Error) throw HttpError(500, error.message);
  }
};

export const getNodes = async (req: any, res: any) => {
  try {
      const nodes: INode[] = await NodeService.getNodes()
      return HttpResponse(200, "Success Get Node", nodes)
  } catch (error) {
    if (error instanceof Error) throw HttpError(500, error.message);
  }
};

