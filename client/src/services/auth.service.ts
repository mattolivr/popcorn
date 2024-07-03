import { server } from "../adapters/server";
import User from "../entites/user";

class AuthService {
  register(user: User): void {
    server.post("/auth/register", user);
  }

  login(request: LoginRequest): void {
    server.post("/auth/login", request).then((response) => {
      console.log("login-response", response);
    });
  }
}
export interface LoginRequest {
  email: string;
  password: string;
}

const authService = new AuthService();
export default authService;
