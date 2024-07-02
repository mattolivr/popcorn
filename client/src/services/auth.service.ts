import { server } from "../adapters/server";
import User from "../entites/user";

export function registerUser(user: User): void {
  // TODO: substituir por logger
  console.log("registrando usuário ", user.name);
  server.post("/auth/register", user).then();
}
