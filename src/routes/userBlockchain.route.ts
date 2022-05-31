import { RouteOptions } from 'fastify'
import * as UserBlockchainController from '../controller/userBlockchain.controller'

export const userBlockChainRoutes: RouteOptions[] = [
  {
    url: '/blockchain/registration',
    method: 'POST',
    handler: UserBlockchainController.registerUser
  },
  {
    url: '/blockchain/:userid',
    method: 'GET',
    handler: UserBlockchainController.getAllTransactionsFromUser
  },
  {
    url: '/blockchain/:userid/:hash',
    method: 'GET',
    handler: UserBlockchainController.getDetailTransactionUser
  },
  {
    url: '/blockchain/:userid',
    method: 'POST',
    handler: UserBlockchainController.insertTransactionsToUser
  },
  {
    url: '/blockchain/:userid/synchronize',
    method: 'GET',
    handler: UserBlockchainController.syncUser
  }
]
