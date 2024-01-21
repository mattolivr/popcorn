import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./controllers/user.controller";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return UserController.create(request, reply)
    })
    
    fastify.patch("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return UserController.update(request, reply)
    })
    
    fastify.delete("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return UserController.delete(request, reply)
    })

    fastify.get("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return UserController.get(request, reply)
    })

    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return UserController.list(request, reply)
    })
}