import { IUserBlockchain } from "../model/userBlockchain";
import * as userBlockChainService from "../service/userBlockchain.service";
import { HttpError, HttpResponse, Response } from "../types/response";

export const registerUser = async (req: any, res: any): Promise<Response> => {
    const {userid} = req.body
    try {
        const user = await userBlockChainService.getUser(userid)
        if(user){
            return HttpResponse(200, "User Already exist")
        }
        await userBlockChainService.createUserBlockchain(userid)
        return HttpResponse(200, "Success create user")
    } catch (error) {
    if (error instanceof Error) throw HttpError(500, error.message);
    }
}

export const getAllTransactionsFromUser = async (req: any, res: any): Promise<Response> => {
  const { userid } = req.params;
  try {
      const userData: IUserBlockchain = await userBlockChainService.getAllTransactions(userid)
      if(!userData){
          throw HttpError(404, "Not Found User")
      }
      const isChainValid = userBlockChainService.isValid(userData.transactionsBlock)
      if(!isChainValid){
          throw HttpError(500, "Broken Chain Data")
      }
      return HttpResponse(200, "Success Get Data", userData)
  } catch (error) {
    if (error instanceof Error) throw HttpError(500, error.message);
  }
};

export const insertTransactionsToUser = async (req: any, res: any): Promise<Response> => {
    const { userid } = req.params
    const { payload } = req.body
    if(!userid){
        throw HttpError(400, "missing userid params")
    }
    if(!payload){
        throw HttpError(400, "missing payload body")
    }
    try {
        await userBlockChainService.createTransactions(userid, payload)
        return HttpResponse(200, "Success Insert Data")
    } catch (error) {
        if (error instanceof Error) throw HttpError(500, error.message);
    }
}

export const getDetailTransactionUser = async (req: any, res:any): Promise<Response> => {
    const {userid, hash} = req.params
    try {
        const data = await userBlockChainService.getDetailBlock(userid, hash)
        if(!data){
            throw HttpError(404, "Not Found User or HashBlock")
        }
        return HttpResponse(200, "Success get Hashblock", data)
    } catch (error) {
    if (error instanceof Error) throw HttpError(500, error.message);
    }
}

export const syncUser = async (req: any, res: any) => {
    const {userid} = req.params
    try {
        await userBlockChainService.synchronize(userid)
        return HttpResponse(200, "Processing Synchronize")
    } catch (error) {
    if (error instanceof Error) throw HttpError(500, error.message);
        
    }
}