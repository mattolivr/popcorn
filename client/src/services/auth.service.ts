import { server } from "../adapters/server";
import User from "../entites/user";

export function registerUser(user: User): void {
  // TODO: substituir por logger
  console.log("registrando usuário ", user.name);
  server.post("/auth/register", user);
}

export interface LoginRequest {
  email: string;
  password: string;
}

export function login(request: LoginRequest): void {
  server.post("/auth/login", request).then((response) => {
    console.log("login-response", response);
  });
}
