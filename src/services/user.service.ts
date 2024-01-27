import { type User } from "../core/entities/user.entity";
import { Service } from "./service";
import prismaClient from "../database/prisma";

class UserService extends Service<User> {
  protected getRequiredFields(): string[] {
    return ["nome", "email"];
  }

  async create(user: User): Promise<User> {
    // TODO: Colocar tratativa de erro
    return await prismaClient.user.create({ data: user });
  }

  async update(user: User): Promise<User> {
    return await prismaClient.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async delete(id: string): Promise<User> {
    const user = await prismaClient.user.findFirst({ where: { id } });
    if (user == null) {
      throw new Error("Not found");
    }
    return await prismaClient.user.delete({ where: { id } });
  }

  async get(id: string): Promise<User | null> {
    return await prismaClient.user.findFirst({ where: { id } });
  }

  async getByName(name: string): Promise<User | null> {
    return await prismaClient.user.findFirst({ where: { name } });
  }

  async list(): Promise<User[]> {
    return await prismaClient.user.findMany();
  }
}

export { UserService };
