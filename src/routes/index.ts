import { userBlockChainRoutes } from './userBlockchain.route'
import { NodeRoutes } from './node.route'
import { RouteOptions } from 'fastify'

export const routes: RouteOptions[] = [...userBlockChainRoutes, ...NodeRoutes]
