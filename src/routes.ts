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
  createRoutes(
    [
      {
        path: "/users",
        get: UserController.get,
        create: UserController.create,
        update: UserController.update,
        remove: UserController.remove,
        list: UserController.list,
      },
    ],
    fastify,
    options
  );
}

function createRoutes(
  routes: Route[],
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  routes.forEach((route) => {
    if (route.get != null) {
      fastify.get(route.path, route.get);
    }
    if (route.create != null) {
      fastify.post(route.path, route.create);
    }
    if (route.update != null) {
      fastify.patch(route.path, route.update);
    }
    if (route.remove != null) {
      fastify.delete(route.path, route.remove);
    }
    if (route.list != null) {
      fastify.get(`${route.path}/list`, route.list);
    }
  });
}

interface Route {
  path: string;
  get?: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  create?: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  update?: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  remove?: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  list?: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}

export async function NotFound(reply: FastifyReply) {
  await reply.code(404).send("Not Found");
}
