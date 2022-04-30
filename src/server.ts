import Fastify, { FastifyInstance } from "fastify";
import { routes } from "./routes";

export const server: FastifyInstance = Fastify({ logger: true });
routes.forEach((route) => server.route(route));
