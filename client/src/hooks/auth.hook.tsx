import { createContext, ReactNode, useContext, useState } from "react";
import { server } from "../adapters/server";
import User from "../entites/user";
import { Auth, AuthLoginRequest, AuthLoginResponse } from "./auth.hook.interfaces";

const AuthContext = createContext<Auth | null>(null);
export const AUTH_TOKEN = "auth-token";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactNode => {
  const [response, setResponse] = useState<AuthLoginResponse>();

  const login = async (request: AuthLoginRequest): Promise<AuthLoginResponse> => {
    const response: { data: AuthLoginResponse } = await server.post("/auth/login", request);
    sessionStorage.setItem(AUTH_TOKEN, response.data.token ?? "");
    setResponse(response.data);
    return response.data;
  };

  const register = async (user: User): Promise<AuthLoginResponse> => {
    const response: { data: AuthLoginResponse } = await server.post("/auth/register", user);
    setResponse(response.data);
    return response.data;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_TOKEN);
    setResponse(undefined);
  };

  const validate = async (): Promise<AuthLoginResponse> => {
    const token = response?.token ?? sessionStorage.getItem(AUTH_TOKEN);

    // NOTE: Desabilita a validação caso o .env desabilite o require_login
    if (process.env.require_login === "false") {
      const fakeAuthResponse: AuthLoginResponse = response ?? fakeLogin();
      setResponse(fakeAuthResponse);
      return fakeAuthResponse;
    }

    if (token && token !== "") {
      try {
        const resp: { data: AuthLoginResponse } = await server.post("/auth/validate", { token });
        setResponse(resp.data);
        return resp.data;
      } catch (error) {}
    }
    return { message: "Usuário não autenticado" };
  };

  const fakeLogin = (): AuthLoginResponse => {
    return {
      user: {
        name: "debug",
        displayName: "Usuário não autenticado",
        password: "",
        email: "",
        birth: "",
      },
      token: "debug-token",
      message: "Debug",
    };
  };

  const value: Auth = {
    user: response?.user,
    token: response?.token,
    login,
    logout,
    register,
    validate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): Auth => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("useAuth deve ser utilizado dentro do AuthContext");
  }
  return context;
};
