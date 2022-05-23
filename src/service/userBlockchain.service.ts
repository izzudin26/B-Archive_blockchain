import { UserBlockChain, IUserBlockchain } from '../model/userBlockchain'
import * as nodeService from './node.service'
import { IBlockChain } from '../model/blockchain'
import { INode } from '../model/node'
import crypto from 'crypto'
import axios from 'axios'

export const createUserBlockchain = async (userId: String): Promise<IUserBlockchain> => {
  const newUser = new UserBlockChain({ userId, transactionsBlock: [] })
  return await newUser.save()
}

export const getAllTransactions = async (userId: String): Promise<IUserBlockchain | null> => {
  const userdata = await UserBlockChain.findOne({ userId }).exec()
  return userdata
}

export const getUser = async (userId: string) => {
  return await UserBlockChain.findOne({ userId }).select('userId').exec()
}

export const getLastBlockUser = async (userId: String): Promise<IBlockChain | null | undefined> => {
  const userData: IUserBlockchain | null = await UserBlockChain.findOne({ userId }).exec()
  userData?.transactionsBlock.sort((a, b) => a.iteration - b.iteration)
  return userData?.transactionsBlock.slice(-1)[0]
}

export const getDetailBlock = async (userId: Readonly<String>, hashBlock: Readonly<String>): Promise<IBlockChain | null> => {
  const userTransactions: IUserBlockchain = await UserBlockChain.findOne({ userId }).exec()
  return userTransactions.transactionsBlock.filter((b) => b.hash === hashBlock)[0]
}

export const createTransactions = async (userId: String, data: object, timestamp: number) => {
  const prevBlock: IBlockChain | null | undefined = await getLastBlockUser(userId)
  const prevHash = prevBlock?.hash ?? null
  const iteration = (prevBlock?.iteration ?? 0) + 1
  const block: IBlockChain = {
    iteration,
    timestamp,
    metadata: data,
    prevHash,
    hash: createHash(`${JSON.stringify(data)}${prevHash}${iteration}${timestamp}`)
  }
  await UserBlockChain.findOneAndUpdate({ userId }, { $push: { transactionsBlock: block } }
  )
}

const createHash = (data: String): String => {
  const createHash = crypto.createHash('sha256')
  return createHash.update(Uint8Array.from(Buffer.from(data))).digest('hex')
}

export const isValid = (transactions: IBlockChain[]): boolean => {
  let iteration: number = 0
  while (transactions[iteration + 1]) {
    if (transactions[iteration].hash !== transactions[iteration + 1].prevHash) {
      return false
    }
    iteration++
  }
  return true
}

export const synchronize = async (userid: Readonly<String>) => {
  const currentData: IUserBlockchain = await getAllTransactions(userid)
  const lengthData = currentData.transactionsBlock.length
  const nodes: INode[] = await nodeService.getNodes()
  nodes.forEach(async (node) => {
    const { data } = await axios.get(`${node.uri}/blockchain/${userid}`)
    if (data.data.transactionsBlock.length > lengthData) {
      await UserBlockChain.updateOne(
        { userId: userid },
        { transactionsBlock: data.data.transactionsBlock }
      )
    }
  })
}
