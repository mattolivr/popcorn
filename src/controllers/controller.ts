import { type FastifyReply, type FastifyRequest } from "fastify";

export default interface Controller {
  get: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  list: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  create: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  update: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  remove: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
