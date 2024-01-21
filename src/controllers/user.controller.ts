import { FastifyRequest, FastifyReply } from "fastify"
import { UserService } from "../services/user.service"
import { User } from "../core/entities/user.entity"

class UserController {
    static async create(request: FastifyRequest, reply: FastifyReply) {
        reply.send(await new UserService().create(request.body as User))
    }

    static async update(request: FastifyRequest, reply: FastifyReply) {
        reply.send(await new UserService().update(request.body as User))
    }

    static async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as User
        reply.send(await new UserService().delete(id))
    }

    static async get(request: FastifyRequest, reply: FastifyReply) {
        const { id, name } = request.query as User
        const service = new UserService()
        reply.send(name ? await service.getByName(name) : await service.get(id))
    }

    static async list(request: FastifyRequest, reply: FastifyReply) {
        reply.send(await new UserService().list())
    }
}

export { UserController }