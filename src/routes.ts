import {
  type FastifyInstance,
  type FastifyPluginOptions,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";
import { UserController } from "./controllers/user.controller";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> {
  fastify.post(
    "/user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log("requisição recebida", "/user", request);
      await UserController.create(request, reply);
    }
  );

  fastify.patch(
    "/user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await UserController.update(request, reply);
    }
  );

  fastify.delete(
    "/user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await UserController.remove(request, reply);
    }
  );

  fastify.get("/user", async (request: FastifyRequest, reply: FastifyReply) => {
    await UserController.get(request, reply);
  });

  fastify.get(
    "/users",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await UserController.list(request, reply);
    }
  );
}
