import Fastify, { FastifyInstance } from "fastify";
import { routes } from "./routes";

export const server: FastifyInstance = Fastify({ logger: true });

server.get("/", async (req, res) => {
    return {message: "Server Alive"}
})

routes.forEach((route) => server.route(route));
