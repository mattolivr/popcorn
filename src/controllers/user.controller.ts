import { type FastifyReply, type FastifyRequest } from "fastify";
import { type User } from "../core/entities/user.entity";
import { UserService } from "../services/user.service";
import type Controller from "./controller";

export const UserController: Controller = {
  get,
  list,
  create,
  update,
  remove,
};

async function create(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  await reply.send(await new UserService().create(request.body as User));
}

async function update(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  await reply.send(await new UserService().update(request.body as User));
}

async function remove(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const { id } = request.query as User;
  await reply.send(await new UserService().delete(id));
}

async function get(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const { id, name } = request.query as User;
  const service = new UserService();
  await reply.send(
    name != null ? await service.getByName(name) : await service.get(id)
  );
}

async function list(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  await reply.send(await new UserService().list());
}
