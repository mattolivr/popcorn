import User from "../entites/user";

export interface Auth {
  user?: User;
  token?: string;

  login: (request: AuthLoginRequest) => Promise<AuthLoginResponse>;
  logout: () => void;
  register: (user: User) => Promise<AuthLoginResponse>;
  validate: () => Promise<AuthLoginResponse>;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  user?: User;
  token?: string;
  message?: string;
}
