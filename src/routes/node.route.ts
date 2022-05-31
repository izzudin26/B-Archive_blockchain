import { RouteOptions } from 'fastify'
import * as NodeController from '../controller/node.controller'

export const NodeRoutes: RouteOptions[] = [
  {
    url: '/node',
    method: 'GET',
    handler: NodeController.getNodes
  },
  {
    url: '/node',
    method: 'POST',
    handler: NodeController.addNode
  },
  {
    url: '/node/:_id',
    method: 'DELETE',
    handler: NodeController.removeNode
  }
]
