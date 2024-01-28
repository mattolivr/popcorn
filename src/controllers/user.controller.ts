import { type FastifyReply, type FastifyRequest } from "fastify";
import type User from "../core/entities/user.entity";
import { NotFound } from "../routes";
import { UserService } from "../services/user.service";
import type Controller from "./controller";

export const UserController: Controller = {
  get: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { id, name } = request.query as User;
    const service = new UserService();

    let response: User | null = null;
    if (id != null) {
      response = await service.get(id);
    }

    if (name != null) {
      response = await service.getByName(name);
    }

    if (response == null) {
      await NotFound(reply);
    } else {
      await reply.send(response);
    }
  },
  list: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await reply.send(await new UserService().list());
  },
  create: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    await reply.send(await new UserService().create(request.body as User));
  },
  update: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    let response: User | null = null;
    response = await new UserService().update(request.body as User);

    if (response == null) {
      await NotFound(reply);
    } else {
      await reply.send(response);
    }
  },
  remove: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const { id } = request.query as User;
    let response: User | null = null;

    if (id != null) {
      response = await new UserService().delete(id);
    }

    if (response == null) {
      await NotFound(reply);
    } else {
      await reply.send(response);
    }
  },
};
