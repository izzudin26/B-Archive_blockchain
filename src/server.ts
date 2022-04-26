import Fastify, { FastifyInstance } from "fastify";
import { userBlockChainRoutes } from "./routes";

export const server: FastifyInstance = Fastify({ logger: true });
userBlockChainRoutes.forEach((route) => server.route(route));
